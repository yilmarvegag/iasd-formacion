/* Sendero · comportamiento de la maqueta (datos ficticios). Sin dependencias. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;

  /* ---------- Tamaño de texto A− / A+ (4 niveles, se recuerda) ---------- */
  var LEVELS = [100, 111, 122, 133], KEY = 'sendero-texto', level = 0;
  try { level = Math.max(0, Math.min(3, parseInt(localStorage.getItem(KEY), 10) || 0)); } catch (e) {}
  var minus = doc.querySelectorAll('[data-fs=minus]'), plus = doc.querySelectorAll('[data-fs=plus]');
  var live = doc.createElement('p');
  live.className = 'vh'; live.setAttribute('role', 'status'); doc.body.appendChild(live);
  function applyFs(announce) {
    root.style.fontSize = LEVELS[level] + '%';
    minus.forEach(function (b) { b.disabled = level === 0; });
    plus.forEach(function (b) { b.disabled = level === LEVELS.length - 1; });
    try { localStorage.setItem(KEY, String(level)); } catch (e) {}
    if (announce) live.textContent = 'Tamaño de texto: ' + LEVELS[level] + ' %';
  }
  minus.forEach(function (b) { b.addEventListener('click', function () { if (level > 0) { level--; applyFs(true); } }); });
  plus.forEach(function (b) { b.addEventListener('click', function () { if (level < 3) { level++; applyFs(true); } }); });
  applyFs(false);

  /* ---------- Aviso para lo que no tiene pantalla ---------- */
  var toast;
  function say(msg) {
    if (toast) toast.remove();
    toast = doc.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status');
    var p = doc.createElement('span'); p.textContent = msg;
    var b = doc.createElement('button'); b.type = 'button'; b.textContent = 'Cerrar';
    b.addEventListener('click', function () { toast.remove(); toast = null; });
    toast.appendChild(p); toast.appendChild(b); doc.body.appendChild(toast); b.focus();
  }
  doc.addEventListener('click', function (e) {
    var t = e.target.closest('[data-na]');
    if (!t) return;
    e.preventDefault();
    say('«' + t.getAttribute('data-na') + '» no forma parte de esta maqueta. En el producto real se abriría aquí.');
  });
  doc.querySelectorAll('form[data-na-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); say('La búsqueda no forma parte de esta maqueta.'); });
  });

  /* ---------- Barra de lectura (solo decorativa) ---------- */
  var rp = doc.querySelector('.rp');
  if (rp) {
    var tick = false;
    var upd = function () {
      var h = root.scrollHeight - root.clientHeight;
      rp.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, root.scrollTop / h) : 0) + ')';
      tick = false;
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* ---------- Cuestionario: una pregunta por pantalla ---------- */
  var quiz = doc.getElementById('quiz');
  if (quiz) {
    var qs = Array.prototype.slice.call(quiz.querySelectorAll('.q'));
    var ticks = Array.prototype.slice.call(doc.querySelectorAll('#qruler li'));
    var cur = 0, score = 0, checked = false;
    var btn = doc.getElementById('qbtn'), err = doc.getElementById('qerr'), pos = doc.getElementById('qpos');
    var res = doc.getElementById('resultado'), again = doc.getElementById('qagain');

    var show = function (i) {
      qs.forEach(function (q, k) { q.hidden = k !== i; });
      ticks.forEach(function (t, k) { t.className = k < i ? 'd' : (k === i ? 'n' : ''); });
      pos.textContent = 'Pregunta ' + (i + 1) + ' de ' + qs.length;
      btn.firstChild.nodeValue = 'Comprobar respuesta ';
      checked = false; err.textContent = '';
    };
    var finish = function () {
      quiz.hidden = true;
      doc.getElementById('qprog').hidden = true;
      res.hidden = false;
      doc.getElementById('score').textContent = score;
      doc.getElementById('total').textContent = qs.length;
      var pass = score >= 2;
      doc.getElementById('verdict').innerHTML = pass
        ? '<span class="tag ok"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-checkc"/></svg>Aprobado</span> Puedes pasar a la lección 3.'
        : '<span class="tag err"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-repeat"/></svg>Por repasar</span> Repasa la lección 2 y vuelve a intentarlo cuando quieras.';
      ticks.forEach(function (t) { t.className = 'd'; });
      res.setAttribute('tabindex', '-1'); res.focus();
    };
    btn.addEventListener('click', function () {
      var q = qs[cur];
      if (checked) { if (cur < qs.length - 1) { cur++; show(cur); qs[cur].querySelector('input').focus(); } else { finish(); } return; }
      var sel = q.querySelector('input:checked');
      if (!sel) { err.textContent = 'Elige una respuesta para continuar.'; return; }
      err.textContent = '';
      var ok = sel.value === q.getAttribute('data-correct');
      if (ok) score++;
      q.querySelectorAll('input').forEach(function (i) {
        i.disabled = true;
        var wrap = i.closest('.opt');
        if (i.value === q.getAttribute('data-correct')) wrap.classList.add('right');
        else if (i === sel) wrap.classList.add('wrong');
      });
      var fb = q.querySelector('.fb');
      fb.className = 'fb ' + (ok ? 'ok' : 'err');
      fb.querySelector('.fb-t').innerHTML = ok
        ? '<svg class="ic" aria-hidden="true" focusable="false"><use href="#i-checkc"/></svg>Correcto'
        : '<svg class="ic" aria-hidden="true" focusable="false"><use href="#i-warn"/></svg>Para repasar';
      fb.hidden = false;
      checked = true;
      btn.firstChild.nodeValue = (cur < qs.length - 1 ? 'Siguiente pregunta ' : 'Ver mi resultado ');
    });
    again.addEventListener('click', function () {
      score = 0; cur = 0;
      qs.forEach(function (q) {
        q.querySelectorAll('input').forEach(function (i) { i.disabled = false; i.checked = false; i.closest('.opt').classList.remove('right', 'wrong'); });
        q.querySelector('.fb').hidden = true;
      });
      res.hidden = true; quiz.hidden = false; doc.getElementById('qprog').hidden = false;
      show(0); qs[0].querySelector('input').focus();
    });
    show(0);
  }

  /* ---------- Constructor de sermones: tiempo total ---------- */
  var mins = doc.querySelectorAll('.mins input');
  var tot = doc.getElementById('tot'), totNote = doc.getElementById('totnote');
  function sum() {
    var t = 0;
    mins.forEach(function (i) { var v = parseInt(i.value, 10); if (!isNaN(v) && v > 0) t += v; });
    tot.textContent = t;
    totNote.textContent = t === 30 ? 'Justo en los 30 minutos previstos.' : (t < 30 ? 'Te sobran ' + (30 - t) + ' min de los 30 previstos.' : 'Te pasas ' + (t - 30) + ' min de los 30 previstos.');
  }
  if (tot) { mins.forEach(function (i) { i.addEventListener('input', sum); }); sum(); }

  /* ---------- Confirmación antes de enviar al mentor ---------- */
  var dlg = doc.getElementById('confirm');
  if (dlg) {
    var opener = null;
    doc.querySelectorAll('[data-confirm]').forEach(function (b) {
      b.addEventListener('click', function () { opener = b; if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); });
    });
    dlg.querySelector('[data-cancel]').addEventListener('click', function () { dlg.close(); if (opener) opener.focus(); });
    dlg.querySelector('[data-ok]').addEventListener('click', function () {
      dlg.close();
      var s = doc.getElementById('sendstate');
      s.className = 'tag rev';
      s.innerHTML = '<svg class="ic" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>En revisión por Pr. Luis Bello';
      opener.setAttribute('aria-disabled', 'true');
      opener.textContent = 'Enviado a tu mentor';
      say('Listo. Tu sermón se envió a Pr. Luis Bello (simulado en esta maqueta).');
    });
  }
})();
