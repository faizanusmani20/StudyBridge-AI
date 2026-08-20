(function(){

/* ============================================================
   1. KNOWLEDGE BASE  (small illustrative "open textbook" corpus)
   ============================================================ */
const KB = [
  { id:"S1", subject:"Physics", topic:"Motion",
    source:"NCERT Science, Class 9 — Ch. 8: Motion",
    text:"Speed is the distance travelled by an object per unit time. Velocity is speed in a given direction. When an object speeds up, slows down, or changes direction, it is said to be accelerating; acceleration is the rate of change of velocity with time." },
  { id:"S2", subject:"Physics", topic:"Motion",
    source:"NCERT Science, Class 9 — Ch. 8: Motion",
    text:"For motion in a straight line with constant acceleration, three equations connect initial velocity u, final velocity v, acceleration a, time t, and distance s: v = u + at, s = ut + (1/2)at^2, and v^2 = u^2 + 2as." },
  { id:"S3", subject:"Physics", topic:"Light - Reflection",
    source:"NCERT Science, Class 10 — Ch. 10: Light, Reflection and Refraction",
    text:"When light passes from a rarer medium like air into a denser medium like water, it bends towards the normal; this bending is called refraction. It happens because light changes speed as it crosses the boundary between the two media." },
  { id:"S4", subject:"Physics", topic:"Light - Reflection",
    source:"NCERT Science, Class 10 — Ch. 10: Light, Reflection and Refraction",
    text:"A pencil dipped in a glass of water appears bent at the water surface. This is a refraction effect: light rays from the submerged part of the pencil bend as they leave the water and enter the air, so the brain perceives the object at a shifted position." },
  { id:"S5", subject:"Mathematics", topic:"Quadratic Equations",
    source:"NCERT Mathematics, Class 10 — Ch. 4: Quadratic Equations",
    text:"A quadratic equation in x is one that can be written in the form ax^2 + bx + c = 0, where a, b, c are real numbers and a is not zero. It can be solved by factorisation, by completing the square, or with the quadratic formula." },
  { id:"S6", subject:"Mathematics", topic:"Quadratic Equations",
    source:"NCERT Mathematics, Class 10 — Ch. 4: Quadratic Equations",
    text:"The quadratic formula gives the roots as x = (-b ± sqrt(b^2 - 4ac)) / (2a). The term b^2 - 4ac is called the discriminant: if it is positive there are two distinct real roots, if zero there is one repeated real root, and if negative there are no real roots." },
  { id:"S7", subject:"Mathematics", topic:"Fractions",
    source:"NCERT Mathematics, Class 7 — Ch. 2: Fractions and Decimals",
    text:"To add or subtract fractions, first convert them to equivalent fractions with the same denominator (a common denominator), then add or subtract the numerators and keep the denominator unchanged." },
  { id:"S8", subject:"Mathematics", topic:"Fractions",
    source:"NCERT Mathematics, Class 7 — Ch. 2: Fractions and Decimals",
    text:"To multiply two fractions, multiply the numerators together and the denominators together. To divide by a fraction, multiply by its reciprocal — that is, flip the numerator and denominator of the divisor and then multiply." },
  { id:"S9", subject:"Biology", topic:"Photosynthesis",
    source:"NCERT Science, Class 10 — Ch. 6: Life Processes",
    text:"Photosynthesis is the process by which green plants make food. Carbon dioxide and water combine in the presence of sunlight and chlorophyll to produce glucose and oxygen. The overall reaction is 6CO2 + 6H2O -> C6H12O6 + 6O2." },
  { id:"S10", subject:"Biology", topic:"Photosynthesis",
    source:"NCERT Science, Class 10 — Ch. 6: Life Processes",
    text:"Photosynthesis mainly occurs in the leaves, inside cell organelles called chloroplasts, which contain the green pigment chlorophyll that absorbs sunlight. Stomata, tiny pores on the leaf surface, allow carbon dioxide in and oxygen out." },
  { id:"S11", subject:"Biology", topic:"Cell Structure",
    source:"NCERT Science, Class 9 — Ch. 5: The Fundamental Unit of Life",
    text:"The cell is the basic structural and functional unit of life. Every cell is enclosed by a cell membrane that controls movement of substances in and out. Plant cells additionally have a rigid cell wall outside the membrane for support." },
  { id:"S12", subject:"Biology", topic:"Cell Structure",
    source:"NCERT Science, Class 9 — Ch. 5: The Fundamental Unit of Life",
    text:"The nucleus, bound by a nuclear membrane, houses the cell's chromosomes and genetic material and directs the cell's activities. Mitochondria are the sites of cellular respiration and are often called the powerhouse of the cell." }
];

const SUBJECTS = [...new Set(KB.map(e=>e.subject))];
function topicsFor(subject){ return [...new Set(KB.filter(e=>e.subject===subject).map(e=>e.topic))]; }

/* ============================================================
   2. STORAGE HELPERS  (window.storage wrapper, safe by design)
   ============================================================ */
async function getStudent(id){
  try{
    const r = await window.storage.get('student:'+id, true);
    return r ? JSON.parse(r.value) : null;
  }catch(e){ return null; }
}
async function saveStudent(profile){
  try{
    await window.storage.set('student:'+profile.id, JSON.stringify(profile), true);
    return true;
  }catch(e){ console.error('storage save failed', e); return false; }
}
async function listStudents(){
  try{
    const r = await window.storage.list('student:', true);
    if(!r || !r.keys) return [];
    const out = [];
    for(const k of r.keys){
      try{
        const v = await window.storage.get(k, true);
        if(v) out.push(JSON.parse(v.value));
      }catch(e){ /* skip unreadable record */ }
    }
    return out;
  }catch(e){ return []; }
}
async function rememberLastName(name){
  try{ await window.storage.set('last-student-name', name, false); }catch(e){}
}
async function recallLastName(){
  try{ const r = await window.storage.get('last-student-name', false); return r ? r.value : ''; }
  catch(e){ return ''; }
}

function slugify(name){
  return name.trim().toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'') || 'student';
}
function blankProfile(id,name){
  return { id, name, lastActive: new Date().toISOString(), doubts: [], quizzes: [],
           subjectAccuracy: {}, difficulty: {} };
}
async function ensureProfile(){
  const name = document.getElementById('studentName').value.trim();
  if(!name){ throw new Error('Enter your name at the top first.'); }
  const id = slugify(name);
  let profile = await getStudent(id);
  if(!profile) profile = blankProfile(id, name);
  profile.name = name;
  profile.lastActive = new Date().toISOString();
  return profile;
}

/* ============================================================
   3. CLAUDE API HELPER
   ============================================================ */
async function callClaude(system, userMsg, maxTokens){
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens || 1200,
      system: system,
      messages: [{ role: "user", content: userMsg }]
    })
  });
  if(!resp.ok){ throw new Error("AI request failed (status "+resp.status+"). Please try again."); }
  const data = await resp.json();
  const textBlocks = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text);
  return textBlocks.join('\n').trim();
}

