/* ═══════════════════════════════════════════════════
   PIEM Alpha · MOOC Liderazgo Militar
   app.js — Lógica de aplicación completa
   Ejército Nacional de Colombia · Politécnico Grancolombiano
   IBD Ciclo I · 2026
═══════════════════════════════════════════════════ */

/* ── LOGIN ── */
function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const err  = document.getElementById('loginError');
  if (user && pass) {
    err.classList.remove('show');
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
    initApp();
  } else {
    err.classList.add('show');
  }
}

function doLogout() {
  document.getElementById('appScreen').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
  closeUserMenu();
}

function togglePass() {
  const inp  = document.getElementById('loginPass');
  const icon = document.getElementById('eyeIcon');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.className = 'ti ti-eye-off';
  } else {
    inp.type = 'password';
    icon.className = 'ti ti-eye';
  }
}

/* Partículas login */
(function createParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 30 + 10;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*15}s;`;
    c.appendChild(p);
  }
})();

/* ── NAVIGATION ── */
let currentSection = 'dashboard';
let sidebarOpen = false;

function initApp() {
  showSection('dashboard');
  buildModulesFull();
  animateBars();
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tnav, .si').forEach(b => b.classList.remove('active'));

  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.tnav, .si').forEach(b => {
    if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${id}'`)) {
      b.classList.add('active');
    }
  });

  currentSection = id;
  closeAllPanels();

  /* Scroll to top */
  const ca = document.querySelector('.content-area');
  if (ca) ca.scrollTop = 0;
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sidebarOpen = !sidebarOpen;
  sb.classList.toggle('open', sidebarOpen);
}

function toggleNotif() {
  const p = document.getElementById('notifPanel');
  p.classList.toggle('show');
  closeUserMenu();
}

function toggleUserMenu() {
  const m = document.getElementById('userMenu');
  m.classList.toggle('show');
}

function closeUserMenu() {
  document.getElementById('userMenu').classList.remove('show');
}

function closeAllPanels() {
  document.getElementById('notifPanel').classList.remove('show');
  closeUserMenu();
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.notif-btn') && !e.target.closest('.notif-panel')) {
    document.getElementById('notifPanel').classList.remove('show');
  }
  if (!e.target.closest('.user-avatar')) {
    closeUserMenu();
  }
});

/* ── MODULES ── */
const MODULES = [
  { id:1, num:'01', title:'Carácter del Líder Militar', desc:'Fundamentos del carácter militar: valores, virtudes, ética y atributos del líder según el MFRE 6-22. El carácter como base del liderazgo auténtico.', ico:'ti-shield-check', color:'teal', acts:6, prog:100, status:'done', tag:'✓ Completado' },
  { id:2, num:'02', title:'Presencia e Intelecto del Líder', desc:'Atributos de presencia e intelecto del líder militar. Desarrollo cognitivo, toma de decisiones bajo incertidumbre y pensamiento crítico en el entorno VICA.', ico:'ti-eye', color:'blue', acts:7, prog:55, status:'active', tag:'En curso' },
  { id:3, num:'03', title:'Liderar a Otros con el Ejemplo', desc:'Competencias para liderar equipos en ambientes operacionales exigentes. Liderazgo situacional, influencia ética y cohesión de unidad.', ico:'ti-users', color:'amber', acts:8, prog:0, status:'next', tag:'Próximo' },
  { id:4, num:'04', title:'Desarrollar a Otros y al Equipo', desc:'Estrategias para el desarrollo del talento humano militar. Mentoría, coaching operacional y construcción de equipos de alto desempeño.', ico:'ti-heart-handshake', color:'purple', acts:6, prog:0, status:'locked', tag:'Bloqueado' },
  { id:5, num:'05', title:'Lograr Resultados con Ética', desc:'Orientación al logro con integridad. Planeamiento operacional, gestión de recursos y toma de decisiones con responsabilidad moral.', ico:'ti-target', color:'red', acts:7, prog:0, status:'locked', tag:'Bloqueado' },
];

