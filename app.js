const API_BASE = "https://studybridge.faizanusmani020.workers.dev";

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
    text:"The nucleus, bound by a nuclear membrane, houses the cell's chromosomes and genetic material and directs the cell's activities. Mitochondria are the sites of cellular respiration and are often called the powerhouse of the cell." },
  { id:"S13", subject:"Physics", topic:"Electric Current",
    source:"NCERT Science, Class 10 — Ch. 12: Electricity",
    text:"Electric current is the rate of flow of electric charge through a conductor, measured in amperes. It flows when there is a potential difference (voltage), measured in volts, between two points of a conductor, usually provided by a cell or battery." },
  { id:"S14", subject:"Physics", topic:"Electric Current",
    source:"NCERT Science, Class 10 — Ch. 12: Electricity",
    text:"Ohm's law states that the current through a conductor is directly proportional to the potential difference across it, provided temperature stays constant: V = IR, where R is the resistance in ohms. Higher resistance means less current for the same voltage." },
  { id:"S15", subject:"Physics", topic:"Work and Energy",
    source:"NCERT Science, Class 9 — Ch. 11: Work and Energy",
    text:"Work is done on an object when a force causes it to move in the direction of the force. Work (W) equals force (F) multiplied by displacement (s) in the direction of the force: W = F x s. Work is measured in joules." },
  { id:"S16", subject:"Physics", topic:"Work and Energy",
    source:"NCERT Science, Class 9 — Ch. 11: Work and Energy",
    text:"Energy is the capacity to do work. Kinetic energy is the energy of motion, calculated as (1/2)mv^2. Potential energy is stored energy due to position, such as gravitational potential energy, calculated as mgh. Energy can change form but the total amount is conserved." },
  { id:"S17", subject:"Physics", topic:"Sound",
    source:"NCERT Science, Class 9 — Ch. 12: Sound",
    text:"Sound is produced by vibrating objects and travels as a longitudinal wave, needing a medium such as air, water, or a solid to travel through — it cannot travel through a vacuum. The wave causes particles of the medium to vibrate back and forth along the direction the sound travels." },
  { id:"S18", subject:"Physics", topic:"Sound",
    source:"NCERT Science, Class 9 — Ch. 12: Sound",
    text:"The pitch of a sound depends on its frequency: higher frequency means higher pitch. Loudness depends on amplitude: greater amplitude means louder sound. The speed of sound is generally fastest in solids, slower in liquids, and slowest in gases." },
  { id:"S19", subject:"Chemistry", topic:"Chemical Reactions",
    source:"NCERT Science, Class 10 — Ch. 1: Chemical Reactions and Equations",
    text:"A chemical reaction involves the rearrangement of atoms to form new substances with different properties from the reactants. Signs a chemical reaction has occurred include a change in colour, formation of a gas, formation of a precipitate, or a change in temperature." },
  { id:"S20", subject:"Chemistry", topic:"Chemical Reactions",
    source:"NCERT Science, Class 10 — Ch. 1: Chemical Reactions and Equations",
    text:"A balanced chemical equation has equal numbers of atoms of each element on both the reactant and product sides, following the law of conservation of mass. Combination, decomposition, displacement, and double displacement are common reaction types." },
  { id:"S21", subject:"Chemistry", topic:"Acids Bases and Salts",
    source:"NCERT Science, Class 10 — Ch. 2: Acids, Bases and Salts",
    text:"Acids turn blue litmus paper red and release hydrogen ions (H+) in water; bases turn red litmus paper blue and release hydroxide ions (OH-) in water. The pH scale, from 0 to 14, measures acidity or basicity: below 7 is acidic, above 7 is basic, and 7 is neutral." },
  { id:"S22", subject:"Chemistry", topic:"Acids Bases and Salts",
    source:"NCERT Science, Class 10 — Ch. 2: Acids, Bases and Salts",
    text:"When an acid reacts with a base, they neutralise each other to form a salt and water; this is called a neutralisation reaction. For example, hydrochloric acid reacting with sodium hydroxide produces sodium chloride (common salt) and water." },
  { id:"S23", subject:"Mathematics", topic:"Algebra Basics",
    source:"NCERT Mathematics, Class 8 — Ch. 9: Algebraic Expressions and Identities",
    text:"An algebraic expression is built from variables, constants, and operations like addition and multiplication, for example 3x + 5. Terms with the same variable raised to the same power are called like terms and can be combined by adding or subtracting their coefficients." },
  { id:"S24", subject:"Mathematics", topic:"Algebra Basics",
    source:"NCERT Mathematics, Class 8 — Ch. 9: Algebraic Expressions and Identities",
    text:"Common algebraic identities include (a+b)^2 = a^2 + 2ab + b^2, (a-b)^2 = a^2 - 2ab + b^2, and (a+b)(a-b) = a^2 - b^2. These let you expand or factorise expressions quickly without multiplying term by term." },
  { id:"S25", subject:"Mathematics", topic:"Probability",
    source:"NCERT Mathematics, Class 10 — Ch. 15: Probability",
    text:"Probability measures how likely an event is to happen, on a scale from 0 (impossible) to 1 (certain). The probability of an event E is calculated as the number of outcomes favourable to E divided by the total number of equally likely outcomes." },
  { id:"S26", subject:"Mathematics", topic:"Probability",
    source:"NCERT Mathematics, Class 10 — Ch. 15: Probability",
    text:"For example, when tossing a fair coin, there are 2 equally likely outcomes (heads or tails), so the probability of heads is 1/2. When rolling a fair six-sided die, the probability of rolling a 4 is 1/6, since there is 1 favourable outcome out of 6 total outcomes." },
  { id:"S27", subject:"Biology", topic:"Respiration",
    source:"NCERT Science, Class 10 — Ch. 6: Life Processes",
    text:"Respiration is the process by which living organisms break down food, usually glucose, to release energy for cellular activities. Aerobic respiration uses oxygen and releases carbon dioxide, water, and a large amount of energy; anaerobic respiration happens without oxygen and releases less energy." },
  { id:"S28", subject:"Biology", topic:"Respiration",
    source:"NCERT Science, Class 10 — Ch. 6: Life Processes",
    text:"In humans, air enters through the nose, passes down the trachea into the lungs, and reaches tiny air sacs called alveoli, where oxygen diffuses into the blood and carbon dioxide diffuses out to be exhaled. The diaphragm helps drive this breathing movement." },
  { id:"S29", subject:"Biology", topic:"Heredity",
    source:"NCERT Science, Class 10 — Ch. 9: Heredity and Evolution",
    text:"Heredity is the passing of traits from parents to offspring through genes carried on chromosomes. Each parent contributes one set of genes, so offspring inherit a combination of traits from both parents, which is why children resemble but are not identical to their parents." },
  { id:"S30", subject:"Biology", topic:"Heredity",
    source:"NCERT Science, Class 10 — Ch. 9: Heredity and Evolution",
    text:"A dominant trait shows up in an organism even if only one copy of its gene is inherited, while a recessive trait shows up only if both inherited copies carry it. Gregor Mendel's experiments with pea plants first revealed these patterns of inheritance." }
];

const SUBJECTS = [...new Set(KB.map(e=>e.subject))];
function topicsFor(subject){ return [...new Set(KB.filter(e=>e.subject===subject).map(e=>e.topic))]; }

/* ============================================================
   2. STORAGE HELPERS  (Storage client wrapper, safe by design)

   Backed by the browser's localStorage — all data lives on this
   device/browser only. Note: this means Teacher View can only see
   students who used quizzes on THIS SAME browser; it cannot see
   students on other devices, since localStorage never leaves the
   browser it was written in.
   ============================================================ */
const LS_PREFIX_SHARED = 'sb_shared::';
const LS_PREFIX_LOCAL  = 'sb_local::';

function lsKey(key, shared){ return (shared ? LS_PREFIX_SHARED : LS_PREFIX_LOCAL) + key; }

const Storage = {
  async get(key, shared){
    try{
      const raw = localStorage.getItem(lsKey(key, shared));
      if(raw==null) return null;
      return { key, value: raw, shared: !!shared };
    }catch(e){ console.error('Storage.get failed', e); return null; }
  },
  async set(key, value, shared){
    try{
      localStorage.setItem(lsKey(key, shared), String(value));
      return { key, value, shared: !!shared };
    }catch(e){ console.error('Storage.set failed', e); return null; }
  },
  async delete(key, shared){
    try{
      localStorage.removeItem(lsKey(key, shared));
      return { key, deleted:true, shared: !!shared };
    }catch(e){ console.error('Storage.delete failed', e); return null; }
  },
  async list(prefix, shared){
    try{
      const fullPrefix = lsKey(prefix||'', shared);
      const keys = [];
      for(let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if(k && k.startsWith(fullPrefix)) keys.push(k.slice((shared?LS_PREFIX_SHARED:LS_PREFIX_LOCAL).length));
      }
      return { keys, prefix: prefix||'', shared: !!shared };
    }catch(e){ console.error('Storage.list failed', e); return null; }
  }
};