function stripJsonFence(text){
  return text.replace(/```json/gi,'').replace(/```/g,'').trim();
}
function escapeHtml(str){
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ============================================================
   4. TAB NAVIGATION
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+btn.dataset.tab).classList.add('active');
    if(btn.dataset.tab === 'teacher') refreshTeacher();
  });
});

/* ============================================================
   5. SUBJECT / TOPIC DROPDOWNS
   ============================================================ */
function fillSubjectSelect(sel){
  sel.innerHTML = SUBJECTS.map(s=>'<option value="'+escapeHtml(s)+'">'+escapeHtml(s)+'</option>').join('');
}
function fillTopicSelect(sel, subject, withAuto){
  const topics = topicsFor(subject);
  let opts = topics.map(t=>'<option value="'+escapeHtml(t)+'">'+escapeHtml(t)+'</option>').join('');
  if(withAuto) opts = '<option value="auto">Auto-detect from question</option>' + opts;
  sel.innerHTML = opts;
}

const doubtSubjectSel = document.getElementById('doubtSubject');
const doubtTopicSel = document.getElementById('doubtTopic');
const pracSubjectSel = document.getElementById('pracSubject');
const pracTopicSel = document.getElementById('pracTopic');

fillSubjectSelect(doubtSubjectSel);
fillSubjectSelect(pracSubjectSel);
fillTopicSelect(doubtTopicSel, doubtSubjectSel.value, true);
fillTopicSelect(pracTopicSel, pracSubjectSel.value, false);

