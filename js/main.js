// ── LANG
let currentLang = 'es';

function t(key) {
    return TRANSLATIONS[currentLang][key] ?? key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (val !== undefined) el.innerHTML = val;
    });

    // select options need special handling via data-i18n-val
    document.querySelectorAll('[data-i18n-val]').forEach(el => {
        const key = el.dataset.i18nVal;
        const val = t(key);
        if (val !== undefined) el.textContent = val;
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const val = t(key);
        if (val !== undefined) el.placeholder = val;
    });
}

function setLang(lang) {
    currentLang = lang;
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.documentElement.lang = lang;
    applyTranslations();
    if (typeof renderBanana === 'function') renderBanana();
}

// ── FLEET + CART (one line per vehicle: model, duration, time — all independent)
const WA_NUMBER = '526221763312';
const DISCOUNT = 0.10;
const FLEET = {
    chico:   { key: 'pkg.0.name', max: 1, hora: 1700, media: 1000 },
    mediano: { key: 'pkg.1.name', max: 3, hora: 1900, media: 1300 },
    grande:  { key: 'pkg.2.name', max: 1, hora: 2500, media: 1500 },
};
const MODEL_ORDER = ['mediano', 'chico', 'grande'];
const FLEET_TOTAL = MODEL_ORDER.reduce((n, m) => n + FLEET[m].max, 0); // 5

let vehicles = [];   // [{ id, model, dur:'hora'|'media', hora:'HH:MM' }]
let vehSeq = 0;

function money(n) { return '$' + n.toLocaleString('en-US'); }
function unitPrice(model, dur) { return FLEET[model][dur]; }
function durLabel(dur) { return dur === 'hora' ? t('modal.dur.0') : t('modal.dur.1'); }
function countModel(model, exceptId) {
    return vehicles.filter(v => v.model === model && v.id !== exceptId).length;
}
function firstAvailableModel() {
    return MODEL_ORDER.find(m => countModel(m, null) < FLEET[m].max) || null;
}

function vehCardHTML(v, idx) {
    const modelOpts = MODEL_ORDER.map(m => {
        const disabled = m !== v.model && countModel(m, v.id) >= FLEET[m].max;
        return `<option value="${m}"${v.model === m ? ' selected' : ''}${disabled ? ' disabled' : ''}>${t(FLEET[m].key)}</option>`;
    }).join('');
    const durOpts =
        `<option value="media"${v.dur === 'media' ? ' selected' : ''}>${t('modal.dur.1')}</option>` +
        `<option value="hora"${v.dur === 'hora' ? ' selected' : ''}>${t('modal.dur.0')}</option>`;
    const price = unitPrice(v.model, v.dur);
    return `
    <div class="veh-card">
        <div class="veh-head">
            <span class="veh-title">${t('veh.label')} ${idx + 1}</span>
            <button type="button" class="veh-del" onclick="removeVehicle('${v.id}')" aria-label="${t('veh.remove')}">✕</button>
        </div>
        <div class="veh-fields">
            <label class="veh-f veh-f-model">
                <span>${t('veh.model')}</span>
                <select class="form-select" onchange="setVeh('${v.id}','model',this.value)">${modelOpts}</select>
            </label>
            <label class="veh-f">
                <span>${t('veh.dur')}</span>
                <select class="form-select" onchange="setVeh('${v.id}','dur',this.value)">${durOpts}</select>
            </label>
            <label class="veh-f">
                <span>${t('veh.hora')}</span>
                <input type="time" class="form-input" value="${v.hora || ''}" onchange="setVeh('${v.id}','hora',this.value)" />
            </label>
        </div>
        <div class="veh-price"><span>${t(FLEET[v.model].key)} · ${durLabel(v.dur)}</span><strong>${money(price)}</strong></div>
    </div>`;
}