async function getStudent(id){
  try{
    const r = await Storage.get('student:'+id, true);
    return r ? JSON.parse(r.value) : null;
  }catch(e){ console.error('getStudent parse failed', e); return null; }
}
async function saveStudent(profile){
  try{
    const r = await Storage.set('student:'+profile.id, JSON.stringify(profile), true);
    if(!r) console.error('saveStudent: Storage.set returned no result for', profile.id);
    return !!r;
  }catch(e){ console.error('storage save failed', e); return false; }
}
async function listStudents(){
  try{
    const r = await Storage.list('student:', true);
    if(!r || !r.keys) return [];
    const out = [];
    for(const k of r.keys){
      try{
        const v = await Storage.get(k, true);
        if(v) out.push(JSON.parse(v.value));
      }catch(e){ /* skip unreadable record */ }
    }
    return out;
  }catch(e){ return []; }
}
async function rememberLastName(name){
  try{ await Storage.set('last-student-name', name, false); }catch(e){}
}
async function recallLastName(){
  try{ const r = await Storage.get('last-student-name', false); return r ? r.value : ''; }
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
   3. GROK API HELPERS + CONVERSATION STATE
   ============================================================ */
const tutorConversation = [];
let tutorAbortController = null;
let tutorSessionId = null;

function getTutorSystemPrompt(profile, lang, context, intent){
  const grade = profile?.grade || 'school level';
  const focus = (profile?.focusAreas || []).join(', ') || 'general learning';
  const contextBlock = context.length
    ? context.map(c => `[${c.id}] Source: ${c.source}\n${c.text}`).join('\n\n')
    : '(No matching source excerpt was found in the current StudyBridge library.)';
  return `You are StudyBridge Tutor, a patient personal tutor for students in India.

`+
    `Student profile: Grade ${grade}; preferred language ${lang}; focus areas: ${focus}.
`+
    `Current intent: ${intent}.

`+
    `GROUNDING RULES:
`+
    `- Use the supplied source excerpts as the factual foundation whenever they are relevant.
`+
    `- Never invent source IDs or claim a statement is grounded if it is not supported.
`+
    `- If no supplied source covers the question, say clearly that the answer is general knowledge.
`+
    `- Adapt complexity to the student's grade and use ${lang}.
`+
    `- Remember the ongoing conversation. Do not restart the lesson or repeat everything unnecessarily.
`+
    `- If the student says they do not understand, explain the idea differently using an analogy or simpler wording.
`+
    `- For calculations, show the important steps.
`+
    `- If asked for a quiz, make it interactive and grounded in the current topic.
`+
    `- Keep answers concise but useful.

`+
    `SOURCE EXCERPTS:
${contextBlock}`;
}

async function streamTutorMessage({message, profile, lang, context, intent, onToken}){
  if(tutorAbortController) tutorAbortController.abort();
  tutorAbortController = new AbortController();

  const payload = {
    model: 'grok-4.20-0309-non-reasoning',
    sessionId: tutorSessionId,
    system: getTutorSystemPrompt(profile, lang, context, intent),
    messages: tutorConversation.concat([{ role:'user', content: message }]),
    stream: true
  };

  const resp = await fetch(`${API_BASE}/api/tutor`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
    signal:tutorAbortController.signal
  });
  if(!resp.ok){
    let detail='Tutor request failed ('+resp.status+').';
    try{ const j=await resp.json(); if(j?.error) detail=j.error; }catch{}
    throw new Error(detail);
  }
  if(!resp.body) throw new Error('Streaming is not supported by this browser.');

  const reader=resp.body.getReader();
  const decoder=new TextDecoder();
  let buffer='';
  let fullText='';
  while(true){
    const {value,done}=await reader.read();
    if(done) break;
    buffer += decoder.decode(value,{stream:true});
    const parts=buffer.split(/\r?\n/);
    buffer=parts.pop()||'';
    for(const line of parts){
      if(!line.startsWith('data:')) continue;
      const data=line.slice(5).trim();
      if(data==='[DONE]') continue;
      try{
        const evt=JSON.parse(data);
        if(evt.sessionId) tutorSessionId=evt.sessionId;
        if(evt.delta){ fullText += evt.delta; onToken(evt.delta, fullText); }
        if(evt.error) throw new Error(evt.error);
      }catch(err){
        if(err instanceof SyntaxError) continue;
        throw err;
      }
    }
  }
  tutorConversation.push({role:'user',content:message},{role:'assistant',content:fullText});
  return fullText;
}

async function callGrok(system, userMsg, maxTokens){
  const resp = await fetch(`${API_BASE}/api/ai`, {
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'grok-4.20-0309-non-reasoning',system,messages:[{role:'user',content:userMsg}],max_tokens:maxTokens||1400})
  });
  if(!resp.ok){
    let msg='AI request failed.';
    try{const j=await resp.json(); if(j?.error) msg=j.error;}catch{}
    throw new Error(msg);
  }
  const data=await resp.json();
  return data.text || data.output_text || data.content || '';
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
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active', p.id==='panel-'+tab));
  if(tab === 'home') renderHome();
  if(tab === 'doubt') setTimeout(()=>document.getElementById('doubtInput')?.focus(),120);
  if(tab === 'progress') renderProgress();
  if(tab === 'teacher') refreshTeacher();
  if(tab === 'scholar') prefillEligibility();
}

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>switchTab(btn.dataset.tab));
});