doubtSubjectSel.addEventListener('change', ()=> fillTopicSelect(doubtTopicSel, doubtSubjectSel.value, true));
pracSubjectSel.addEventListener('change', ()=> {
  fillTopicSelect(pracTopicSel, pracSubjectSel.value, false);
  updateDiffBadge();
});
pracTopicSel.addEventListener('change', updateDiffBadge);

/* ============================================================
   6. DOUBT SOLVER
   ============================================================ */
function retrieveContext(subject, topic, questionText){
  let pool = KB.filter(e=>e.subject===subject);
  if(topic && topic !== 'auto') pool = pool.filter(e=>e.topic===topic);
  if(pool.length===0) pool = KB.filter(e=>e.subject===subject);
  const words = (questionText||'').toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>3);
  const scored = pool.map(e=>{
    const hay = (e.text+' '+e.topic).toLowerCase();
    const score = words.reduce((s,w)=> s + (hay.includes(w)?1:0), 0);
    return { ...e, score };
  });
  scored.sort((a,b)=> b.score - a.score);
  return scored.slice(0,3);
}

document.getElementById('doubtSubmit').addEventListener('click', async ()=>{
  const errBox = document.getElementById('doubtError');
  const statusEl = document.getElementById('doubtStatus');
  const btn = document.getElementById('doubtSubmit');
  errBox.innerHTML = '';
  const question = document.getElementById('doubtInput').value.trim();
  if(!question){ errBox.innerHTML = '<div class="error-box">Type a question first.</div>'; return; }

  let profile;
  try{ profile = await ensureProfile(); }
  catch(e){ errBox.innerHTML = '<div class="error-box">'+escapeHtml(e.message)+'</div>'; return; }

  const subject = doubtSubjectSel.value;
  const topic = doubtTopicSel.value;
  const lang = document.getElementById('doubtLang').value;
  const context = retrieveContext(subject, topic, question);

  btn.disabled = true;
  statusEl.style.display = 'flex';
  document.getElementById('doubtAnswerWrap').innerHTML = '';

  try{
    const contextBlock = context.map(c=>'['+c.id+'] Source: '+c.source+'\n"'+c.text+'"').join('\n\n');
    const system = "You are StudyBridge, a patient tutor for under-resourced school students in India. "+
      "You must explain ONLY using the numbered source excerpts given to you — never invent facts beyond them. "+
      "Write a short, simple, step-by-step explanation (3-6 short steps, plain language, no jargon unless you define it). "+
      "Every factual claim must end with the bracket tag of the source it came from, e.g. [S1]. "+
      "If the sources do not fully cover the question, say plainly what is missing rather than guessing. "+
      "Respond in this language: "+lang+". Do not use markdown headers, just short paragraphs or a numbered list with plain text, and **bold** for key terms only.";
    const user = "Source excerpts:\n\n"+contextBlock+"\n\nStudent question: "+question;
    const answer = await callClaude(system, user, 900);

    profile.doubts.unshift({ ts: Date.now(), subject, topic: topic==='auto'?'auto':topic, question, language: lang });
    profile.doubts = profile.doubts.slice(0,20);
    await saveStudent(profile);
    await rememberLastName(profile.name);

    renderDoubtAnswer(answer, context);
  }catch(e){
    errBox.innerHTML = '<div class="error-box">'+escapeHtml(e.message || 'Something went wrong. Please try again.')+'</div>';
  }finally{
    btn.disabled = false;
    statusEl.style.display = 'none';
  }
});

