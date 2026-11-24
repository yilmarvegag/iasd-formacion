/* Voz y Misión · comportamiento mínimo de la maqueta */
(function () {
  'use strict';

  /* ---------- Iconos: un solo set, trazo uniforme (24x24, 1.75) ---------- */
  var ICONS = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    book: '<path d="M12 6c-1.5-1.3-3.7-2-7-2v14c3.3 0 5.5.7 7 2 1.5-1.3 3.7-2 7-2V4c-3.3 0-5.5.7-7 2z"/><path d="M12 6v14"/>',
    check: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 14l2 2 4-4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.7a3.5 3.5 0 010 6.6"/><path d="M18 14.3c2.2.7 3.5 2.6 3.5 5.7"/>',
    library: '<rect x="4" y="4" width="4" height="16" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><path d="M16 6l3.6-1 3 14-3.6 1z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 015 1c0 1.7-2.5 2-2.5 3.5"/><path d="M12 17.2v.1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    'half-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/>',
    circle: '<circle cx="12" cy="12" r="9"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
    message: '<path d="M4 4h16v12H10l-5 4v-4H4z"/>',
    'arrow-left': '<path d="M20 12H4"/><path d="M10 6l-6 6 6 6"/>',
    'arrow-right': '<path d="M4 12h16"/><path d="M14 6l6 6-6 6"/>',
    save: '<path d="M5 3h11l4 4v14H5z"/><path d="M8 3v5h7V3"/><path d="M8 21v-7h8v7"/>',
    send: '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 21l5-3 5 3-1.5-7"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17v.1"/>',
    download: '<path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>'
  };

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">';
  Object.keys(ICONS).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>';
  });
  sprite += '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);
  Array.prototype.forEach.call(document.querySelectorAll('svg.ic'), function (s) {
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
  });

  /* ---------- Almacenamiento seguro (puede fallar en file:// o modo privado) ---------- */
  function store(key, val) { try { if (val === undefined) { return localStorage.getItem(key); } localStorage.setItem(key, val); } catch (e) { return null; } return null; }

  /* ---------- Aviso (toast) ---------- */
  var toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.hidden = true;
  toastEl.innerHTML = '<span id="toast-msg" role="status" aria-live="polite"></span><button type="button">Cerrar</button>';
  document.body.appendChild(toastEl);
  var toastMsg = toastEl.querySelector('#toast-msg');
  toastEl.querySelector('button').addEventListener('click', function () { toastEl.hidden = true; });
  function toast(text) {
    toastEl.hidden = false;
    toastMsg.textContent = '';
    setTimeout(function () { toastMsg.textContent = text; }, 30);
  }

  /* ---------- Tamaño del texto A- / A+ ---------- */
  var SCALES = [1, 1.125, 1.25, 1.375];
  var NAMES = ['normal', 'grande', 'muy grande', 'máximo'];
  var level = parseInt(store('vym-fs'), 10);
  if (isNaN(level) || level < 0 || level >= SCALES.length) { level = 0; }
  var down = document.getElementById('fs-down');
  var up = document.getElementById('fs-up');
  var live = document.getElementById('fs-state');
  function applyFs(announce) {
    document.documentElement.style.fontSize = (SCALES[level] * 100) + '%';
    if (down) { down.disabled = level === 0; }
    if (up) { up.disabled = level === SCALES.length - 1; }
    if (live && announce) { live.textContent = 'Tamaño del texto: ' + NAMES[level]; }
    store('vym-fs', String(level));
  }
  if (down) { down.addEventListener('click', function () { if (level > 0) { level--; applyFs(true); } }); }
  if (up) { up.addEventListener('click', function () { if (level < SCALES.length - 1) { level++; applyFs(true); } }); }
  applyFs(false);

  /* ---------- Elementos que no tienen pantalla en la maqueta ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-proto]');
    if (!el || el.tagName === 'FORM') { return; }
    var msg = el.getAttribute('data-proto') || ('«' + el.textContent.replace(/\s+/g, ' ').trim() + '» no forma parte de esta maqueta. Solo están las 4 pantallas del menú.');
    toast(msg);
  });
  Array.prototype.forEach.call(document.querySelectorAll('form[data-proto]'), function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); toast(f.getAttribute('data-proto')); });
  });

  /* ---------- Guardar borrador ---------- */
  var drafts = document.querySelectorAll('textarea[data-draft]');
  Array.prototype.forEach.call(drafts, function (t) {
    var saved = store('vym-draft-' + t.id);
    if (saved !== null) { t.value = saved; }
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-save]'), function (b) {
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(drafts, function (t) { store('vym-draft-' + t.id, t.value); });
      var d = new Date();
      var hm = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      toast('Guardado a las ' + hm + '. Puedes salir y continuar después.');
    });
  });

  /* ---------- Confirmación antes de enviar al mentor ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-open]'), function (b) {
    b.addEventListener('click', function () {
      var dlg = document.getElementById(b.getAttribute('data-open'));
      if (dlg && dlg.showModal) { dlg.returnValue = ''; dlg.showModal(); }
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('dialog'), function (dlg) {
    dlg.addEventListener('close', function () {
      if (dlg.returnValue === 'ok') { toast(dlg.getAttribute('data-done')); }
    });
  });
})();
