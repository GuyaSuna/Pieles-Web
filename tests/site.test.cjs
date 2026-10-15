const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root=path.join(__dirname,'..');
function app(stored='{}') {
  const elements=new Map();
  const element=()=>({innerHTML:'',textContent:'',classList:{add(){},remove(){},toggle(){}},focus(){},close(){this.closed=true;},showModal(){},setAttribute(){},removeAttribute(){}});
  const sandbox={console, setTimeout:()=>1, clearTimeout(){}, location:{hash:'',protocol:'file:'},navigator:{}, localStorage:{getItem:()=>stored,setItem(k,v){this.saved=v;}},document:{querySelector(s){if(!elements.has(s))elements.set(s,element());return elements.get(s);},querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){},addEventListener(){}}};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),sandbox);
  vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),sandbox);
  return {run:code=>vm.runInContext(code,sandbox),sandbox,elements};
}
test('El sitio abre y todas las secciones principales producen contenido',()=>{
  const a=app();
  for(const route of ['inicio','tipos','videos','favoritos','espacio','proyecto','fuentes','accesibilidad','piel/seca','piel/inexistente']){
    a.sandbox.location.hash='#'+route;a.run('render()');
    const html=a.elements.get('#main').innerHTML;
    assert.ok(html.length>400,route);assert.ok(!html.includes('undefined'),route);
  }
});
for(const [type,answers] of Object.entries({normal:['normal','normal','normal'],seca:['seca','seca','seca'],grasa:['grasa','grasa','grasa'],mixta:['mixta','mixta','mixta']})){
  test('El cuestionario reconoce el patrón '+type,()=>{const a=app();a.run(`answers=${JSON.stringify([...answers,'no','no'])};finishQuiz()`);assert.equal(a.run('state.history[0].type'),type);assert.equal(a.run('state.history[0].uncertain'),false);assert.equal(a.sandbox.location.hash,'resultado');assert.ok(a.sandbox.localStorage.saved);});
}
test('Un empate o respuestas desconocidas no se presentan como concluyentes',()=>{for(const answers of [['seca','normal','grasa','unknown','unknown'],['unknown','unknown','unknown','no','no']]){const a=app();a.run(`answers=${JSON.stringify(answers)};finishQuiz()`);assert.equal(a.run('state.history[0].uncertain'),true);assert.match(a.run('skinPage(state.history[0].type,state.history[0])'),/no muestran un patrón claro/);}});
test('Sensibilidad y lesiones dolorosas añaden orientación sin cambiar el biotipo',()=>{const a=app();a.run(`answers=['mixta','mixta','seca','yes','consult'];finishQuiz()`);assert.equal(a.run('state.history[0].type'),'mixta');for(const flag of ['sensitive','acne','consult'])assert.equal(a.run(`state.history[0].${flag}`),true);assert.match(a.run('skinPage(state.history[0].type,state.history[0])'),/consultá dermatología/);});
test('El perfil recupera datos y trata el contenido de usuarios como texto',()=>{const a=app(JSON.stringify({name:'<script>alert(1)</script>',favorites:['solar'],history:[{type:'seca',date:new Date().toISOString()}],journal:[{date:new Date().toISOString(),feeling:'Cómoda',note:'<img src=x onerror=alert(1)>',habits:[]}]}));const html=a.run('profilePage()');assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img src=x'));assert.match(html,/&lt;script&gt;/);assert.equal(a.run('state.favorites.length'),1);});
test('Datos corruptos no impiden abrir la web',()=>{const a=app('{broken');assert.equal(a.run('state.history.length'),0);assert.ok(a.elements.get('#main').innerHTML.includes('Tu piel es única'));});
test('Los cinco pasos se muestran y mantienen la respuesta al retroceder',()=>{const a=app();for(let i=0;i<5;i++){a.run(`quizStep=${i};quizDraw()`);assert.match(a.elements.get('#quiz').innerHTML,new RegExp(`Pregunta ${i+1} de 5`));}a.run(`quizStep=0;answers=['seca'];quizDraw()`);assert.match(a.elements.get('#quiz').innerHTML,/value="seca" checked/);});
test('El video LSU solo aparece al configurar un archivo',()=>{const a=app();assert.match(a.run('inclusion()'),/Contenido en preparación/);a.run(`data.signVideo.src='assets/lsu.mp4';data.signVideo.captions='assets/lsu.vtt'`);assert.match(a.run('inclusion()'),/<video controls/);assert.match(a.run('inclusion()'),/<track kind="captions"/);});
test('Los recursos locales funcionan bajo una subcarpeta de GitHub Pages',()=>{const html=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){assert.ok(!match[1].startsWith('/'),match[1]);assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);}const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');for(const match of worker.matchAll(/'\.\/([^']+)'/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);});