function buildModulesFull() {
  const c = document.getElementById('modulesFull');
  if (!c) return;
  c.innerHTML = MODULES.map(m => `
    <div class="mod-full-card ${m.status==='done'?'done':m.status==='active'?'active-mod':m.status==='locked'?'locked':''}"
         onclick="${m.status!=='locked'?`openModule(${m.id})`:'showLockedMsg()'}">
      <div class="mfc-ico ${m.color}"><i class="ti ${m.ico}"></i></div>
      <div class="mfc-info">
        <h3>Módulo ${m.num} · ${m.title}</h3>
        <p>${m.desc}</p>
        <div class="mfc-meta">
          <span><i class="ti ti-list-check"></i> ${m.acts} actividades</span>
          <span><i class="ti ti-clock"></i> ${m.acts*3} horas estimadas</span>
          <span class="tag ${m.status==='done'?'green':m.status==='active'?'blue':'gray'}">${m.tag}</span>
        </div>
      </div>
      <div class="mfc-prog">
        <strong style="font-size:20px;font-weight:700;color:${m.prog===100?'#059669':'#2563eb'}">${m.prog}%</strong>
        <div class="prog-bar"><div class="mod-bf" style="width:${m.prog}%;background:${m.prog===100?'#10b981':'#2563eb'}"></div></div>
      </div>
    </div>
  `).join('');
}

function openModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return;
  const locked = m.status === 'locked';

  const activities = getModuleActivities(m);

  document.getElementById('moduleDetailContent').innerHTML = `
    <div class="page-header" style="margin-bottom:16px">
      <button class="link-btn" onclick="showSection('modules')" style="margin-bottom:8px">← Volver a módulos</button>
      <h2><i class="ti ${m.ico}"></i> Módulo ${m.num} · ${m.title}</h2>
      <p>${m.desc}</p>
    </div>
    <div class="hero-banner" style="margin-bottom:16px">
      <div class="hero-content">
        <div class="hero-tag"><i class="ti ti-stack-2"></i> ${m.acts} actividades · ${m.acts*3}h de esfuerzo</div>
        <h1 class="hero-title" style="font-size:20px">${m.title}</h1>
        <div class="hero-prog">
          <span class="prog-lbl">Progreso del módulo</span>
          <div class="prog-bar"><div class="prog-fill" style="width:${m.prog}%"></div></div>
          <span class="prog-pct">${m.prog}%</span>
        </div>
      </div>
    </div>
    <div class="activity-list">
      ${activities.map(a => `
        <div class="act-item ${a.locked?'locked-act':''}" onclick="${a.locked?'showLockedMsg()':a.fn}">
          <div class="act-ico ${a.color}"><i class="ti ${a.ico}"></i></div>
          <div class="act-info">
            <div class="act-title">${a.title}</div>
            <div class="act-sub">${a.sub}</div>
          </div>
          <span class="act-badge ${a.badgeColor}">${a.badge}</span>
        </div>
      `).join('')}
    </div>
  `;
  showSection('module-detail');
}