document.querySelectorAll('[data-go]').forEach(btn=>{
  btn.addEventListener('click', ()=>switchTab(btn.dataset.go));
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
/* Used by the AI Tutor, which no longer has a subject dropdown — subject is
   auto-detected from the question text, but the student can still narrow
   to a specific topic across the whole library if they want to. */
function fillTopicSelectAll(sel){
  const topics = [...new Set(KB.map(e=>e.topic))];
  const opts = '<option value="auto">Auto-detect from question</option>' +
    topics.map(t=>'<option value="'+escapeHtml(t)+'">'+escapeHtml(t)+'</option>').join('');
  sel.innerHTML = opts;
}

const doubtTopicSel = document.getElementById('doubtTopic');
const pracSubjectSel = document.getElementById('pracSubject');
const pracTopicSel = document.getElementById('pracTopic');

fillTopicSelectAll(doubtTopicSel);
doubtTopicSel.value = 'auto';
fillSubjectSelect(pracSubjectSel);
fillTopicSelect(pracTopicSel, pracSubjectSel.value, false);

pracSubjectSel.addEventListener('change', ()=> {
  fillTopicSelect(pracTopicSel, pracSubjectSel.value, false);
  updateDiffBadge();
});
pracTopicSel.addEventListener('change', updateDiffBadge);

/* ============================================================
   6. DOUBT SOLVER
   ============================================================ */
function scorePool(pool, words){
  const scored = pool.map(e=>{
    const hay = (e.text+' '+e.topic).toLowerCase();
    const score = words.reduce((s,w)=> s + (hay.includes(w)?1:0), 0);
    return { ...e, score };
  });
  scored.sort((a,b)=> b.score - a.score);
  return scored;
}

/* Subject is auto-detected from the question text rather than manually
   chosen — the student shouldn't have to know which subject their own
   question belongs to. Topic filter (including 'auto') is still honored
   when set, and retrieval widens automatically if nothing matches. */
function retrieveContext(topic, questionText){
  const words = (questionText||'').toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>3);
  let widened = null;

  let pool = (topic && topic !== 'auto') ? KB.filter(e=>e.topic===topic) : KB;
  let scored = scorePool(pool, words);

  if(topic && topic !== 'auto' && (scored.length===0 || scored[0].score===0)){
    const allPool = scorePool(KB, words);
    if(allPool.length && allPool[0].score > 0){
      scored = allPool;
      widened = 'topic';
    }
  }

  // Nothing in the whole library matches this question at all — don't hand the
  // model an irrelevant snippet and don't refuse; flag for an honest ungrounded answer.
  if(scored.length===0 || scored[0].score===0){
    return { results: [], widened: 'none', detectedSubject: null };
  }

  const results = scored.slice(0,3);
  return { results, widened, detectedSubject: results[0].subject };
}


function chatScrollToBottom(){
  const wrap=document.getElementById('doubtAnswerWrap');
  if(wrap) wrap.scrollTop=wrap.scrollHeight;
}

function appendChatBubble(role, text='', meta=''){
  const wrap=document.getElementById('doubtAnswerWrap');
  const el=document.createElement('div');
  el.className='chat-bubble-row '+(role==='user'?'user':'assistant')+' fade-in';
  el.innerHTML = role==='user'
    ? '<div class="chat-bubble user-bubble">'+escapeHtml(text).replace(/\\n/g,'<br>')+'</div>'
    : '<div class="chat-bubble assistant-bubble"><div class="chat-bubble-brand"><span class="ai-avatar">✦</span><span>StudyBridge Tutor</span><span class="chat-live-dot">●</span></div><div class="chat-stream-text"></div><div class="chat-meta">'+escapeHtml(meta)+'</div></div>';
  wrap.querySelector('.ai-empty')?.remove();
  wrap.appendChild(el);
  chatScrollToBottom();
  return el;
}

function renderChatAnswerCard(bubbleEl, raw, context, widened){
  const textEl=bubbleEl.querySelector('.chat-stream-text');
  const parsed=structureTutorAnswer(raw);
  const safe=x=>escapeHtml(x||'');
  const grounded=context.length>0;
  const steps=parsed.steps.length?parsed.steps.map((s,i)=>'<div class="tutor-step"><span class="tutor-step-num">'+(i+1)+'</span><div>'+safe(s)+'</div></div>').join(''):
    '<div class="tutor-step"><span class="tutor-step-num">1</span><div>'+safe(parsed.direct)+'</div></div>';
  const sources=context.map(c=>
    '<button type="button" class="tutor-source-item" data-src="'+c.id+'"><span class="tutor-source-id">'+c.id+'</span><span><b>'+escapeHtml(c.source)+'</b><small>'+escapeHtml(c.text.slice(0,150))+(c.text.length>150?'…':'')+'</small></span><span class="tutor-source-arrow">→</span></button>'+
    '<div class="source-card tutor-source-detail" id="src-'+c.id+'"><div class="src-title">'+c.id+' · '+escapeHtml(c.source)+'</div>'+escapeHtml(c.text)+'</div>'
  ).join('');
  const widenNote = widened==='none'
    ? '<div class="info-box">No matching source was found in the current library, so this explanation is general knowledge rather than textbook-grounded.</div>'
    : widened==='topic'
      ? '<div class="info-box">I widened the search within this subject to find a better source match.</div>'
      : widened==='subject'
        ? '<div class="info-box">I widened the search across subjects to find a better source match.</div>' : '';
  const follow='<div class="chat-followups"><button class="ai-followup" data-ai-follow="Explain that more simply">Explain simpler</button><button class="ai-followup" data-ai-follow="Give me a real-life example">Give an example</button><button class="ai-followup" data-ai-follow="Quiz me on this topic">Quiz me</button><button class="ai-followup" data-ai-follow="Show the key formula or rule">Key rule</button></div>';
  textEl.innerHTML = widenNote +
    '<div class="streaming-answer-card">'+
      '<div class="streaming-kicker">'+(grounded?'✓ Grounded explanation':'◌ General explanation')+'</div>'+
      '<div class="tutor-direct"><span class="tutor-kicker">DIRECT ANSWER</span><p>'+safe(parsed.direct)+'</p></div>'+
      '<div class="tutor-section"><div class="tutor-section-title">Step by step</div>'+steps+'</div>'+
      (parsed.example?'<div class="tutor-callout example"><div class="tutor-callout-title">💡 Example</div><p>'+safe(parsed.example)+'</p></div>':'')+
      (parsed.simple?'<div class="tutor-callout simple"><div class="tutor-callout-title">🧒 In simple words</div><p>'+safe(parsed.simple)+'</p></div>':'')+
      (context.length?'<div class="tutor-sources"><div class="ai-source-head"><span>📚 Source evidence</span><span>'+context.length+' source'+(context.length>1?'s':'')+'</span></div><div class="tutor-source-list">'+sources+'</div></div>':'')+
      follow+
    '</div>';
  textEl.querySelectorAll('.tutor-source-item').forEach(item=>item.addEventListener('click',()=>document.getElementById('src-'+item.dataset.src)?.classList.toggle('open')));
  textEl.querySelectorAll('[data-ai-follow]').forEach(btn=>btn.addEventListener('click',()=>sendTutorMessage(btn.dataset.aiFollow)));
  chatScrollToBottom();
}

async function sendTutorMessage(prefilled){
  const errBox=document.getElementById('doubtError');
  const input=document.getElementById('doubtInput');
  const btn=document.getElementById('doubtSubmit');
  const statusEl=document.getElementById('doubtStatus');
  errBox.innerHTML='';
  const message=String(prefilled ?? input.value).trim();
  if(!message) return;
  input.value='';

  let profile;
  try{ profile=await ensureProfile(); }catch(e){errBox.innerHTML='<div class="error-box">'+escapeHtml(e.message)+'</div>';return;}
  const topic=doubtTopicSel.value;
  const lang=document.getElementById('doubtLang').value;
  const retrieval=retrieveContext(topic,message);
  const context=retrieval.results;
  const subject=retrieval.detectedSubject || 'General';
  const intent=detectIntent(message);

  btn.disabled=true;
  statusEl.style.display='flex';
  statusEl.querySelector('span:last-child').textContent='StudyBridge is thinking and streaming your answer…';

  appendChatBubble('user',message);
  const bubble=appendChatBubble('assistant','',lang+' · '+(context.length?'grounded':'general help'));
  const streamText=bubble.querySelector('.chat-stream-text');
  streamText.innerHTML='<span class="typing-cursor">▌</span>';

  try{
    let streamed='';
    await streamTutorMessage({message,profile,lang,context,intent,onToken:(delta,full)=>{
      streamed=full;
      streamText.textContent=full;
      streamText.insertAdjacentHTML('beforeend','<span class="typing-cursor">▌</span>');
      chatScrollToBottom();
    }});
    streamText.textContent='';
    renderChatAnswerCard(bubble,streamed,context,retrieval.widened);
    profile.doubts.unshift({ts:Date.now(),subject,topic:topic==='auto'?'auto':topic,question:message,language:lang});
    profile.doubts=profile.doubts.slice(0,20);
    await saveStudent(profile); await rememberLastName(profile.name);
  // }catch(e){
  //   console.warn('Grok tutor unavailable; using local grounded fallback.',e);
  //   streamText.textContent='';
  //   const fallback=localGroundedAnswer(context,message);
  //   renderChatAnswerCard(bubble,[fallback.direct].concat(fallback.steps.map((s,i)=>(i+1)+'. '+s),fallback.example?['Example: '+fallback.example]:[],fallback.simple?['In simple words: '+fallback.simple]:[]).join('\n\n'),context,retrieval.widened);
  //   errBox.innerHTML='<div class="info-box">Live Grok tutoring is unavailable right now. I showed a grounded StudyBridge fallback so the lesson can continue.</div>';
  // }

  }catch(e){
  console.error("Grok ERROR:", e);

  streamText.textContent = "";

  errBox.innerHTML = `
    <div class="error-box">
      <strong>Grok connection failed</strong><br>
      ${escapeHtml(e.message || "Unknown error")}
    </div>
  `;

  // Also show the grounded fallback
  const fallback = localGroundedAnswer(context, message);

  renderChatAnswerCard(
    bubble,
    [
      fallback.direct,
      ...fallback.steps.map((s,i) => `${i+1}. ${s}`),
      fallback.example ? `Example: ${fallback.example}` : "",
      fallback.simple ? `In simple words: ${fallback.simple}` : ""
    ].filter(Boolean).join("\n\n"),
    context,
    retrieval.widened
  );
}
  
  finally{
    btn.disabled=false; statusEl.style.display='none';
  }
}


function detectIntent(q){
  const s=String(q||'').toLowerCase();
  if(/\b(solve|calculate|evaluate|find|compute)\b/.test(s)) return 'solve';
  if(/\b(quiz|test me|questions)\b/.test(s)) return 'quiz';
  if(/\b(example|real.life)\b/.test(s)) return 'example';
  if(/\b(formula|rule|equation)\b/.test(s)) return 'formula';
  return 'explain';
}

document.getElementById('doubtSubmit').addEventListener('click', ()=>sendTutorMessage());

function clearTutorChat(){
  if(tutorAbortController){ try{ tutorAbortController.abort(); }catch(e){} tutorAbortController=null; }
  tutorConversation.length = 0;
  tutorSessionId = null;
  document.getElementById('doubtAnswerWrap').innerHTML =
    '<div class="ai-empty"><strong style="color:var(--ink);">Your explanation will appear here.</strong><br>Ask a question above, then use the follow-up actions to learn more.</div>';
  document.getElementById('doubtError').innerHTML = '';
  const input = document.getElementById('doubtInput');
  if(input) input.value = '';
  document.getElementById('doubtStatus').style.display = 'none';
}
document.getElementById('doubtClearBtn').addEventListener('click', clearTutorChat);

function structureTutorAnswer(rawAnswer){
  const clean = String(rawAnswer || '').replace(/\r/g,'').trim();
  const blocks = clean.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  let direct = blocks[0] || '';
  let steps = [];
  let example = '';
  let simple = '';
  const removeMd = x => x.replace(/\*\*(.+?)\*\*/g,'$1').replace(/^[-•]\s*/,'').trim();
  const numbered = [];
  blocks.forEach(b=>{
    b.split('\n').map(x=>x.trim()).filter(Boolean).forEach(line=>{
      if(/^\d+[.)]\s+/.test(line)) numbered.push(line.replace(/^\d+[.)]\s+/,''));
    });
  });
  if(numbered.length) steps = numbered.slice(0,6);
  else if(blocks.length>1) steps = blocks.slice(1,6).map(removeMd).filter(x=>x.length>12);

  const ex = clean.match(/(?:example|for example|e\.g\.)\s*[:\-]?\s*([\s\S]*?)(?:\n\s*\n|$)/i);
  if(ex) example = ex[1].trim();
  const sm = clean.match(/(?:in simple words|simply|to put it simply)\s*[:\-]?\s*([\s\S]*?)(?:\n\s*\n|$)/i);
  if(sm) simple = sm[1].trim();

  direct = removeMd(direct);
  return {direct, steps:steps.map(removeMd), example:removeMd(example), simple:removeMd(simple)};
}