function renderDoubtAnswer(rawAnswer, context){
  const bySrc = {};
  context.forEach(c=> bySrc[c.id] = c);

  let html = escapeHtml(rawAnswer);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[(S\d+)\]/g, function(_, id){
    if(!bySrc[id]) return '';
    return ' <span class="cite-chip" data-src="'+id+'">'+id+'</span>';
  });
  html = html.split(/\n{2,}/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('');

  const sourceCards = context.map(c=>
    '<div class="source-card" id="src-'+c.id+'"><div class="src-title">'+c.id+' · '+escapeHtml(c.source)+'</div>'+escapeHtml(c.text)+'</div>'
  ).join('');

  document.getElementById('doubtAnswerWrap').innerHTML =
    '<div class="card"><div class="answer-block">'+html+'</div>'+
    '<div style="margin-top:8px; font-size:11.5px; color:var(--ink-soft);">Tap a citation tag to see the exact source excerpt.</div>'+
    sourceCards+'</div>';

  document.querySelectorAll('.cite-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const card = document.getElementById('src-'+chip.dataset.src);
      if(card) card.classList.toggle('open');
    });
  });
}

/* ============================================================
   7. ADAPTIVE PRACTICE
   ============================================================ */
async function updateDiffBadge(){
  const badge = document.getElementById('pracDiffBadge');
  const name = document.getElementById('studentName').value.trim();
  let diff = 'medium';
  if(name){
    const profile = await getStudent(slugify(name));
    if(profile && profile.difficulty && profile.difficulty[pracSubjectSel.value]){
      diff = profile.difficulty[pracSubjectSel.value];
    }
  }
  badge.className = 'badge diff-'+diff;
  badge.textContent = diff.toUpperCase();
  badge.dataset.diff = diff;
}
updateDiffBadge();

function weakTopicsFor(profile, subject){
  const weak = [];
  Object.keys(profile.subjectAccuracy||{}).forEach(key=>{
    if(!key.startsWith(subject+':')) return;
    const stat = profile.subjectAccuracy[key];
    if(stat.total >= 2 && (stat.correct/stat.total) < 0.5) weak.push(key.split(':')[1]);
  });
  return weak;
}

document.getElementById('pracGenerate').addEventListener('click', async ()=>{
  const errBox = document.getElementById('pracError');
  const statusEl = document.getElementById('pracStatus');
  const btn = document.getElementById('pracGenerate');
  errBox.innerHTML = '';

  let profile;
  try{ profile = await ensureProfile(); }
  catch(e){ errBox.innerHTML = '<div class="error-box">'+escapeHtml(e.message)+'</div>'; return; }

  const subject = pracSubjectSel.value;
  const topic = pracTopicSel.value;
  const difficulty = document.getElementById('pracDiffBadge').dataset.diff || 'medium';
  const weak = weakTopicsFor(profile, subject);
  const context = KB.filter(e=>e.subject===subject && e.topic===topic).map(e=>e.text).join(' ');

  btn.disabled = true;
  statusEl.style.display = 'flex';
  document.getElementById('pracQuizWrap').innerHTML = '';

  try{
    const system = "You write short multiple-choice practice quizzes for school students, grounded strictly in the given source material. "+
      "Return ONLY valid JSON, no prose, no markdown fences: an array of exactly 5 objects, each with keys "+
      "question (string), options (array of exactly 4 strings), correctIndex (0-3 integer), explanation (short string), topic (short string subtopic label). "+
      "Match difficulty level: "+difficulty+". "+
      (weak.length ? ("Give extra weight to these subtopics the student is weak in: "+weak.join(', ')+". ") : "")+
      "Base every question only on the given source text.";
    const user = "Subject: "+subject+"\nTopic: "+topic+"\nSource text: "+context;
    const raw = await callClaude(system, user, 1400);
    let quiz;
    try{ quiz = JSON.parse(stripJsonFence(raw)); }
    catch(parseErr){ throw new Error("Could not read the generated quiz. Please try generating again."); }
    if(!Array.isArray(quiz) || quiz.length===0) throw new Error("Quiz came back empty. Please try again.");

    renderQuiz(quiz, { profile, subject, topic, difficulty });
  }catch(e){
    errBox.innerHTML = '<div class="error-box">'+escapeHtml(e.message || 'Could not generate the quiz. Please try again.')+'</div>';
  }finally{
    btn.disabled = false;
    statusEl.style.display = 'none';
  }
});