function getModuleActivities(m) {
  if (m.id === 1) return [
    { title:'Video-cápsula: El carácter como fundamento del liderazgo', sub:'18 min · Producción CREA · Politécnico Grancolombiano', ico:'ti-player-play', color:'teal', badge:'Ver', badgeColor:'blue', fn:"openVideoModal()", locked:false },
    { title:'Lectura: MFRE 6-22 — Capítulo I: Carácter del Líder', sub:'Doctrina fundamental · PDF descargable', ico:'ti-book', color:'blue', badge:'Leer', badgeColor:'blue', fn:"alert('Abriendo documento MFRE 6-22...')", locked:false },
    { title:'Actividad H5P: Dilemas éticos del líder militar', sub:'Escenarios interactivos · 3 casos', ico:'ti-puzzle', color:'amber', badge:'Completado', badgeColor:'green', fn:"alert('Actividad completada')", locked:false },
    { title:'Foro: ¿Qué hace a un líder militar en el siglo XXI?', sub:'82 respuestas · Módulo cerrado', ico:'ti-messages', color:'blue', badge:'Cerrado', badgeColor:'gray', fn:"openForum('liderazgo')", locked:false },
    { title:'Diario Reflexivo — Entrada Módulo 01', sub:'Metacognición · Evaluación formativa', ico:'ti-notebook', color:'teal', badge:'Completado', badgeColor:'green', fn:"alert('Diario completado')", locked:false },
    { title:'Quiz Módulo 01 — Carácter del Líder', sub:'Evaluación sumativa · 25% de la nota · Resultado: 88/100', ico:'ti-clipboard-check', color:'blue', badge:'88/100', badgeColor:'green', fn:"alert('Quiz completado: 88/100')", locked:false },
  ];
  if (m.id === 2) return [
    { title:'Video-cápsula: Atributos de presencia e intelecto MFRE 6-22', sub:'22 min · Disponible ahora', ico:'ti-player-play', color:'teal', badge:'Ver', badgeColor:'blue', fn:"openVideoModal()", locked:false },
    { title:'Lectura: MFRE 6-22 — Capítulo II: Presencia e Intelecto', sub:'Doctrina fundamental · PDF', ico:'ti-book', color:'blue', badge:'Leer', badgeColor:'blue', fn:"alert('Abriendo documento...')", locked:false },
    { title:'Módulo Articulate Rise: Escenarios VICA', sub:'Aprendizaje situado · 45 min estimados', ico:'ti-device-laptop', color:'purple', badge:'Iniciar', badgeColor:'blue', fn:"alert('Abriendo Articulate Rise...')", locked:false },
    { title:'Foro: Dilema ético en escenario operacional complejo', sub:'12 nuevas respuestas · Cierra en 4 días', ico:'ti-messages', color:'amber', badge:'12 nuevas', badgeColor:'amber', fn:"openForum('etico')", locked:false },
    { title:'Diario Reflexivo — Entrada Módulo 02', sub:'Metacognición · Pendiente', ico:'ti-notebook', color:'teal', badge:'Pendiente', badgeColor:'amber', fn:"openActivity('diary')", locked:false },
    { title:'Quiz Módulo 02 — Presencia e Intelecto (25%)', sub:'3 intentos · Banco rotatorio · Vence en 5 días', ico:'ti-clipboard-check', color:'blue', badge:'Pendiente', badgeColor:'red', fn:"openActivity('quiz')", locked:false },
    { title:'Simulación VICA: Árbol de decisiones en terreno (35%)', sub:'Disponible al completar las actividades previas', ico:'ti-git-branch', color:'purple', badge:'Bloqueado', badgeColor:'gray', fn:'', locked:true },
  ];
  return m.acts > 0 ? Array.from({length: m.acts}, (_,i) => ({
    title: `Actividad ${i+1} — ${m.title}`,
    sub: `Módulo ${m.num} · Disponible al desbloquear el módulo`,
    ico: 'ti-lock', color: 'gray', badge: 'Bloqueado', badgeColor: 'gray', fn: '', locked: true
  })) : [];
}

function showLockedMsg() {
  showModal(`
    <div style="padding:28px;text-align:center">
      <div style="font-size:48px;color:#d97706;margin-bottom:12px"><i class="ti ti-lock"></i></div>
      <h3 style="font-size:18px;color:#162e5a;margin-bottom:8px">Contenido bloqueado</h3>
      <p style="font-size:13.5px;color:#7aaad6;line-height:1.6">Debes completar el módulo anterior para acceder a este contenido. ¡Sigue avanzando en tu ruta formativa!</p>
      <button class="btn-primary" style="margin-top:20px" onclick="closeModal()">Entendido</button>
    </div>
  `);
}

/* ── ACTIVITIES ── */
function openActivity(type) {
  if (type === 'quiz') openQuiz();
  if (type === 'forum') openForum('etico');
  if (type === 'diary') openDiary();
}

/* ── QUIZ ── */
const QUIZ = [
  { q:'Según el MFRE 6-22, ¿cuál es el primer atributo del Carácter del Líder Militar?', opts:['La aptitud física', 'La presencia militar', 'El carácter ético', 'La inteligencia emocional'], correct:2 },
  { q:'En el entorno VICA, ¿qué significa la "V" de VICA?', opts:['Velocidad', 'Volatilidad', 'Visión', 'Valor'], correct:1 },
  { q:'¿Cuál de los siguientes NO es un atributo de presencia según el MFRE 6-22?', opts:['Ecuanimidad', 'Porte y aspecto', 'Inteligencia emocional', 'Compostura bajo presión'], correct:2 },
  { q:'¿Cuántos créditos académicos equivale el MOOC de Liderazgo Militar?', opts:['1.5 créditos', '3.0 créditos', '2.5 créditos', '2.0 créditos'], correct:2 },
  { q:'El PIEM Alpha articula la innovación educativa con el objetivo estratégico del:', opts:['Plan de Guerra 2030', 'PEMT 2042 — Pilar A', 'Manual de Instrucción Básica', 'Decreto 1330 de 2019'], correct:1 },
];