function localGroundedAnswer(context, question){
  if(!context.length){
    return { direct:'I could not find this question in the current StudyBridge source library.', steps:['Try a more specific syllabus-related question.','Choose the closest subject and topic.','I will not guess when a trusted source is unavailable.'], example:'', simple:'I do not have a trusted source for this question yet.' };
  }
  const text = context[0].text;
  const sentences = (text.match(/[^.!?]+[.!?]+/g)||[]).map(x=>x.trim()).filter(Boolean);
  return { direct:sentences.slice(0,2).join(' ') || text, steps:sentences.slice(0,5), example:'', simple:sentences[0]||text };
}

function renderDoubtAnswer(rawAnswer, context, widened){
  const parsed = structureTutorAnswer(rawAnswer);
  const grounded = context.length > 0;
  const sourceCount = context.length;
  const sourceLabel = sourceCount === 1 ? '1 source' : sourceCount+' sources';
  const safe = x => escapeHtml(x || '');

  const steps = parsed.steps.length ? parsed.steps.map((step,i)=>
    '<div class="tutor-step"><span class="tutor-step-num">'+(i+1)+'</span><div>'+safe(step)+'</div></div>'
  ).join('') : '<div class="tutor-step"><span class="tutor-step-num">1</span><div>'+safe(parsed.direct)+'</div></div>';

  const sources = context.map(c=>
    '<button type="button" class="tutor-source-item" data-src="'+c.id+'"><span class="tutor-source-id">'+c.id+'</span><span><b>'+escapeHtml(c.source)+'</b><small>'+escapeHtml(c.text.slice(0,150))+(c.text.length>150?'…':'')+'</small></span><span class="tutor-source-arrow">→</span></button>'+
    '<div class="source-card tutor-source-detail" id="src-'+c.id+'"><div class="src-title">'+c.id+' · '+escapeHtml(c.source)+'</div>'+escapeHtml(c.text)+'</div>'
  ).join('');

  const widenNote = widened === 'subject' ? '<div class="info-box">I broadened the search beyond your selected topic to find a relevant learning source.</div>'
    : widened === 'topic' ? '<div class="info-box">I broadened the search within this subject because the selected topic was not a close match.</div>'
    : widened === 'none' ? '<div class="info-box">No trusted source in the current library covers this question yet, so this is not presented as textbook-grounded.</div>' : '';

  document.getElementById('doubtAnswerWrap').innerHTML = widenNote+
    '<div class="ai-answer-card fade-in">'+
      '<div class="ai-answer-head"><div class="ai-answer-brand"><span class="ai-avatar">✦</span><div><div class="ai-answer-name">StudyBridge Tutor</div><div class="ai-answer-status">Structured learning answer · '+safe(document.getElementById('doubtLang').value)+'</div></div></div><span class="ai-grounded-badge">'+(grounded?'✓ '+sourceLabel+' grounded':'◌ General help')+'</span></div>'+
      '<div class="ai-answer-body tutor-answer-body">'+
        '<div class="tutor-direct"><span class="tutor-kicker">DIRECT ANSWER</span><p>'+safe(parsed.direct)+'</p></div>'+
        '<div class="tutor-section"><div class="tutor-section-title">Step by step</div>'+steps+'</div>'+
        (parsed.example?'<div class="tutor-callout example"><div class="tutor-callout-title">💡 Example</div><p>'+safe(parsed.example)+'</p></div>':'')+
        (parsed.simple?'<div class="tutor-callout simple"><div class="tutor-callout-title">🧒 In simple words</div><p>'+safe(parsed.simple)+'</p></div>':'')+
        (context.length?'<div class="tutor-sources"><div class="ai-source-head"><span>📚 Source evidence</span><span>'+sourceLabel+'</span></div><div class="tutor-source-list">'+sources+'</div></div>':'')+
      '</div>'+
      '<div class="ai-answer-footer"><div class="ai-followups"><button class="ai-followup" data-ai-follow="Explain this more simply">Explain simpler</button><button class="ai-followup" data-ai-follow="Give me a real-life example">Give an example</button><button class="ai-followup" data-ai-follow="Test my understanding with 5 questions">Quiz me</button><button class="ai-followup" data-ai-follow="Show the key formula or rule">Key rule</button></div><div class="ai-feedback"><span>Helpful?</span><button type="button" aria-label="Helpful">👍</button><button type="button" aria-label="Not helpful">👎</button></div></div>'+
    '</div>';

  document.querySelectorAll('.tutor-source-item').forEach(item=>item.addEventListener('click',()=>{
    const card = document.getElementById('src-'+item.dataset.src);
    if(card) card.classList.toggle('open');
  }));
  document.querySelectorAll('[data-ai-follow]').forEach(btn=>btn.addEventListener('click',()=>{
    const input = document.getElementById('doubtInput');
    const base = input.value.trim();
    input.value = base ? base+'\n\n'+btn.dataset.aiFollow+'.' : btn.dataset.aiFollow+'.';
    input.focus();
  }));
}

/* Quick AI prompt chips */
document.querySelectorAll('[data-ai-prompt]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const prompt = btn.dataset.aiPrompt;
    const input = document.getElementById('doubtInput');
    const current = input.value.trim();
    input.value = current ? current+'\n\n'+prompt+'.' : prompt+'.';
    input.focus();
  });
});

/* Enter submits; Shift+Enter creates a new line. */
document.getElementById('doubtInput').addEventListener('keydown', e=>{
  if(e.key==='Enter' && !e.shiftKey){
    e.preventDefault();
    document.getElementById('doubtSubmit').click();
  }
});

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
    const raw = await callGrok(system, user, 1400);
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
  let html = '<div class="card fade-in">';
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
    if(document.getElementById('panel-progress').classList.contains('active')) renderProgress();
    if(document.getElementById('panel-home').classList.contains('active')) renderHome();
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

function teacherTopicStats(students){
  const stats = {};
  students.forEach(s=>{
    Object.entries(s.subjectAccuracy||{}).forEach(([key,val])=>{
      const [subject,topic] = key.split(':');
      const id = subject+':'+topic;
      if(!stats[id]) stats[id] = {subject,topic,correct:0,total:0};
      stats[id].correct += val.correct || 0;
      stats[id].total += val.total || 0;
    });
  });
  return Object.values(stats).map(x=>({...x,accuracy:x.total?x.correct/x.total:0})).filter(x=>x.total>0);
}

function teacherStudentTrend(s){
  const qs = (s.quizzes||[]).slice().sort((a,b)=>a.ts-b.ts);
  if(qs.length<2) return null;
  const recent = qs.slice(-3).reduce((a,q)=>a+(q.total?q.score/q.total:0),0)/Math.min(3,qs.length);
  const priorQs = qs.slice(0,Math.max(1,qs.length-3)).slice(-3);
  const prior = priorQs.reduce((a,q)=>a+(q.total?q.score/q.total:0),0)/priorQs.length;
  return Math.round((recent-prior)*100);
}

function teacherReasons(s, acc, inactiveDays, weak){
  const reasons=[];
  if(acc!==null && acc<0.5) reasons.push('Overall accuracy is below 50%');
  if(inactiveDays>=3) reasons.push('No learning activity for '+inactiveDays+' days');
  if(weak.length) reasons.push('Weak in '+weak.slice(0,2).join(' and '));
  const trend=teacherStudentTrend(s);
  if(trend!==null && trend<=-10) reasons.push('Recent quiz performance dropped '+Math.abs(trend)+' points');
  return reasons;
}

function teacherIntervention(s, weak, acc){
  if(weak.length) return 'Assign a short '+weak[0].split(' · ')[1]+' practice set, then re-check accuracy.';
  if(acc!==null && acc<0.5) return 'Start with an easier 5-question practice and review the missed concepts.';
  return 'Keep the student on the current learning path and monitor the next quiz.';
}