function renderQuiz(quiz, ctx){
  const wrap = document.getElementById('pracQuizWrap');
  let html = '<div class="card">';
  quiz.forEach((q,i)=>{
    html += '<div class="qz-q" data-idx="'+i+'">';
    html += '<div class="qz-prompt">'+(i+1)+'. '+escapeHtml(q.question)+'</div>';
    (q.options||[]).forEach((opt,oi)=>{
      html += '<label class="qz-opt"><input type="radio" name="q'+i+'" value="'+oi+'"> <span>'+escapeHtml(opt)+'</span></label>';
    });
    html += '<div class="qz-result" id="qzr-'+i+'"></div>';
    html += '</div>';
  });
  html += '<button class="primary" id="qzSubmit">Submit quiz</button>';
  html += '<div id="qzScoreWrap"></div>';
  html += '</div>';
  wrap.innerHTML = html;

  document.getElementById('qzSubmit').addEventListener('click', async ()=>{
    let correct = 0;
    const topicTally = {};
    quiz.forEach((q,i)=>{
      const picked = document.querySelector('input[name="q'+i+'"]:checked');
      const resultEl = document.getElementById('qzr-'+i);
      const subtopic = q.topic || ctx.topic;
      topicTally[subtopic] = topicTally[subtopic] || {correct:0,total:0};
      topicTally[subtopic].total++;
      if(!picked){
        resultEl.className = 'qz-result show wrong';
        resultEl.textContent = 'Not answered. Correct: ' + (q.options[q.correctIndex]||'') + ' — ' + (q.explanation||'');
        return;
      }
      const isCorrect = parseInt(picked.value,10) === q.correctIndex;
      if(isCorrect){ correct++; topicTally[subtopic].correct++; }
      resultEl.className = 'qz-result show ' + (isCorrect ? 'correct' : 'wrong');
      resultEl.textContent = (isCorrect ? 'Correct. ' : 'Not quite. Correct answer: ' + (q.options[q.correctIndex]||'') + '. ') + (q.explanation||'');
    });

    const total = quiz.length;
    const pct = total ? correct/total : 0;
    document.getElementById('qzScoreWrap').innerHTML =
      '<div class="score-banner" style="margin-top:16px;"><div>Score</div><div class="big">'+correct+' / '+total+'</div></div>';
    document.getElementById('qzSubmit').disabled = true;

    // update profile
    const profile = ctx.profile;
    profile.quizzes.unshift({ ts: Date.now(), subject: ctx.subject, topic: ctx.topic, difficulty: ctx.difficulty, score: correct, total });
    profile.quizzes = profile.quizzes.slice(0,30);
    profile.subjectAccuracy = profile.subjectAccuracy || {};
    Object.keys(topicTally).forEach(t=>{
      const key = ctx.subject+':'+t;
      const prev = profile.subjectAccuracy[key] || {correct:0,total:0};
      profile.subjectAccuracy[key] = { correct: prev.correct + topicTally[t].correct, total: prev.total + topicTally[t].total };
    });
    profile.difficulty = profile.difficulty || {};
    let nextDiff = ctx.difficulty;
    if(pct >= 0.8) nextDiff = ctx.difficulty === 'easy' ? 'medium' : 'hard';
    else if(pct <= 0.4) nextDiff = ctx.difficulty === 'hard' ? 'medium' : 'easy';
    profile.difficulty[ctx.subject] = nextDiff;
    profile.lastActive = new Date().toISOString();

    await saveStudent(profile);
    await rememberLastName(profile.name);
    updateDiffBadge();
  });
}