let quizState = { q:0, selected:null, answered:false, score:0 };

function openQuiz() {
  quizState = { q:0, selected:null, answered:false, score:0 };
  showSection('quiz');
  renderQuiz();
}

function renderQuiz() {
  const s = quizState;
  const q = QUIZ[s.q];
  const isLast = s.q === QUIZ.length - 1;

  document.getElementById('quizContent').innerHTML = `
    <div class="page-header" style="margin-bottom:16px">
      <button class="link-btn" onclick="showSection('modules')" style="margin-bottom:8px">← Volver</button>
    </div>
    <div class="quiz-container">
      <div class="quiz-header">
        <h2><i class="ti ti-clipboard-check"></i> Quiz · Módulo 02 — Liderazgo Militar</h2>
        <p>MFRE 6-22 · Evaluación sumativa · 25% de la nota final</p>
        <div class="quiz-progress">
          <span style="font-size:12px;color:#93c5fd">Pregunta ${s.q+1} de ${QUIZ.length}</span>
          <div class="prog-bar" style="flex:1"><div class="prog-fill" style="width:${((s.q+1)/QUIZ.length)*100}%"></div></div>
          <span style="font-size:12px;color:#60a5fa">${s.score} correctas</span>
        </div>
      </div>
      <div class="quiz-body">
        <p class="quiz-q">${s.q+1}. ${q.q}</p>
        <div class="quiz-options">
          ${q.opts.map((o,i) => `
            <button class="quiz-opt ${s.selected===i?(s.answered?(i===q.correct?'correct':'wrong'):'selected'):''}" 
                    onclick="${s.answered?'':'selectOpt('+i+')'}">${String.fromCharCode(65+i)}. ${o}</button>
          `).join('')}
        </div>
        ${s.answered ? `
          <div style="margin-top:16px;padding:12px 14px;background:${s.selected===q.correct?'#f0fdf4':'#fff1f2'};border-radius:8px;border-left:3px solid ${s.selected===q.correct?'#10b981':'#e11d48'}">
            <strong style="color:${s.selected===q.correct?'#059669':'#e11d48'};font-size:13px">${s.selected===q.correct?'✓ ¡Correcto!':'✗ Incorrecto'}</strong>
            <p style="font-size:12.5px;color:#374151;margin-top:4px">La respuesta correcta es: <strong>${q.opts[q.correct]}</strong></p>
          </div>
        ` : ''}
        <div class="quiz-footer" style="gap:8px">
          ${s.answered ? `<button class="btn-primary" onclick="${isLast?'finishQuiz()':'nextQuestion()'}">${isLast?'Ver resultados':'Siguiente pregunta →'}</button>` : 
            `<button class="btn-primary" onclick="checkAnswer()" ${s.selected===null?'disabled style="opacity:.5;cursor:not-allowed"':''}>Confirmar respuesta</button>`}
        </div>
      </div>
    </div>
  `;
}

function selectOpt(i) {
  if (quizState.answered) return;
  quizState.selected = i;
  renderQuiz();
}

function checkAnswer() {
  if (quizState.selected === null) return;
  quizState.answered = true;
  if (quizState.selected === QUIZ[quizState.q].correct) quizState.score++;
  renderQuiz();
}

function nextQuestion() {
  quizState.q++;
  quizState.selected = null;
  quizState.answered = false;
  renderQuiz();
}

