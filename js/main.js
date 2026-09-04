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
}

// ── FLEET + CART
const WA_NUMBER = '526221763312';
const DISCOUNT = 0.10;
const FLEET = {
    chico:   { key: 'pkg.0.name', max: 1, hora: 1700, media: 1000 },
    mediano: { key: 'pkg.1.name', max: 3, hora: 1900, media: 1300 },
    grande:  { key: 'pkg.2.name', max: 1, hora: 2500, media: 1500 },
};
const cart = { chico: 0, mediano: 0, grande: 0 };
let currentDuration = 'media'; // 'hora' | 'media'

function money(n) { return '$' + n.toLocaleString('en-US'); }
function unitPrice(m) { return FLEET[m][currentDuration]; }

function recalcCart() {
    let subtotal = 0;
    for (const m in cart) {
        const up = unitPrice(m);
        const upEl = document.getElementById('up-' + m);
        const qEl  = document.getElementById('qty-' + m);
        if (upEl) upEl.textContent = money(up);
        if (qEl)  qEl.textContent = cart[m];
        subtotal += cart[m] * up;

        // reflect max / empty state on the row's stepper buttons
        const row = document.querySelector(`.cart-row[data-model="${m}"]`);
        if (row) {
            const btns = row.querySelectorAll('.qty-stepper button');
            btns[0].disabled = cart[m] <= 0;
            btns[1].disabled = cart[m] >= FLEET[m].max;
            row.classList.toggle('has-qty', cart[m] > 0);
        }
    }
    const discount = Math.round(subtotal * DISCOUNT);
    const total = subtotal - discount;
    const sSub = document.getElementById('sum-subtotal');
    const sDis = document.getElementById('sum-discount');
    const sTot = document.getElementById('sum-total');
    if (sSub) sSub.textContent = money(subtotal);
    if (sDis) sDis.textContent = '−' + money(discount);
    if (sTot) sTot.textContent = money(total);
}

function addUnit(m)    { if (cart[m] < FLEET[m].max) { cart[m]++; recalcCart(); } }
function removeUnit(m) { if (cart[m] > 0)            { cart[m]--; recalcCart(); } }

function selectDur(btn) {
    document.querySelectorAll('.exp-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    currentDuration = btn.dataset.dur;
    recalcCart();
}

// ── BOOKING MODAL
function openModal(modelo) {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (modelo && FLEET[modelo] && cart[modelo] < FLEET[modelo].max) {
        cart[modelo]++;
    }
    recalcCart();
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

    const totalUnits = cart.chico + cart.mediano + cart.grande;
    if (totalUnits === 0) {
        alert(currentLang === 'en' ? 'Add at least one jetski.' : 'Agrega al menos un jetski.');
        return;
    }

    let fechaFmt = fecha;
    if (fecha) {
        const [y, m, d] = fecha.split('-');
        fechaFmt = `${d}/${m}/${y}`;
    }
    const durLabel = currentDuration === 'hora' ? t('modal.dur.0') : t('modal.dur.1');

    let subtotal = 0;
    const lines = [];
    for (const m in cart) {
        if (cart[m] > 0) {
            const line = cart[m] * unitPrice(m);
            subtotal += line;
            lines.push(`- ${t(FLEET[m].key)} x${cart[m]} — ${money(line)}`);
        }
    }
    const discount = Math.round(subtotal * DISCOUNT);
    const total = subtotal - discount;

    const msg =
        `${t('wa.greeting')}\n\n` +
        `${t('wa.nombre')}: ${nombre}\n` +
        `${t('wa.fecha')}: ${fechaFmt}\n` +
        `${t('wa.duracion')}: ${durLabel}\n\n` +
        `${t('wa.jetskis')}:\n${lines.join('\n')}\n\n` +
        `${t('wa.subtotal')}: ${money(subtotal)}\n` +
        `${t('wa.discount')}: −${money(discount)}\n` +
        `${t('wa.total')}: ${money(total)}\n` +
        (notas ? `\n${t('wa.notas')}: ${notas}\n` : '') +
        `\n${t('wa.online')}\n` +
        `${t('wa.closing')}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();

    // reset cart for the next reservation
    for (const m in cart) cart[m] = 0;
    recalcCart();
}

// ── WHATSAPP SHORTCUTS (banana, sombras, fundas, general)
function waMsg(key, withDiscount) {
    let m = t(key);
    if (withDiscount) m += `\n\n${t('wa.online')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`, '_blank');
}
function bookGeneral() { waMsg('wa.general', false); }
function bookBanana()  { waMsg('wa.banana', true); }
function bookSombra()  { waMsg('wa.sombra', true); }
function bookFunda()   { waMsg('wa.funda', true); }

// ── EXPERIENCE CAROUSEL
let carIndex = 0;
const carTrack  = document.getElementById('carTrack');
const carSlides = carTrack ? Array.from(carTrack.children) : [];

function carRender() {
    if (!carTrack) return;
    carTrack.style.transform = `translateX(-${carIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === carIndex));
    // only play the visible video
    carSlides.forEach((slide, i) => {
        const v = slide.querySelector('video');
        if (!v) return;
        if (i === carIndex) { v.play().catch(() => {}); }
        else { v.pause(); }
    });
}

function carGo(i) {
    if (!carSlides.length) return;
    carIndex = (i + carSlides.length) % carSlides.length;
    carRender();
}

function carMove(dir) { carGo(carIndex + dir); }

function carInit() {
    if (!carTrack || !carSlides.length) return;
    const dots = document.getElementById('carDots');
    if (dots) {
        carSlides.forEach((_, i) => {
            const b = document.createElement('button');
            b.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            b.setAttribute('aria-label', `Ir al video ${i + 1}`);
            b.onclick = () => carGo(i);
            dots.appendChild(b);
        });
    }
    carRender();
}

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

    // experience carousel
    carInit();

    // cart initial state
    recalcCart();
});