function renderCart() {
    const list = document.getElementById('vehList');
    if (!list) return;

    list.innerHTML = vehicles.length
        ? vehicles.map(vehCardHTML).join('')
        : `<div class="veh-empty">${t('veh.empty')}</div>`;

    let subtotal = 0;
    vehicles.forEach(v => subtotal += unitPrice(v.model, v.dur));
    const discount = Math.round(subtotal * DISCOUNT);
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('sum-subtotal', money(subtotal));
    setTxt('sum-discount', '−' + money(discount));
    setTxt('sum-total', money(subtotal - discount));

    const addBtn = document.querySelector('.veh-add');
    if (addBtn) addBtn.disabled = vehicles.length >= FLEET_TOTAL;
}

function addVehicle(model) {
    let m = (model && FLEET[model] && countModel(model, null) < FLEET[model].max) ? model : firstAvailableModel();
    if (!m) return; // all inventory in the cart
    vehicles.push({ id: 'v' + (++vehSeq), model: m, dur: 'media', hora: '' });
    renderCart();
}

function removeVehicle(id) {
    vehicles = vehicles.filter(v => v.id !== id);
    renderCart();
}

// apply one shared duration + time to every vehicle (keeps per-vehicle editing available)
function applyToAll() {
    if (vehicles.length === 0) return;
    const dur  = document.getElementById('bulk-dur').value;
    const hora = document.getElementById('bulk-hora').value;
    vehicles.forEach(v => { v.dur = dur; if (hora) v.hora = hora; });
    renderCart();
}

function setVeh(id, field, value) {
    const v = vehicles.find(x => x.id === id);
    if (!v) return;
    if (field === 'model' && countModel(value, id) >= FLEET[value].max) { renderCart(); return; }
    v[field] = value;
    renderCart();
}

// ── BOOKING MODAL
function openModal(model) {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (model && FLEET[model]) addVehicle(model);
    else if (vehicles.length === 0) addVehicle();
    renderCart();
    setTimeout(() => document.getElementById('f-nombre')?.focus(), 350);
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('open');
    document.body.style.overflow = '';
}