async function refreshTeacher(){
  const wrap = document.getElementById('teacherWrap');
  wrap.innerHTML = '<div class="spinner-row" style="justify-content:center;"><span class="spinner"></span> Building teacher insights…</div>';
  const students = await listStudents();
  if(students.length === 0){
    wrap.innerHTML = '<div class="teacher-empty">No student activity yet. Use Demo Mode or complete a quiz to populate the class insight view.</div>';
    return;
  }

  const accuracyValues = students.map(overallAccuracy).filter(v=>v!==null);
  const classAccuracy = accuracyValues.length ? Math.round(accuracyValues.reduce((a,b)=>a+b,0)/accuracyValues.length*100) : 0;
  const attention = students.filter(s=>{
    const acc=overallAccuracy(s), inactive=daysSince(s.lastActive), weak=weakList(s);
    return (acc!==null && acc<0.5) || inactive>=3 || weak.length>0;
  });
  const inactive = students.filter(s=>daysSince(s.lastActive)>=3).length;
  const topicStats = teacherTopicStats(students).sort((a,b)=>a.accuracy-b.accuracy);
  const hardest = topicStats.slice(0,4);
  const improving = topicStats.filter(x=>x.total>=3).sort((a,b)=>b.accuracy-a.accuracy).slice(0,3);

  let html='';
  html += '<div class="teacher-overview">'+
    '<div class="teacher-kpi"><div class="kpi-label">Class accuracy</div><div class="kpi-value">'+classAccuracy+'%</div><div class="kpi-sub">Across students with quiz activity</div></div>'+
    '<div class="teacher-kpi"><div class="kpi-label">Students</div><div class="kpi-value">'+students.length+'</div><div class="kpi-sub">Active shared-session profiles</div></div>'+
    '<div class="teacher-kpi"><div class="kpi-label">Need attention</div><div class="kpi-value">'+attention.length+'</div><div class="kpi-sub">Weak, inactive, or struggling</div></div>'+
    '<div class="teacher-kpi"><div class="kpi-label">Inactive</div><div class="kpi-value">'+inactive+'</div><div class="kpi-sub">No activity for 3+ days</div></div>'+
  '</div>';

  html += '<div class="teacher-grid"><div>';
  html += '<div class="teacher-panel-card"><h3>⚠ Students needing attention</h3><p>Signals are generated from accuracy, weak topics, recent trend, and activity.</p>';
  if(!attention.length){ html += '<div class="teacher-empty">No students currently need intervention. 🎉</div>'; }
  attention.sort((a,b)=>(overallAccuracy(a)??1)-(overallAccuracy(b)??1)).slice(0,8).forEach(s=>{
    const acc=overallAccuracy(s), inactiveDays=daysSince(s.lastActive), weak=weakList(s), reasons=teacherReasons(s,acc,inactiveDays,weak), trend=teacherStudentTrend(s);
    html += '<div class="teacher-alert">'+
      '<div class="teacher-alert-head"><div class="teacher-alert-name">'+escapeHtml(s.name)+'</div><span class="flag attn">Needs attention</span></div>'+
      '<div class="stat-row" style="margin-top:10px;"><span>Accuracy: <b>'+(acc===null?'—':Math.round(acc*100)+'%')+'</b></span><span>Quizzes: <b>'+(s.quizzes?s.quizzes.length:0)+'</b></span><span>Last active: <b>'+(inactiveDays===0?'today':inactiveDays+'d ago')+'</b></span>'+(trend===null?'':'<span>Trend: <b class="'+(trend<0?'score-down':'score-up')+'">'+(trend>0?'+':'')+trend+' pts</b></span>')+'</div>'+
      '<div class="teacher-alert-reason"><b>Why flagged:</b> '+escapeHtml(reasons.slice(0,3).join(' • ')||'Needs a closer review')+'</div>'+
      '<div class="teacher-alert-reason"><b>Suggested intervention:</b> '+escapeHtml(teacherIntervention(s,weak,acc))+'</div>'+
      '<div class="teacher-action-actions teacher-alert-actions"><button class="teacher-action primary" data-teacher-student="'+escapeHtml(s.id)+'">Assign practice</button><button class="teacher-action" data-teacher-view="'+escapeHtml(s.id)+'">View pattern</button></div>'+
    '</div>';
  });
  html+='</div>';

  html += '<div class="teacher-panel-card"><h3>📊 Hardest topics</h3><p>Where the class is struggling most.</p>';
  if(!hardest.length) html += '<div class="teacher-empty">Not enough quiz data yet.</div>';
  hardest.forEach(t=>{
    const pct=Math.round(t.accuracy*100);
    html += '<div class="class-topic"><div class="class-topic-label">'+escapeHtml(t.topic)+'</div><div class="class-topic-track"><div class="class-topic-fill" style="width:'+pct+'%"></div></div><div class="class-topic-pct">'+pct+'%</div></div>';
  });
  html+='</div></div><div>';

  html += '<div class="teacher-panel-card"><h3>💡 Teacher recommendation</h3><p>One high-value action based on the strongest class signal.</p>';
  if(hardest.length){
    const t=hardest[0];
    html += '<div class="teacher-recommendation"><strong>Run a short revision on '+escapeHtml(t.topic)+'</strong><span>Class accuracy is '+Math.round(t.accuracy*100)+'%. Follow it with a 5-question practice set to check improvement.</span></div>';
  } else {
    html += '<div class="teacher-recommendation"><strong>Collect more quiz activity</strong><span>Once students complete more practice, StudyBridge can surface class-level patterns here.</span></div>';
  }
  html+='</div>';

  html += '<div class="teacher-panel-card"><h3>📈 Strong areas</h3><p>Topics with the best measured accuracy.</p>';
  if(!improving.length) html += '<div class="teacher-empty">Not enough topic data yet.</div>';
  improving.forEach(t=>{
    html += '<div class="insight-row"><div class="insight-main"><div class="insight-title">'+escapeHtml(t.topic)+'</div><div class="insight-meta">'+escapeHtml(t.subject)+' · '+t.total+' questions</div></div><div class="insight-score score-up">'+Math.round(t.accuracy*100)+'%</div></div>';
  });
  html+='</div></div></div>';
  wrap.innerHTML=html;

  wrap.querySelectorAll('[data-teacher-student]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.teacherStudent;
    const s=students.find(x=>x.id===id);
    if(!s) return;
    const weak=weakList(s), acc=overallAccuracy(s);
    alert('Practice recommendation for '+s.name+':\n\n'+teacherIntervention(s,weak,acc));
  }));
  wrap.querySelectorAll('[data-teacher-view]').forEach(btn=>btn.addEventListener('click',()=>{
    const s=students.find(x=>x.id===btn.dataset.teacherView);
    if(!s) return;
    const weak=weakList(s);
    alert(s.name+' learning pattern\n\nAccuracy: '+(overallAccuracy(s)===null?'—':Math.round(overallAccuracy(s)*100)+'%')+'\nWeak areas: '+(weak.length?weak.join(', '):'None detected')+'\nQuizzes: '+(s.quizzes?s.quizzes.length:0));
  }));
}
document.getElementById('teacherRefresh').addEventListener('click', refreshTeacher);

/* ============================================================
   9. SCHOLARSHIP / ELIGIBILITY MATCHER
   (rule-based, deterministic — no AI call, so eligibility logic
   is fully transparent and never hallucinated)
   ============================================================ */
const SCHOLARSHIP_DB = [
  { id:"SC1", name:"National Means-cum-Merit Scholarship (NMMSS)", provider:"Ministry of Education, Govt. of India",
    minClass:9, maxClass:12, categories:["any"], gender:"any", maxIncome:350000, stream:"any", requiresDisability:false,
    amount:"₹12,000 / year (illustrative)", link:"https://scholarships.gov.in" },
  { id:"SC2", name:"Post-Matric Scholarship for SC Students", provider:"Ministry of Social Justice and Empowerment",
    minClass:11, maxClass:13, categories:["SC"], gender:"any", maxIncome:250000, stream:"any", requiresDisability:false,
    amount:"Tuition + maintenance allowance (varies by course)", link:"https://scholarships.gov.in" },
  { id:"SC3", name:"Post-Matric Scholarship for OBC Students", provider:"Ministry of Social Justice and Empowerment",
    minClass:11, maxClass:13, categories:["OBC"], gender:"any", maxIncome:150000, stream:"any", requiresDisability:false,
    amount:"Tuition + maintenance allowance (varies by course)", link:"https://scholarships.gov.in" },
  { id:"SC4", name:"National Fellowship for Higher Education of ST Students", provider:"Ministry of Tribal Affairs",
    minClass:13, maxClass:13, categories:["ST"], gender:"any", maxIncome:600000, stream:"any", requiresDisability:false,
    amount:"Monthly fellowship for M.Phil / Ph.D scholars", link:"https://scholarships.gov.in" },
  { id:"SC5", name:"Pre-Matric Scholarship for Minorities", provider:"Ministry of Minority Affairs",
    minClass:6, maxClass:10, categories:["Minority"], gender:"any", maxIncome:100000, stream:"any", requiresDisability:false,
    amount:"₹1,000–6,000 / year (illustrative)", link:"https://scholarships.gov.in" },
  { id:"SC6", name:"PM YASASVI Scholarship (Classes 9 & 11)", provider:"Ministry of Social Justice and Empowerment",
    minClass:9, maxClass:11, categories:["OBC","EWS","ST"], gender:"any", maxIncome:250000, stream:"any", requiresDisability:false,
    amount:"₹75,000–1,25,000 / year (illustrative)", link:"https://scholarships.gov.in" },
  { id:"SC7", name:"AICTE Pragati Scholarship for Girls", provider:"All India Council for Technical Education",
    minClass:13, maxClass:13, categories:["any"], gender:"Female", maxIncome:800000, stream:"technical", requiresDisability:false,
    amount:"₹50,000 / year (illustrative)", link:"https://scholarships.gov.in" },
  { id:"SC8", name:"AICTE Saksham Scholarship for Specially-Abled Students", provider:"All India Council for Technical Education",
    minClass:13, maxClass:13, categories:["any"], gender:"any", maxIncome:800000, stream:"technical", requiresDisability:true,
    amount:"₹50,000 / year (illustrative)", link:"https://scholarships.gov.in" },
  { id:"SC9", name:"Central Sector Scheme of Scholarship for College and University Students", provider:"Ministry of Education, Govt. of India",
    minClass:13, maxClass:13, categories:["any"], gender:"any", maxIncome:450000, stream:"any", requiresDisability:false,
    amount:"₹10,000–20,000 / year (illustrative, merit-based)", link:"https://scholarships.gov.in" },
  { id:"SC10", name:"State Pre-Matric Scholarship (General)", provider:"State Government (varies by state)",
    minClass:6, maxClass:10, categories:["any"], gender:"any", maxIncome:200000, stream:"any", requiresDisability:false,
    amount:"Varies by state — check your state education portal", link:"https://scholarships.gov.in" }
];