function finishQuiz() {
  const pct = Math.round((quizState.score/QUIZ.length)*100);
  const pass = pct >= 60;
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h2>Quiz · Resultado final</h2>
        <p>MFRE 6-22 · Módulo 02</p>
      </div>
      <div class="quiz-body" style="text-align:center;padding:40px">
        <div style="font-size:64px;margin-bottom:16px">${pass?'🏅':'📋'}</div>
        <div style="font-size:56px;font-weight:700;color:${pass?'#059669':'#d97706'};font-family:'Space Grotesk',sans-serif">${pct}/100</div>
        <p style="font-size:16px;color:#374151;margin:12px 0 4px">${quizState.score} de ${QUIZ.length} respuestas correctas</p>
        <p style="font-size:13px;color:${pass?'#059669':'#d97706'};font-weight:600">${pass?'¡Aprobado! Continúa con el Diario Reflexivo.':'Revisa el material y vuelve a intentarlo.'}</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
          <button class="btn-secondary" onclick="openQuiz()">Reintentar</button>
          <button class="btn-primary" onclick="showSection('dashboard')">Volver al tablero</button>
        </div>
      </div>
    </div>
  `;
}

/* ── DIARY ── */
function openDiary() {
  showModal(`
    <div class="diary-container">
      <div class="diary-header">
        <h2><i class="ti ti-notebook" style="color:#059669"></i> Diario Reflexivo de Liderazgo</h2>
        <p style="font-size:12px;color:#7aaad6;margin-top:4px">Módulo 02 · Evaluación formativa continua · Metacognición</p>
      </div>
      <div class="diary-body">
        <div class="diary-prompt">
          <strong style="display:block;margin-bottom:6px;color:#1d4ed8">Pregunta reflexiva:</strong>
          Tomando como referencia los atributos de <strong>Presencia e Intelecto</strong> del MFRE 6-22, describe una situación real de tu experiencia militar en la que debiste tomar una decisión bajo presión. ¿Cómo influyó tu nivel de ecuanimidad y pensamiento crítico en el resultado? ¿Qué harías diferente hoy, a la luz de la doctrina?
        </div>
        <textarea id="diaryText" placeholder="Escribe tu reflexión aquí... (mínimo 150 palabras)" oninput="updateChar()"></textarea>
        <div class="char-count" id="charCount">0 / 150 palabras mínimas</div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;gap:10px">
          <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
          <button class="btn-primary" onclick="saveDiary()"><i class="ti ti-send"></i> Enviar reflexión</button>
        </div>
      </div>
    </div>
  `);
}

function updateChar() {
  const t = document.getElementById('diaryText');
  const c = document.getElementById('charCount');
  if (!t || !c) return;
  const words = t.value.trim().split(/\s+/).filter(w => w.length > 0).length;
  c.textContent = `${words} / 150 palabras mínimas`;
  c.style.color = words >= 150 ? '#059669' : '#9ca3af';
}

function saveDiary() {
  const t = document.getElementById('diaryText');
  if (!t) return;
  const words = t.value.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (words < 10) { alert('Por favor escribe tu reflexión antes de enviar.'); return; }
  closeModal();
  setTimeout(() => {
    showModal(`
      <div style="padding:32px;text-align:center">
        <div style="font-size:56px;margin-bottom:12px">✅</div>
        <h3 style="font-size:18px;color:#162e5a;margin-bottom:8px">¡Reflexión enviada!</h3>
        <p style="font-size:13.5px;color:#7aaad6;line-height:1.6">Tu Diario Reflexivo ha sido registrado. El instructor revisará tu aporte y te enviará retroalimentación.</p>
        <button class="btn-primary" style="margin-top:20px" onclick="closeModal();showSection('dashboard')">Volver al tablero</button>
      </div>
    `);
  }, 300);
}

/* ── FORUMS ── */
const FORUM_POSTS = {
  etico: [
    { av:'CR', avStyle:'background:#eff6ff;color:#1d4ed8', author:'Coronel Ramírez', role:'Instructor · CEDOC', text:'Este dilema es precisamente el núcleo del liderazgo ético en operaciones. La doctrina del MFRE 6-22 nos recuerda que el carácter no se improvisa en el campo de batalla: se forja en la formación diaria. ¿Cómo han vivido ustedes esta tensión entre la misión y los valores?', time:'Hace 2 días', likes:12 },
    { av:'TA', avStyle:'background:#fff1f2;color:#e11d48', author:'Teniente Aguilar', role:'Oficial · Módulo 02', text:'En mi experiencia en zona de consolidación, la presión del tiempo y la incertidumbre hacen que la toma de decisiones éticas sea extremadamente compleja. He aprendido que la ecuanimidad —uno de los atributos de presencia del MFRE 6-22— no es solo control emocional, sino claridad de principios.', time:'Hace 1 día', likes:8 },
    { av:'SM', avStyle:'background:#f0fdf4;color:#059669', author:'Sargento Mora', role:'Suboficial · Módulo 01 completado', text:'Desde mi perspectiva como suboficial, el dilema ético más frecuente es cuando la orden contradice la intuición táctica. La formación en liderazgo nos da herramientas para navegar esa tensión sin perder la integridad.', time:'Hace 18 horas', likes:15 },
  ],
  liderazgo: [
    { av:'DI', avStyle:'background:#fffbeb;color:#d97706', author:'Diseñadora Instruccional', role:'Politécnico Grancolombiano', text:'Desde el diseño instruccional, el liderazgo del siglo XXI requiere integrar las competencias del MFRE 6-22 con habilidades digitales y de pensamiento crítico. El entorno VICA exige líderes que sepan aprender a aprender.', time:'Hace 5 días', likes:22 },
    { av:'CR', avStyle:'background:#eff6ff;color:#1d4ed8', author:'Coronel Ramírez', role:'Instructor · CEDOC', text:'El líder militar contemporáneo no solo debe dominar la táctica, sino la ética aplicada en contextos complejos. El PIEM Alpha busca exactamente eso: formar líderes que piensen, sientan y actúen con coherencia.', time:'Hace 4 días', likes:31 },
  ]
};

function openForum(id) {
  const posts = FORUM_POSTS[id] || [];
  const title = id === 'etico' ? 'Dilema ético en escenario operacional complejo' : '¿Qué hace a un líder militar en el siglo XXI?';
  const desc = id === 'etico' ? 'Analice y reflexione sobre la toma de decisiones bajo presión en contextos donde la ética militar y la misión entran en tensión. Sustente su aporte con referencia al MFRE 6-22.' : 'Reflexión sobre los atributos del liderazgo en el contexto de la transformación institucional del Ejército Nacional hacia el PEMT 2042.';

  document.getElementById('forumDetailContent').innerHTML = `
    <button class="link-btn" onclick="showSection('forums')" style="margin-bottom:12px">← Volver a foros</button>
    <div class="forum-detail-header">
      <h2>${title}</h2>
      <p>${desc}</p>
    </div>
    <div class="forum-posts">
      ${posts.map((p,i) => `
        <div class="post-card">
          <div class="post-header">
            <div class="post-av" style="${p.avStyle}">${p.av}</div>
            <div class="post-author">
              <strong>${p.author}</strong>
              <span>${p.role} · ${p.time}</span>
            </div>
          </div>
          <p class="post-body">${p.text}</p>
          <div class="post-actions">
            <button class="post-action" onclick="likePost(${i})"><i class="ti ti-thumb-up"></i> <span id="likes-${i}">${p.likes}</span></button>
            <button class="post-action"><i class="ti ti-message"></i> Responder</button>
          </div>
        </div>
      `).join('')}
    </div>
    ${id === 'etico' ? `
    <div class="new-post">
      <h4><i class="ti ti-edit" style="color:#2563eb"></i> Agrega tu aporte al foro</h4>
      <textarea id="forumText" placeholder="Escribe tu reflexión argumentada con referencia al MFRE 6-22..."></textarea>
      <div class="post-footer">
        <button class="btn-primary" onclick="postForum()"><i class="ti ti-send"></i> Publicar aporte</button>
      </div>
    </div>
    ` : `<div class="widget" style="text-align:center;padding:20px;color:#7aaad6"><i class="ti ti-lock" style="font-size:24px;margin-bottom:8px;display:block"></i> Este foro está cerrado. Tu participación fue registrada.</div>`}
  `;
  showSection('forum-detail');
}

function likePost(i) {
  const el = document.getElementById(`likes-${i}`);
  if (el) el.textContent = parseInt(el.textContent) + 1;
}

function postForum() {
  const t = document.getElementById('forumText');
  if (!t || t.value.trim().length < 10) { alert('Por favor escribe tu aporte antes de publicar.'); return; }
  showModal(`
    <div style="padding:32px;text-align:center">
      <div style="font-size:56px;margin-bottom:12px">💬</div>
      <h3 style="font-size:18px;color:#162e5a;margin-bottom:8px">¡Aporte publicado!</h3>
      <p style="font-size:13.5px;color:#7aaad6;line-height:1.6">Tu reflexión ha sido registrada en el foro. El instructor revisará tu participación.</p>
      <button class="btn-primary" style="margin-top:20px" onclick="closeModal()">Continuar</button>
    </div>
  `);
}

/* ── VIDEO MODAL ── */
function openVideoModal() {
  showModal(`
    <div style="padding:24px">
      <h3 style="font-size:16px;color:#162e5a;margin-bottom:4px"><i class="ti ti-player-play" style="color:#2563eb"></i> Video-cápsula</h3>
      <p style="font-size:12px;color:#7aaad6;margin-bottom:16px">Atributos del líder militar según MFRE 6-22 · PIEM Alpha · CEDOC</p>
      <div style="background:#0d2649;border-radius:10px;aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;gap:12px">
        <div style="width:64px;height:64px;background:rgba(37,99,235,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;border:2px solid rgba(96,165,250,.4);cursor:pointer" onclick="this.innerHTML='⏸'">▶</div>
        <p style="font-size:13px;color:#60a5fa">Video · 22 min · Módulo 02</p>
        <p style="font-size:11px;color:#4a7bc4">Producción CREA · Politécnico Grancolombiano</p>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px">
        <button class="btn-primary" onclick="closeModal()">Cerrar</button>
      </div>
    </div>
  `);
}

/* ── CHAT ── */
function openChat() {
  document.getElementById('chatModal').classList.add('show');
}

function closeChat() {
  document.getElementById('chatModal').classList.remove('show');
}

const BOT_RESPONSES = [
  '¡Con gusto te ayudo! ¿Tu pregunta es sobre algún módulo específico o sobre el proceso de evaluación?',
  'Recuerda que el Quiz del Módulo 02 vence en 5 días. ¿Necesitas que te explique algún concepto del MFRE 6-22?',
  'El Diario Reflexivo es una herramienta clave para tu metacognición. Te invito a escribir con honestidad sobre tu experiencia de liderazgo.',
  'Para la Simulación VICA, debes completar primero las actividades del Módulo 02. ¿Vas bien con el contenido?',
  'Cualquier duda sobre la doctrina MFRE 6-22 puedes consultarla en la sección de Recursos. ¡Estoy aquí para acompañarte!',
];
let botIdx = 0;

function sendChat() {
  const inp = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');
  if (!inp.value.trim()) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg sent';
  userMsg.innerHTML = `<p>${inp.value}</p><span>${getTime()}</span>`;
  msgs.appendChild(userMsg);
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg received';
    botMsg.innerHTML = `<p>${BOT_RESPONSES[botIdx % BOT_RESPONSES.length]}</p><span>${getTime()}</span>`;
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
    botIdx++;
  }, 800);
}

function handleChatKey(e) { if (e.key === 'Enter') sendChat(); }

function getTime() {
  const n = new Date();
  return `${n.getHours().toString().padStart(2,'0')}:${n.getMinutes().toString().padStart(2,'0')}`;
}

/* ── MODAL ── */
function showModal(html) {
  const o = document.getElementById('modal');
  const b = document.getElementById('modalBox');
  b.innerHTML = html;
  o.classList.add('show');
}

function closeModal(e) {
  if (!e || e.target.id === 'modal') {
    document.getElementById('modal').classList.remove('show');
  }
}

/* ── ANIMATE BARS ── */
function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.cb-fill, .mod-bf, .prog-fill').forEach(el => {
      el.style.transition = 'width 1.2s ease';
    });
  }, 100);
}

/* ── INIT ── */
window.addEventListener('load', () => {
  /* Permitir entrar con Enter */
  document.getElementById('loginPass').addEventListener('keypress', e => {
    if (e.key === 'Enter') doLogin();
  });
});