function submitBooking(e) {
    e.preventDefault();
    const nombre = document.getElementById('f-nombre').value.trim();
    const fecha  = document.getElementById('f-fecha').value;
    const notas  = document.getElementById('f-notas').value.trim();

    if (vehicles.length === 0) {
        alert(currentLang === 'en' ? 'Add at least one vehicle.' : 'Agrega al menos un vehículo.');
        return;
    }

    let fechaFmt = fecha;
    if (fecha) {
        const [y, m, d] = fecha.split('-');
        fechaFmt = `${d}/${m}/${y}`;
    }

    let subtotal = 0;
    const lines = vehicles.map((v, i) => {
        const p = unitPrice(v.model, v.dur);
        subtotal += p;
        const hora = v.hora ? v.hora : t('veh.tbd');
        return `${i + 1}) ${t(FLEET[v.model].key)} · ${durLabel(v.dur)} · ${t('wa.hora')} ${hora} — ${money(p)}`;
    });
    const discount = Math.round(subtotal * DISCOUNT);
    const total = subtotal - discount;

    const msg =
        `${t('wa.greeting')}\n\n` +
        `${t('wa.nombre')}: ${nombre}\n` +
        `${t('wa.fecha')}: ${fechaFmt}\n\n` +
        `${t('wa.jetskis')}:\n${lines.join('\n')}\n\n` +
        `${t('wa.subtotal')}: ${money(subtotal)}\n` +
        `${t('wa.discount')}: −${money(discount)}\n` +
        `${t('wa.total')}: ${money(total)}\n` +
        (notas ? `\n${t('wa.notas')}: ${notas}\n` : '') +
        `\n${t('wa.online')}\n` +
        `${t('wa.closing')}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();

    // reset for the next reservation
    vehicles = [];
    renderCart();
}

// ── WHATSAPP SHORTCUTS (sombras, fundas, general)
function waMsg(key, withDiscount) {
    let m = t(key);
    if (withDiscount) m += `\n\n${t('wa.online')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`, '_blank');
}
function bookGeneral() { waMsg('wa.general', false); }
function bookSombra()  { waMsg('wa.sombra', true); }
function bookFunda()   { waMsg('wa.funda', true); }

// ── BANANA CART ($100/persona · mínimo $500 = 5 lugares · máx 7)
const BANANA_PP = 100, BANANA_MIN = 500, BANANA_MAX = 7;
let bananaPeople = 5;
function bananaCost(n) { return Math.max(n * BANANA_PP, BANANA_MIN); }
function renderBanana() {
    const q = document.getElementById('bc-qty');
    if (!q) return;
    q.textContent = bananaPeople;
    document.getElementById('bc-total').textContent = money(bananaCost(bananaPeople));
    const note = document.getElementById('bc-note');
    if (note) note.innerHTML = bananaPeople < 5 ? t('bcart.note.min') : t('bcart.note.ok');
    const btns = document.querySelectorAll('.bc-stepper button');
    if (btns.length === 2) {
        btns[0].disabled = bananaPeople <= 1;
        btns[1].disabled = bananaPeople >= BANANA_MAX;
    }
}
function bananaQty(d) {
    bananaPeople = Math.min(BANANA_MAX, Math.max(1, bananaPeople + d));
    renderBanana();
}
function bookBanana() {
    const n = bananaPeople, cost = bananaCost(n);
    let msg = `${t('wa.banana.head')}\n` +
        `${t('wa.personas')}: ${n}\n` +
        `${t('wa.banana.costlbl')}: ${money(cost)}`;
    if (n < 5) msg += `\n${t('wa.banana.min')}`;
    msg += `\n\n${t('wa.online')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── CAROUSELS (generic — supports multiple .carousel blocks: experience + banana gallery)
function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;
    const dotsWrap = root.querySelector('.carousel-dots');
    let idx = 0;

    function render() {
        track.style.transform = `translateX(-${idx * 100}%)`;
        if (dotsWrap) Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === idx));
        slides.forEach((s, i) => {
            const v = s.querySelector('video');
            if (v) { i === idx ? v.play().catch(() => {}) : v.pause(); }
        });
    }
    function go(i) { idx = (i + slides.length) % slides.length; render(); }

    root.querySelectorAll('.carousel-btn.prev').forEach(b => b.onclick = () => go(idx - 1));
    root.querySelectorAll('.carousel-btn.next').forEach(b => b.onclick = () => go(idx + 1));

    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            b.setAttribute('aria-label', 'Ir a ' + (i + 1));
            b.onclick = () => go(i);
            dotsWrap.appendChild(b);
        });
    }

    // image-only galleries auto-advance; video carousels don't (videos autoplay)
    const hasVideo = slides.some(s => s.querySelector('video'));
    if (!hasVideo && slides.length > 1) setInterval(() => go(idx + 1), 4500);

    render();
}
function initCarousels() { document.querySelectorAll('.carousel').forEach(initCarousel); }

// ── HIDE HERO PLACEHOLDER WHEN VIDEO LOADS
const heroVideo = document.querySelector('.hero-video');
const heroPh    = document.getElementById('heroPh');
if (heroVideo) {
    heroVideo.addEventListener('loadeddata', () => { if (heroPh) heroPh.style.display = 'none'; });
    if (heroVideo.readyState >= 3 && heroPh) heroPh.style.display = 'none';
}

// ── SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
}, { threshold: 0.10 });
document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

// ── NAV compact on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) nav.style.padding = window.scrollY > 60 ? '10px var(--gutter)' : '16px var(--gutter)';
});

// ── INIT
document.addEventListener('DOMContentLoaded', () => {
    // ESC + backdrop close
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    document.getElementById('bookingModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // fecha min = hoy
    const fechaInput = document.getElementById('f-fecha');
    if (fechaInput) fechaInput.min = new Date().toISOString().split('T')[0];

    // apply default language
    setLang('es');

    // carousels (experience + banana gallery)
    initCarousels();

    // cart initial states
    renderCart();
    renderBanana();
});