function matchScholarships(profile){
  return SCHOLARSHIP_DB.map(s=>{
    const reasons = [], blockers = [];
    if(profile.cls >= s.minClass && profile.cls <= s.maxClass) reasons.push('Class/year fits the range ('+s.minClass+(s.maxClass!==s.minClass?'–'+(s.maxClass===13?'UG':s.maxClass):'')+')');
    else blockers.push('Needs class/year '+s.minClass+(s.maxClass!==s.minClass?'–'+(s.maxClass===13?'UG':s.maxClass):'')+', you selected '+(profile.cls===13?'Undergraduate':'Class '+profile.cls));

    if(s.categories.includes('any') || s.categories.includes(profile.category)) reasons.push('Category ('+profile.category+') is eligible');
    else blockers.push('Open to: '+s.categories.join(', ')+' only');

    if(s.gender==='any' || s.gender===profile.gender) reasons.push(s.gender==='any' ? 'Open to all genders' : 'Open to '+s.gender+' applicants');
    else blockers.push('Open to '+s.gender+' applicants only');

    if(profile.income==null || isNaN(profile.income)) blockers.push('Enter your family income to check this criterion');
    else if(profile.income <= s.maxIncome) reasons.push('Family income within ₹'+s.maxIncome.toLocaleString('en-IN')+' cap');
    else blockers.push('Income cap is ₹'+s.maxIncome.toLocaleString('en-IN')+'/year');

    if(s.requiresDisability && !profile.disability) blockers.push('Requires a disability certificate');
    else if(s.requiresDisability) reasons.push('Disability criterion met');

    if(s.stream==='any' || s.stream===profile.stream) reasons.push(s.stream==='any' ? 'Open to any stream' : 'Matches your stream');
    else blockers.push('Limited to '+s.stream+' students');

    return { ...s, eligible: blockers.length===0, closeMiss: blockers.length===1 && !blockers[0].startsWith('Enter your'), reasons, blockers };
  });
}

async function getEligibilityProfile(id){
  try{
    const r = await Storage.get('eligibility:'+id, false);
    return r ? JSON.parse(r.value) : null;
  }catch(e){ return null; }
}
async function saveEligibilityProfile(id, profile){
  try{ await Storage.set('eligibility:'+id, JSON.stringify(profile), false); }
  catch(e){ console.error('eligibility save failed', e); }
}

function renderSchemeCard(s, cls){
  const reasonHtml = s.reasons.slice(0,3).map(r=>'<div class="sch-reason">✓ '+escapeHtml(r)+'</div>').join('');
  const blockerHtml = s.blockers.slice(0,2).map(b=>'<div class="sch-blocker">! '+escapeHtml(b)+'</div>').join('');
  const maxSignals = Math.max(1, s.reasons.length + s.blockers.length);
  const matchPct = s.eligible ? 94 : Math.max(62, Math.round((s.reasons.length / maxSignals) * 100));
  const badge = s.eligible ? '<span class="match-score">✓ Strong match</span>' : '<span class="match-score near-score">! Almost eligible</span>';
  const why = s.eligible ? 'You meet all sample criteria in this demo profile. Verify current rules before applying.' : (s.blockers[0] || 'One criterion needs to be checked before applying.');
  return '<article class="sch-card '+cls+'">'+
    '<div class="sch-card-inner">'+
      '<div class="sch-card-top">'+
        '<div class="sch-card-title"><div class="sch-icon">🎓</div><div><div class="sch-name">'+escapeHtml(s.name)+'</div><div class="sch-provider">'+escapeHtml(s.provider)+'</div></div></div>'+
        '<span class="sch-amount">'+escapeHtml(s.amount)+'</span>'+
      '</div>'+
      '<div class="sch-match-row"><div style="flex:1"><div style="font-size:11px;color:var(--ink-soft);font-weight:700;text-transform:uppercase;letter-spacing:.08em">Match strength</div><div class="match-bar"><span style="width:'+matchPct+'%"></span></div></div><div>'+badge+'</div></div>'+
      (s.reasons.length || s.blockers.length ? '<div class="sch-reasons">'+reasonHtml+blockerHtml+'</div>' : '')+
      '<div class="sch-why"><strong>Why this is shown:</strong> '+escapeHtml(why)+'</div>'+
      '<div class="sch-next">'+
        '<a class="sch-link-btn" href="'+s.link+'" target="_blank" rel="noopener">Check official details →</a>'+
        '<button type="button" class="sch-link-secondary" data-sch-id="'+escapeHtml(s.id)+'">View criteria</button>'+
      '</div>'+
    '</div>'+
  '</article>';
}

document.getElementById('scFind').addEventListener('click', async ()=>{
  const errBox = document.getElementById('scError');
  errBox.innerHTML = '';
  let studentProfile;
  try{ studentProfile = await ensureProfile(); }
  catch(e){ errBox.innerHTML = '<div class="error-box">'+escapeHtml(e.message)+'</div>'; return; }

  const incomeRaw = document.getElementById('scIncome').value.trim().replace(/[,₹\s]/g,'');
  const income = incomeRaw === '' ? null : Number(incomeRaw);
  if(incomeRaw !== '' && (isNaN(income) || income < 0)){
    errBox.innerHTML = '<div class="error-box">Enter a valid income amount, numbers only.</div>';
    return;
  }

  const eligProfile = {
    cls: parseInt(document.getElementById('scClass').value, 10),
    category: document.getElementById('scCategory').value,
    gender: document.getElementById('scGender').value,
    income: income,
    stream: document.getElementById('scStream').value,
    disability: document.getElementById('scDisability').checked
  };
  await saveEligibilityProfile(studentProfile.id, eligProfile);
  await rememberLastName(studentProfile.name);
  await saveStudent(studentProfile);

  const results = matchScholarships(eligProfile);
  const eligible = results.filter(r=>r.eligible);
  const near = results.filter(r=>!r.eligible && r.closeMiss);
  const rest = results.filter(r=>!r.eligible && !r.closeMiss);

  const strongCount = eligible.length;
  const closeCount = near.length;
  const otherCount = rest.length;
  const total = results.length;
  let html = '<div class="sch-hero"><div class="sch-hero-grid">'+
      '<div><div class="eyebrow">Personalized opportunity finder</div><h3>Your scholarship matches</h3><p>StudyBridge compares your profile against the sample schemes using transparent rules. No AI guessing on eligibility.</p>'+
      '<div class="sch-stats"><div class="sch-stat"><div class="num">'+strongCount+'</div><div class="lbl">Strong matches</div></div><div class="sch-stat"><div class="num">'+closeCount+'</div><div class="lbl">Almost eligible</div></div><div class="sch-stat"><div class="num">'+total+'</div><div class="lbl">Schemes checked</div></div></div></div>'+
      '<div class="sch-profile-card"><div><div class="mini">Your profile</div><div class="big">'+(eligProfile.cls===13?'Undergraduate':'Class '+eligProfile.cls)+'</div><p>'+escapeHtml(eligProfile.category)+' · '+escapeHtml(eligProfile.gender)+' · '+escapeHtml(eligProfile.stream==='any'?'Any stream':eligProfile.stream)+'</p></div><div style="font-size:11px;color:rgba(255,255,255,.58)">Last checked just now · verify official criteria</div></div>'+
    '</div></div>';

  if(eligible.length){
    html += '<div class="sch-section-label">Strong matches · '+eligible.length+'</div>';
    html += eligible.map(s=>renderSchemeCard(s,'match')).join('');
  }
  if(near.length){
    html += '<div class="sch-section-label">Almost eligible · one thing to check</div>';
    html += near.map(s=>renderSchemeCard(s,'near')).join('');
  }
  if(eligible.length===0 && near.length===0){
    html += '<div class="sch-empty"><div class="icon">🔎</div><strong>No close matches yet</strong><p style="color:var(--ink-soft);font-size:13px">Try adjusting your profile details or review all available sample schemes below.</p></div>';
  }
  if(rest.length){
    html += '<div class="sch-section-label">Other sample schemes</div><button class="sch-link-secondary" id="scShowAll" style="margin-bottom:12px;">Show all '+rest.length+' other schemes</button>';
    html += '<div id="scRestWrap" style="display:none;gap:12px;">'+rest.map(s=>renderSchemeCard(s,'no')).join('')+'</div>';
  }
  document.getElementById('scResults').innerHTML = '<div class="fade-in">'+html+'</div>';

  document.querySelectorAll('[data-sch-id]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=results.find(x=>x.id===btn.dataset.schId);
    if(!item) return;
    const criteria=[...item.reasons,...item.blockers];
    alert(item.name+'\n\n'+criteria.join('\n'));
  }));

  const showAllBtn = document.getElementById('scShowAll');
  if(showAllBtn){
    showAllBtn.addEventListener('click', ()=>{
      const rw = document.getElementById('scRestWrap');
      rw.style.display = rw.style.display === 'none' ? 'block' : 'none';
    });
  }
});

async function prefillEligibility(){
  const name = document.getElementById('studentName').value.trim();
  if(!name) return;
  const profile = await getEligibilityProfile(slugify(name));
  if(!profile) return;
  document.getElementById('scClass').value = profile.cls;
  document.getElementById('scCategory').value = profile.category;
  document.getElementById('scGender').value = profile.gender;
  document.getElementById('scIncome').value = profile.income ?? '';
  document.getElementById('scStream').value = profile.stream;
  document.getElementById('scDisability').checked = !!profile.disability;
}