/* ============================================================
   8. TEACHER DASHBOARD
   ============================================================ */
function overallAccuracy(profile){
  let c=0,t=0;
  Object.values(profile.subjectAccuracy||{}).forEach(s=>{ c+=s.correct; t+=s.total; });
  return t>0 ? c/t : null;
}
function weakList(profile){
  return Object.entries(profile.subjectAccuracy||{})
    .filter(([,s])=> s.total>=2 && (s.correct/s.total)<0.5)
    .map(([k])=>k.replace(':',' · '));
}
function daysSince(iso){
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

async function refreshTeacher(){
  const wrap = document.getElementById('teacherWrap');
  wrap.innerHTML = '<div class="spinner-row" style="justify-content:center;"><span class="spinner"></span> Loading class data…</div>';
  const students = await listStudents();
  if(students.length === 0){
    wrap.innerHTML = '<div class="empty-state"><div class="display">No student activity yet</div>Once students use the Doubt Solver or Practice tabs, they will appear here.</div>';
    return;
  }
  students.sort((a,b)=> (overallAccuracy(a) ?? 1) - (overallAccuracy(b) ?? 1));

  let html = '';
  students.forEach(s=>{
    const acc = overallAccuracy(s);
    const inactiveDays = daysSince(s.lastActive);
    const weak = weakList(s);
    let flag = { cls:'ok', label:'On track' };
    if(acc === null) flag = { cls:'new', label:'No quizzes yet' };
    else if(acc < 0.5) flag = { cls:'attn', label:'Needs attention' };
    else if(inactiveDays >= 3) flag = { cls:'attn', label:'Inactive '+inactiveDays+'d' };

    const totalQ = Object.values(s.subjectAccuracy||{}).reduce((a,b)=>a+b.total,0);
    const totalC = Object.values(s.subjectAccuracy||{}).reduce((a,b)=>a+b.correct,0);

    html += '<div class="stu-card">'+
      '<div class="stu-head"><span class="stu-name">'+escapeHtml(s.name)+'</span>'+
      '<span class="flag '+flag.cls+'">'+flag.label+'</span></div>'+
      '<div class="stat-row">'+
        '<span>Doubts asked: <b>'+(s.doubts?s.doubts.length:0)+'</b></span>'+
        '<span>Quizzes taken: <b>'+(s.quizzes?s.quizzes.length:0)+'</b></span>'+
        '<span>Accuracy: <b>'+(acc===null?'—':Math.round(acc*100)+'%')+'</b> ('+totalC+'/'+totalQ+')</span>'+
        '<span>Last active: <b>'+(inactiveDays===0?'today':inactiveDays+'d ago')+'</b></span>'+
      '</div>'+
      (weak.length ? '<div class="weak-tags">'+weak.map(w=>'<span class="weak-tag">'+escapeHtml(w)+'</span>').join('')+'</div>' : '')+
      '</div>';
  });
  wrap.innerHTML = html;
}
document.getElementById('teacherRefresh').addEventListener('click', refreshTeacher);

/* ============================================================
   9. INIT
   ============================================================ */
(async function init(){
  try{
    const last = await recallLastName();
    if(last) document.getElementById('studentName').value = last;
  }catch(e){}
  updateDiffBadge();
})();

})();
