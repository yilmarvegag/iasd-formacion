/* Buscador y filtros · maqueta con datos ficticios */
(function () {
  'use strict';

  /* ---------- Índice de búsqueda (contenido de ejemplo) ---------- */
  var INDEX = [
 {
  "t": "Módulo 1 · OneVoice (título provisional)",
  "y": "Módulo",
  "k": "onevoice una voz un mensaje unidad mision",
  "h": "1-inicio.html"
 },
 {
  "t": "Módulo 2 · Estructura del sermón",
  "y": "Módulo",
  "k": "sermon introduccion cuerpo cierre",
  "h": "1-inicio.html"
 },
 {
  "t": "Módulo 3 · El llamado al bautismo",
  "y": "Módulo",
  "k": "bautismo bautizarse llamado invitar decision estudio",
  "h": "2-leccion.html"
 },
 {
  "t": "Módulo 4 · Conocer la Biblia",
  "y": "Módulo",
  "k": "biblia estudio contexto",
  "h": "1-inicio.html"
 },
 {
  "t": "Módulo 5 · Herramientas para enriquecer el sermón",
  "y": "Módulo",
  "k": "ilustraciones medios testimonios",
  "h": "1-inicio.html"
 },
 {
  "t": "Módulo 6 · Manejo del público joven",
  "y": "Módulo",
  "k": "jovenes publico voz presencia",
  "h": "1-inicio.html"
 },
 {
  "t": "Módulo 7 · Presentación personal",
  "y": "Módulo",
  "k": "vestimenta ropa testimonio",
  "h": "1-inicio.html"
 },
 {
  "t": "Lección 2 · Cómo hacer el llamado",
  "y": "Lección",
  "k": "llamado bautismo invitar",
  "h": "2-leccion.html"
 },
 {
  "t": "Hechos 8:26-39 · Felipe y el etíope",
  "y": "Texto bíblico",
  "k": "etiope felipe agua bautizado",
  "h": "2-leccion.html"
 },
 {
  "t": "Cuestionario de repaso de la lección 2",
  "y": "Evaluación",
  "k": "cuestionario preguntas repaso quiz",
  "h": "3-evaluacion.html"
 },
 {
  "t": "Mi púlpito · constructor de sermones",
  "y": "Sermón",
  "k": "sermon borrador constructor retroalimentacion practica",
  "h": "4-predicador.html"
 },
 {
  "t": "Estructura de un sermón en tres puntos",
  "y": "Recurso",
  "k": "sermon introduccion cierre puntos plantilla",
  "h": "6-recursos.html#r-estructura"
 },
 {
  "t": "Cómo hacer el llamado con respeto",
  "y": "Recurso",
  "k": "bautismo invitar decision video",
  "h": "6-recursos.html#r-llamado"
 },
 {
  "t": "Preguntas frecuentes sobre el bautismo",
  "y": "Recurso",
  "k": "bautizarse creencia 15 preguntas guia",
  "h": "6-recursos.html#r-bautismo"
 },
 {
  "t": "Guion de estudio bíblico con llamado final",
  "y": "Recurso",
  "k": "estudio biblico llamado bautismo plantilla",
  "h": "6-recursos.html#r-guion"
 },
 {
  "t": "Hechos 8:26-39 con notas de contexto",
  "y": "Recurso",
  "k": "etiope felipe agua biblia lectura",
  "h": "6-recursos.html#r-hechos8"
 },
 {
  "t": "Banco de ilustraciones para jóvenes",
  "y": "Recurso",
  "k": "historias ejemplos jovenes guia",
  "h": "6-recursos.html#r-ilustraciones"
 },
 {
  "t": "Tono, ritmo y pausas al predicar",
  "y": "Recurso",
  "k": "voz publico jovenes presencia audio",
  "h": "6-recursos.html#r-voz"
 },
 {
  "t": "Presentación personal en el púlpito",
  "y": "Recurso",
  "k": "vestimenta ropa testimonio guia",
  "h": "6-recursos.html#r-presentacion"
 },
 {
  "t": "Pr. Luis Bello · Predicación y estructura del sermón",
  "y": "Mentor",
  "k": "sermon estructura mentor predicacion pastor mentor",
  "h": "5-mentores.html#m-luis"
 },
 {
  "t": "Pr. Camilo Paba · Jóvenes y evangelismo juvenil",
  "y": "Mentor",
  "k": "juventud adolescentes evangelismo juvenil jovenes pastor mentor",
  "h": "5-mentores.html#m-camilo"
 },
 {
  "t": "Pr. Samuel Ortega · Familia",
  "y": "Mentor",
  "k": "matrimonio parejas hijos padres hogar familia pastor mentor",
  "h": "5-mentores.html#m-samuel"
 },
 {
  "t": "Pr. Andrés Ruiz · Mayordomía",
  "y": "Mentor",
  "k": "diezmos ofrendas tiempo talentos mayordomia pastor mentor",
  "h": "5-mentores.html#m-andres"
 },
 {
  "t": "Pr. Daniel Herrera · Discipulado",
  "y": "Mentor",
  "k": "bautizados nuevos creyentes seguimiento discipulado pastor mentor",
  "h": "5-mentores.html#m-daniel"
 },
 {
  "t": "Pr. Esteban Molina · Estudios bíblicos",
  "y": "Mentor",
  "k": "biblia contexto interpretacion texto estudios pastor mentor",
  "h": "5-mentores.html#m-esteban"
 }
];

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  INDEX.forEach(function (it) { it.n = norm(it.t); it.nk = norm(it.k || ''); });

  function search(q) {
    var n = norm(q).trim();
    if (!n) { return []; }
    var words = n.split(/\s+/);
    var out = [];
    INDEX.forEach(function (it) {
      var score = 0, ok = true;
      words.forEach(function (w) {
        if (it.n.indexOf(w) === 0) { score += 4; }
        else if (it.n.indexOf(' ' + w) !== -1) { score += 3; }
        else if (it.n.indexOf(w) !== -1) { score += 2; }
        else if (it.nk.indexOf(w) !== -1) { score += 1; }
        else { ok = false; }
      });
      if (ok) { out.push({ it: it, score: score }); }
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, 6).map(function (o) { return o.it; });
  }

  /* ---------- Buscador (patrón combobox) ---------- */
  var seq = 0;
  Array.prototype.forEach.call(document.querySelectorAll('form[data-buscador]'), function (form) {
    var input = form.querySelector('input[type=search]');
    if (!input) { return; }
    seq += 1;
    var listId = 'sr-list-' + seq;
    var list = document.createElement('ul');
    list.className = 'sr-list';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', 'Resultados de la búsqueda');
    list.hidden = true;
    form.appendChild(list);
    var status = document.createElement('span');
    status.className = 'vh';
    status.setAttribute('role', 'status');
    form.appendChild(status);

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', listId);

    var results = [];
    var active = -1;

    function close() {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      active = -1;
    }
    function setActive(i) {
      var opts = list.querySelectorAll('[role=option]');
      Array.prototype.forEach.call(opts, function (o) { o.setAttribute('aria-selected', 'false'); });
      active = i;
      if (i >= 0 && opts[i]) {
        opts[i].setAttribute('aria-selected', 'true');
        input.setAttribute('aria-activedescendant', opts[i].id);
        opts[i].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }
    function go(it) { window.location.href = it.h; }
    function render(q) {
      list.innerHTML = '';
      active = -1;
      if (!q.trim()) {
        close();
        return;
      }
      results = search(q);
      if (!results.length) {
        var li = document.createElement('li');
        li.className = 'sr-empty';
        li.setAttribute('role', 'presentation');
        li.textContent = 'No encontramos resultados para «' + q.trim() + '». Prueba con: bautismo, familia, jóvenes o sermón.';
        list.appendChild(li);
        status.textContent = 'Sin resultados';
      } else {
        results.forEach(function (it, i) {
          var li = document.createElement('li');
          li.className = 'sr-opt';
          li.id = listId + '-' + i;
          li.setAttribute('role', 'option');
          li.setAttribute('aria-selected', 'false');
          var t = document.createElement('span');
          t.className = 'sr-t';
          t.textContent = it.t;
          var ty = document.createElement('span');
          ty.className = 'sr-type';
          ty.textContent = it.y;
          li.appendChild(t);
          li.appendChild(ty);
          li.addEventListener('mousedown', function (e) { e.preventDefault(); });
          li.addEventListener('click', function () { go(it); });
          list.appendChild(li);
        });
        status.textContent = results.length + (results.length === 1 ? ' resultado' : ' resultados') + '. Usa las flechas para elegir.';
      }
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('focus', function () { if (input.value.trim()) { render(input.value); } });
    input.addEventListener('blur', function () { setTimeout(close, 120); });
    input.addEventListener('keydown', function (e) {
      var opts = list.querySelectorAll('[role=option]');
      if (e.key === 'ArrowDown') {
        if (list.hidden && input.value.trim()) { render(input.value); opts = list.querySelectorAll('[role=option]'); }
        if (opts.length) { e.preventDefault(); setActive((active + 1) % opts.length); }
      } else if (e.key === 'ArrowUp') {
        if (opts.length) { e.preventDefault(); setActive(active <= 0 ? opts.length - 1 : active - 1); }
      } else if (e.key === 'Escape') {
        if (!list.hidden) { e.preventDefault(); close(); }
        else if (input.value) { input.value = ''; }
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input.value.trim()) {
        list.innerHTML = '<li class="sr-empty" role="presentation">Escribe una palabra, por ejemplo: bautismo.</li>';
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        input.focus();
        return;
      }
      if (active >= 0 && results[active]) { go(results[active]); return; }
      var r = search(input.value);
      if (r.length) { go(r[0]); } else { render(input.value); }
    });
  });

  /* ---------- Filtros por categoría (Recursos y Mentores) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-filter-group]'), function (group) {
    var target = document.getElementById(group.getAttribute('data-target'));
    var count = document.getElementById(group.getAttribute('data-count'));
    var noun = group.getAttribute('data-noun') || 'elementos';
    var one = group.getAttribute('data-noun-one') || 'elemento';
    if (!target) { return; }
    var buttons = group.querySelectorAll('[data-filter]');
    var items = target.querySelectorAll('[data-cat]');
    function apply(cat) {
      var n = 0;
      Array.prototype.forEach.call(items, function (it) {
        var show = cat === 'todos' || it.getAttribute('data-cat') === cat;
        it.hidden = !show;
        if (show) { n += 1; }
      });
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-filter') === cat ? 'true' : 'false');
      });
      if (count) { count.textContent = 'Mostrando ' + n + ' ' + (n === 1 ? one : noun); }
    }
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });
    apply('todos');
    /* Si llegan con un ancla (#m-camilo), asegurar que esté visible. */
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el && el.hidden) { apply('todos'); }
    }
  });
})();