/* ============================================================
   10. STUDENT PROGRESS / ADAPTIVE LEARNING
   ============================================================ */
function renderProgressEmpty(msg){
  const ids=['progressSubjects','progressWeakList','progressPath'];
  ids.forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<div class="progress-empty">'+escapeHtml(msg)+'</div>';});
}
async function renderProgress(){
  const name=document.getElementById('studentName').value.trim();
  const profile=name ? await getStudent(slugify(name)) : null;
  if(!profile){
    document.getElementById('progAccuracy').textContent='—';
    document.getElementById('progQuestions').textContent='0';
    document.getElementById('progStreak').textContent='—';
    document.getElementById('progWeak').textContent='0';
    document.getElementById('progressHeadline').textContent='Your learning, in motion.';
    document.getElementById('progressSubhead').textContent='Take your first quiz or ask the AI Tutor to start building a personalized learning map.';
    renderProgressEmpty('Start learning to unlock your adaptive progress map.');
    return;
  }
  const acc=overallAccuracy(profile);
  const qCount=Object.values(profile.subjectAccuracy||{}).reduce((a,b)=>a+b.total,0);
  const streak=calcStreak(profile);
  const weak=weakList(profile);
  document.getElementById('progAccuracy').textContent=formatPercent(acc);
  document.getElementById('progQuestions').textContent=qCount;
  document.getElementById('progStreak').textContent=streak?streak+'d':'—';
  document.getElementById('progWeak').textContent=weak.length;
  document.getElementById('progressHeadline').textContent=profile.name+', here is your learning map.';
  document.getElementById('progressSubhead').textContent=weak.length?'You have a clear next focus. StudyBridge is prioritizing the topics where practice can make the biggest difference.':'Your recent practice is building a strong baseline. Keep going and StudyBridge will adapt as your performance changes.';

  const subjects=subjectProgress(profile);
  const subjectRows=Object.entries(subjects).sort((a,b)=>(b[1].correct/Math.max(1,b[1].total))-(a[1].correct/Math.max(1,a[1].total)));
  document.getElementById('progressSubjects').innerHTML=subjectRows.length ? subjectRows.map(([subject,stat])=>{
    const pct=Math.round(stat.correct/Math.max(1,stat.total)*100);
    const level=pct>=80?'Strong':pct>=50?'Building':'Needs practice';
    return '<div class="progress-topic"><div class="progress-topic-row"><span>'+escapeHtml(subject)+'</span><span>'+pct+'%</span></div><div class="progress-topic-meta">'+stat.correct+' correct out of '+stat.total+' · '+level+'</div><div class="progress-topic-track"><div class="progress-topic-fill" style="width:'+pct+'%"></div></div></div>';
  }).join(''):'<div class="progress-empty">No subject data yet.</div>';

  document.getElementById('progressWeakList').innerHTML=weak.length ? weak.slice(0,5).map((w,i)=>{
    const parts=w.split(' · '); const subject=parts[0],topic=parts[1]||w;
    return '<div class="weak-item"><b>'+escapeHtml(topic)+'</b><span>'+escapeHtml(subject)+' · below 50% accuracy based on tracked questions.</span><button class="weak-cta" data-subject="'+escapeHtml(subject)+'" data-topic="'+escapeHtml(topic)+'">Practice this next →</button></div>';
  }).join('') : '<div class="progress-empty">No high-priority weak areas yet. Nice work — keep practicing.</div>';
  document.querySelectorAll('#progressWeakList .weak-cta').forEach(btn=>btn.addEventListener('click',()=>{
    pracSubjectSel.value=btn.dataset.subject; fillTopicSelect(pracTopicSel,btn.dataset.subject,false); pracTopicSel.value=btn.dataset.topic; updateDiffBadge(); switchTab('practice');
  }));

  const path=[];
  if(weak[0]) path.push({title:'Target '+weak[0].split(' · ')[1],detail:'Generate a focused quiz on your highest-priority weak topic.'});
  else if(subjectRows[0]) path.push({title:'Keep '+subjectRows[0][0]+' moving',detail:'Take another adaptive quiz to confirm your current level.'});
  path.push({title:'Ask the AI Tutor',detail:'Bring one confusing concept to StudyBridge and ask for a simpler explanation.'});
  if(profile.quizzes && profile.quizzes.length) path.push({title:'Review your latest quiz',detail:'Use the explanations from your most recent practice to close any missed-question gaps.'});
  else path.push({title:'Take your first quiz',detail:'Your score will unlock more precise adaptive recommendations.'});
  document.getElementById('progressPath').innerHTML=path.slice(0,3).map((x,i)=>'<div class="path-item"><div class="path-step">'+(i+1)+'</div><div><b>'+escapeHtml(x.title)+'</b><span>'+escapeHtml(x.detail)+'</span></div></div>').join('');
}

/* ============================================================
   10. STUDENT DASHBOARD
   ============================================================ */
function formatPercent(value){ return value==null ? '—' : Math.round(value*100)+'%'; }
function calcStreak(profile){
  const days=new Set();
  (profile.quizzes||[]).forEach(q=>days.add(new Date(q.ts).toISOString().slice(0,10)));
  (profile.doubts||[]).forEach(d=>days.add(new Date(d.ts).toISOString().slice(0,10)));
  if(!days.size) return 0;
  let streak=0; const d=new Date(); d.setHours(0,0,0,0);
  while(days.has(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1);}
  return streak;
}
function subjectProgress(profile){
  return Object.entries(profile.subjectAccuracy||{}).reduce((acc,[key,stat])=>{
    const subject=key.split(':')[0]; acc[subject]=acc[subject]||{correct:0,total:0};
    acc[subject].correct+=stat.correct; acc[subject].total+=stat.total; return acc;
  },{});
}
async function renderHome(){
  const name=document.getElementById('studentName').value.trim();
  document.getElementById('homeGreeting').textContent=name ? 'Welcome back, '+name+' 👋' : 'Good day 👋';
  const profile=name ? await getStudent(slugify(name)) : null;
  const accuracy=profile ? overallAccuracy(profile) : null;
  const totalQ=profile ? Object.values(profile.subjectAccuracy||{}).reduce((a,b)=>a+b.total,0) : 0;
  document.getElementById('homeAccuracy').textContent=formatPercent(accuracy);
  document.getElementById('homeAccuracyNote').textContent=accuracy==null?'Take a quiz to start tracking.':'Based on your completed practice.';
  document.getElementById('homeQuestions').textContent=totalQ;
  document.getElementById('homeQuestionsNote').textContent=totalQ?'Across your tracked learning topics.':'Your completed quiz questions.';
  document.getElementById('homeStreak').textContent=profile&&calcStreak(profile)?calcStreak(profile)+'d':'—';

  const progressWrap=document.getElementById('homeProgressList');
  const subjects=profile?subjectProgress(profile):{};
  const rows=Object.entries(subjects).sort((a,b)=>(b[1].correct/Math.max(1,b[1].total))-(a[1].correct/Math.max(1,a[1].total))).slice(0,4);
  progressWrap.innerHTML=rows.length ? rows.map(([subject,stat])=>{const pct=Math.round(stat.correct/Math.max(1,stat.total)*100);return '<div class="progress-row"><div class="progress-head"><span>'+escapeHtml(subject)+'</span><span>'+pct+'%</span></div><div class="progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div></div>';}).join('') : '<div class="home-empty">Start with the AI Tutor or take a practice quiz. Your subject progress will appear here automatically.</div>';

  const weak=profile?weakList(profile):[]; const rec=weak[0]?weak[0].split(' · '):null;
  const focus=(profile?.focus||[]).filter(Boolean).slice(0,3);
  document.getElementById('homeProfileChips').innerHTML=[
    profile?.grade?'<span class="personalized-chip">Class '+escapeHtml(String(profile.grade))+'</span>':'',
    profile?.language?'<span class="personalized-chip">🌐 '+escapeHtml(profile.language)+'</span>':'',
    ...focus.map(f=>'<span class="personalized-chip">'+escapeHtml(f)+'</span>')
  ].filter(Boolean).join('');
  const nextTopic=rec?(rec[1]||'Focused practice'):(focus[0]||'your next concept');
  const reason=rec?'Your recent performance shows this is an area worth strengthening.':'Your onboarding preferences and current activity suggest starting here.';
  const difficultyLabel=rec&&profile?.difficulty?.[rec[0]]?profile.difficulty[rec[0]]:'Medium';
  document.getElementById('homeRecommendation').innerHTML=profile?'<div class="recommend-card"><span class="recommend-badge">Recommended for you</span><h4>'+escapeHtml(nextTopic)+'</h4><div class="recommend-meta"><span>🎯 Personalized</span><span>⏱ 7 min</span><span>'+escapeHtml(String(difficultyLabel))+' difficulty</span></div><p>'+escapeHtml(reason)+'</p><button class="recommend-cta" data-go="practice">Start focused practice →</button></div>':'<div class="recommend-card"><span class="recommend-badge">Start here</span><h4>Ask your first question</h4><p>StudyBridge can explain a concept step by step and then turn it into personalized practice.</p><button class="recommend-cta" data-go="doubt">Ask the AI Tutor →</button></div>';
  document.querySelectorAll('#homeRecommendation [data-go]').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.go)));

  let eligibleCount=0;
  if(profile){const ep=await getEligibilityProfile(profile.id);if(ep) eligibleCount=matchScholarships(ep).filter(x=>x.eligible).length;}
  document.getElementById('homeScholarship').innerHTML='<div class="sch-mini"><div class="label">Potential matches</div><div class="count">'+eligibleCount+'</div><p>'+(eligibleCount?'scholarship matches found from your saved profile.':'Complete your eligibility profile to discover matching support.')+'</p><button data-go="scholar">Explore scholarships →</button></div>';
  document.querySelector('#homeScholarship [data-go]').addEventListener('click',()=>switchTab('scholar'));

  const activity=[];
  if(profile){(profile.doubts||[]).slice(0,3).forEach(d=>activity.push({ts:d.ts,title:'Asked a doubt',detail:(d.question||'Learning question').slice(0,95)}));(profile.quizzes||[]).slice(0,3).forEach(q=>activity.push({ts:q.ts,title:'Completed a quiz',detail:q.subject+' · '+q.topic+' · '+q.score+'/'+q.total}));}
  activity.sort((a,b)=>b.ts-a.ts);
  document.getElementById('homeActivity').innerHTML=activity.length ? '<div class="activity-list">'+activity.slice(0,5).map(i=>'<div class="activity-item"><span class="activity-dot"></span><div><b>'+escapeHtml(i.title)+'</b><span>'+escapeHtml(i.detail)+'</span></div></div>').join('')+'</div>' : '<div class="home-empty">No activity yet. Your recent doubts and quizzes will show up here.</div>';
}

