/* Atrio · comportamiento de la maqueta (datos ficticios). Sin dependencias. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');

  /* ---------- Tamaño de texto A− / A+ (4 niveles, se recuerda) ---------- */
  var LEVELS = [100, 111, 122, 133], KEY = 'atrio-texto', level = 0;
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

  function announce(msg) { live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 30); }

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

  /* ---------- Lección paso a paso (sin JS se ve completa) ---------- */
  var panels = Array.prototype.slice.call(doc.querySelectorAll('.panel'));
  if (panels.length) {
    var segs = Array.prototype.slice.call(doc.querySelectorAll('.seg button'));
    var prev = doc.getElementById('prev'), next = doc.getElementById('next'), go = doc.getElementById('go');
    var pos = doc.getElementById('steppos'), at = 0;
    var showStep = function (i, focus) {
      at = i;
      panels.forEach(function (p, k) { p.hidden = k !== i; });
      segs.forEach(function (s, k) {
        if (k === i) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
        s.classList.toggle('done', k < i);
      });
      prev.hidden = i === 0; next.hidden = i === panels.length - 1; go.hidden = i !== panels.length - 1;
      pos.textContent = 'Paso ' + (i + 1) + ' de ' + panels.length;
      if (focus) { var h = panels[i].querySelector('h2'); h.setAttribute('tabindex', '-1'); h.focus(); }
    };
    segs.forEach(function (s, k) { s.addEventListener('click', function () { showStep(k, true); }); });
    prev.addEventListener('click', function () { showStep(at - 1, true); });
    next.addEventListener('click', function () { showStep(at + 1, true); });
    showStep(0, false);

    var checks = doc.querySelectorAll('.checks input'), cnt = doc.getElementById('chk');
    var upd = function () { var n = 0; checks.forEach(function (c) { if (c.checked) n++; }); cnt.textContent = n + ' de ' + checks.length + ' pasos practicados'; };
    checks.forEach(function (c) { c.addEventListener('change', upd); }); upd();
  }

  /* ---------- Cuestionario: todas las preguntas en tarjetas ---------- */
  var form = doc.getElementById('quiz');
  if (form) {
    var cards = Array.prototype.slice.call(form.querySelectorAll('.qcard'));
    var bar = doc.getElementById('abar'), ans = doc.getElementById('answered'), ferr = doc.getElementById('formerr');
    var countAns = function () { var n = 0; cards.forEach(function (c) { if (c.querySelector('input:checked')) n++; }); return n; };
    var refresh = function () { var n = countAns(); ans.textContent = n + ' de ' + cards.length + ' respondidas'; bar.style.transform = 'scaleX(' + (n / cards.length) + ')'; ferr.textContent = ''; };
    form.addEventListener('change', refresh); refresh();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var missing = cards.filter(function (c) { return !c.querySelector('input:checked'); });
      if (missing.length) {
        var idx = cards.indexOf(missing[0]) + 1;
        ferr.textContent = 'Falta responder la pregunta ' + idx + '.';
        missing[0].querySelector('input').focus();
        return;
      }
      var score = 0, list = doc.getElementById('expl'); list.innerHTML = '';
      cards.forEach(function (c, k) {
        var sel = c.querySelector('input:checked'), good = c.getAttribute('data-correct');
        var ok = sel.value === good; if (ok) score++;
        c.querySelectorAll('input').forEach(function (i) {
          i.disabled = true;
          var w = i.closest('.chip');
          if (i.value === good) w.classList.add('right'); else if (i === sel) w.classList.add('wrong');
        });
        var li = doc.createElement('li'); li.className = ok ? 'ok' : 'no';
        li.innerHTML = '<b><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-' + (ok ? 'checkc' : 'warn') + '"/></svg>Pregunta ' + (k + 1) + ': ' + (ok ? 'correcta' : 'para repasar') + '</b><p></p>';
        li.querySelector('p').textContent = c.getAttribute('data-why');
        list.appendChild(li);
      });
      doc.getElementById('score').textContent = score;
      var arcs = doc.querySelectorAll('#sring .arc');
      arcs.forEach(function (a, k) { a.setAttribute('stroke', k < score ? '#0B5148' : '#5F716B'); a.setAttribute('stroke-width', k < score ? '14' : '5'); });
      var pass = score >= 2;
      doc.getElementById('verdict').innerHTML = pass
        ? '<span class="tag ok"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-checkc"/></svg>Aprobado</span> Ya puedes pasar a la lección 3.'
        : '<span class="tag err"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-repeat"/></svg>Por repasar</span> Repasa la lección 2 y vuelve a intentarlo cuando quieras.';
      var r = doc.getElementById('resultado'); r.hidden = false; r.setAttribute('tabindex', '-1'); r.focus();
      doc.getElementById('submitrow').hidden = true;
    });
    doc.getElementById('qagain').addEventListener('click', function () {
      cards.forEach(function (c) { c.querySelectorAll('input').forEach(function (i) { i.disabled = false; i.checked = false; i.closest('.chip').classList.remove('right', 'wrong'); }); });
      doc.getElementById('resultado').hidden = true; doc.getElementById('submitrow').hidden = false; refresh();
      window.scrollTo({ top: 0 }); cards[0].querySelector('input').focus();
    });
  }

  /* ---------- Constructor de sermones: bloques, tiempos y sugerencia ---------- */
  var list = doc.getElementById('blocks');
  if (list) {
    var TARGET = 30;
    var items = function () { return Array.prototype.slice.call(list.children); };
    var total = doc.getElementById('tot'), tmeter = doc.getElementById('tmeter'), tnote = doc.getElementById('tnote');
    var sug = doc.getElementById('sugtext'), sugCard = doc.getElementById('sugg'), dismissed = false;
    var refresh2 = function () {
      var arr = items(), t = 0;
      arr.forEach(function (li, k) {
        t += parseInt(li.querySelector('output').getAttribute('data-v'), 10);
        li.querySelector('[data-up]').disabled = k === 0;
        li.querySelector('[data-down]').disabled = k === arr.length - 1;
      });
      total.textContent = t;
      tmeter.style.transform = 'scaleX(' + Math.min(1, t / TARGET) + ')';
      tnote.textContent = t === TARGET ? 'Justo en los ' + TARGET + ' minutos previstos.' : (t < TARGET ? 'Te sobran ' + (TARGET - t) + ' min de los ' + TARGET + ' previstos.' : 'Te pasas ' + (t - TARGET) + ' min de los ' + TARGET + ' previstos.');
      var pos = arr.findIndex(function (li) { return li.getAttribute('data-id') === 'llamado'; });
      if (pos < arr.length - 2) {
        sug.textContent = 'El llamado está en la posición ' + (pos + 1) + ' de ' + arr.length + '. Conviene ponerlo después de los puntos, cerca del final.';
        if (!dismissed) sugCard.hidden = false;
        sugCard.setAttribute('data-state', 'warn');
      } else {
        sug.textContent = 'El orden es coherente: el llamado va después de los puntos y antes del cierre.';
        sugCard.setAttribute('data-state', 'ok');
        sugCard.hidden = false;
      }
    };
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var li = b.closest('.block'), name = li.querySelector('h3').textContent;
      if (b.hasAttribute('data-up') || b.hasAttribute('data-down')) {
        var up = b.hasAttribute('data-up');
        var sib = up ? li.previousElementSibling : li.nextElementSibling;
        if (!sib) return;
        if (up) list.insertBefore(li, sib); else list.insertBefore(sib, li);
        li.classList.add('moved'); setTimeout(function () { li.classList.remove('moved'); }, 1200);
        refresh2(); b.disabled ? li.querySelector(up ? '[data-down]' : '[data-up]').focus() : b.focus();
        announce(name + ' ahora es el bloque ' + (items().indexOf(li) + 1) + ' de ' + items().length + '.');
      } else if (b.hasAttribute('data-dec') || b.hasAttribute('data-inc')) {
        var o = li.querySelector('output'), v = parseInt(o.getAttribute('data-v'), 10) + (b.hasAttribute('data-inc') ? 1 : -1);
        v = Math.max(0, Math.min(30, v)); o.setAttribute('data-v', v); o.textContent = v + ' min';
        li.querySelector('[data-dec]').disabled = v === 0; li.querySelector('[data-inc]').disabled = v === 30;
        refresh2();
      }
    });
    var dis = doc.getElementById('dismiss');
    if (dis) dis.addEventListener('click', function () { dismissed = true; sugCard.hidden = true; announce('Sugerencia descartada.'); });
    refresh2();

    var fbc = doc.querySelectorAll('.fb-list input'), fbn = doc.getElementById('fbn');
    var fbu = function () { var n = 0; fbc.forEach(function (c) { if (c.checked) n++; }); fbn.textContent = n + ' de ' + fbc.length + ' aplicadas'; };
    fbc.forEach(function (c) { c.addEventListener('change', fbu); }); fbu();
  }

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