document.getElementById('homeAskBtn').addEventListener('click',()=>{const q=document.getElementById('homeQuestion').value.trim();if(q){document.getElementById('doubtInput').value=q;switchTab('doubt');document.getElementById('doubtInput').focus();}});
document.getElementById('homeQuestion').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('homeAskBtn').click();}});
document.getElementById('studentName').addEventListener('input',()=>{if(document.getElementById('panel-home').classList.contains('active'))renderHome(); if(document.getElementById('panel-progress').classList.contains('active'))renderProgress();});


/* ============================================================
   ONBOARDING (name only)
   ============================================================ */
async function saveOnboarding(data){
  const payload = { ...data, completed:true, completedAt:Date.now() };
  try{ await Storage.set('onboarding:'+slugify(data.name), JSON.stringify(payload), false); }catch(e){}
  try{ localStorage.setItem('studybridge:onboarding:'+slugify(data.name), JSON.stringify(payload)); }catch(e){}
  try{ await Storage.set('last-student-name', data.name, false); }catch(e){}
}

async function hasCompletedOnboarding(name){
  if(!name) return false;
  try{ const r=await Storage.get('onboarding:'+slugify(name), false); if(r && r.value) return !!JSON.parse(r.value).completed; }catch(e){}
  try{ const raw=localStorage.getItem('studybridge:onboarding:'+slugify(name)); return raw ? !!JSON.parse(raw).completed : false; }catch(e){}
  return false;
}

function showOnboarding(){
  const el=document.getElementById('onboardingBackdrop');
  el.classList.remove('hidden'); el.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  const err=document.getElementById('onNameError'); if(err) err.style.display='none';
  const nameInput=document.getElementById('onName'); if(nameInput) nameInput.value='';
  setTimeout(()=>document.getElementById('onName')?.focus(),50);
}
function hideOnboarding(){
  const el=document.getElementById('onboardingBackdrop');
  el.classList.add('hidden'); el.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

async function submitOnboarding(){
  const name=document.getElementById('onName').value.trim();
  const err=document.getElementById('onNameError');
  if(!name){ if(err) err.style.display='block'; return; }
  if(err) err.style.display='none';

  const data={ name, grade:'10', language:'English', focus:[] };
  await saveOnboarding(data);
  document.getElementById('studentName').value=name;
  try{
    const profile=await getStudent(slugify(name));
    const nextProfile=profile||blankProfile(slugify(name),name);
    nextProfile.name=name;
    nextProfile.lastActive=new Date().toISOString();
    await saveStudent(nextProfile);
  }catch(e){}
  hideOnboarding();
  await renderHome();
  await renderProgress();
}

document.getElementById('onNextBtn').addEventListener('click', submitOnboarding);
document.getElementById('onName').addEventListener('keydown', e=>{
  if(e.key==='Enter'){ e.preventDefault(); submitOnboarding(); }
});

async function maybeStartOnboarding(){
  const current=document.getElementById('studentName').value.trim();
  const completed=await hasCompletedOnboarding(current);
  if(!completed) showOnboarding();
}

/* ============================================================
   10. INIT
   ============================================================ */
async function activateDemoMode(){
  // Teacher demo data: additional students to make class insights meaningful.
  const demoStudents = [
    {id:'rahul_demo',name:'Rahul',lastActive:new Date(Date.now()-4*86400000).toISOString(),doubts:[{ts:Date.now()-5*86400000,question:'What is a quadratic equation?'}],quizzes:[{ts:Date.now()-4*86400000,subject:'Mathematics',topic:'Quadratic Equations',difficulty:'easy',score:2,total:5},{ts:Date.now()-2*86400000,subject:'Mathematics',topic:'Quadratic Equations',difficulty:'easy',score:1,total:5}],subjectAccuracy:{'Mathematics:Quadratic Equations':{correct:3,total:10}},difficulty:{Mathematics:'easy'}},
    {id:'aisha_demo',name:'Aisha',lastActive:new Date().toISOString(),doubts:[],quizzes:[{ts:Date.now()-2*86400000,subject:'Biology',topic:'Photosynthesis',difficulty:'medium',score:5,total:5},{ts:Date.now()-86400000,subject:'Biology',topic:'Photosynthesis',difficulty:'hard',score:4,total:5}],subjectAccuracy:{'Biology:Photosynthesis':{correct:9,total:10}},difficulty:{Biology:'hard'}},
    {id:'kabir_demo',name:'Kabir',lastActive:new Date(Date.now()-1*86400000).toISOString(),doubts:[],quizzes:[{ts:Date.now()-86400000,subject:'Physics',topic:'Electric Current',difficulty:'medium',score:3,total:5}],subjectAccuracy:{'Physics:Electric Current':{correct:3,total:5}},difficulty:{Physics:'medium'}}
  ];
  demoStudents.forEach(saveStudent);

  const name='Demo Student', id=slugify(name), now=Date.now(), day=86400000;
  const profile={id,name,grade:'10',language:'Hinglish (mixed)',focus:['Physics','Mathematics','Scholarships'],lastActive:new Date(now).toISOString(),
    doubts:[
      {ts:now-2*day,subject:'Physics',topic:'Electric Current',question:'Why does resistance reduce current?',language:'Hinglish (mixed)'},
      {ts:now-day,subject:'Mathematics',topic:'Quadratic Equations',question:'How do I find the roots of x² - 5x + 6?',language:'Hinglish (mixed)'}
    ],
    quizzes:[
      {ts:now-6*day,subject:'Physics',topic:'Motion',difficulty:'medium',score:4,total:5},
      {ts:now-5*day,subject:'Mathematics',topic:'Quadratic Equations',difficulty:'easy',score:2,total:5},
      {ts:now-3*day,subject:'Biology',topic:'Photosynthesis',difficulty:'medium',score:5,total:5},
      {ts:now-day,subject:'Physics',topic:'Electric Current',difficulty:'easy',score:3,total:5},
      {ts:now-2*day,subject:'Mathematics',topic:'Algebra Basics',difficulty:'medium',score:4,total:5}
    ],
    subjectAccuracy:{'Physics:Motion':{correct:4,total:5},'Physics:Electric Current':{correct:3,total:5},'Mathematics:Quadratic Equations':{correct:2,total:5},'Mathematics:Algebra Basics':{correct:4,total:5},'Biology:Photosynthesis':{correct:5,total:5}},
    difficulty:{Physics:'easy',Mathematics:'easy',Biology:'hard'}
  };
  await saveStudent(profile);
  await saveOnboarding({name,grade:'10',language:'Hinglish (mixed)',focus:profile.focus});
  await saveEligibilityProfile(id,{cls:10,category:'General',gender:'Other',income:150000,stream:'science',disability:false});
  document.getElementById('studentName').value=name;
  document.getElementById('demoBanner').classList.add('show');
  hideOnboarding();
  switchTab('home');
  await renderHome();
  await renderProgress();
}
async function resetDemoMode(){
  try{await Storage.set('last-student-name','',false);}catch(e){}
  try{localStorage.removeItem('studybridge:onboarding:'+slugify('Demo Student'));}catch(e){}
  document.getElementById('studentName').value='';
  document.getElementById('demoBanner').classList.remove('show');
  switchTab('home');
  showOnboarding();
}
document.getElementById('demoModeBtn').addEventListener('click',activateDemoMode);
document.getElementById('demoResetBtn').addEventListener('click',resetDemoMode);

(async function init(){
  try{
    const last = await recallLastName();
    if(last) document.getElementById('studentName').value = last;
    if(last === 'Demo Student') document.getElementById('demoBanner').classList.add('show');
  }catch(e){}
  updateDiffBadge();
  prefillEligibility();
  await renderHome();
  await renderProgress();
  await maybeStartOnboarding();
})();

})();