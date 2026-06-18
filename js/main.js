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

// ── BOOKING MODAL
function openModal(paquete) {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (paquete) {
        const map = {
            pareja:  t('modal.paquete.0').replace(/^.*—\s*/, '').replace(/\s*\(.*/, '') ? 'Pesca VIP en Pareja'      : 'Pesca VIP en Pareja',
            familia: 'Aventura en Familia',
            amigos:  'Reto de Pesca con Amigos',
        };
        const sel = document.getElementById('f-paquete');
        if (sel && map[paquete]) sel.value = map[paquete];
    }

    setTimeout(() => document.getElementById('f-nombre')?.focus(), 350);
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('open');
    document.body.style.overflow = '';
}

function selectExp(btn) {
    document.querySelectorAll('.exp-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('f-experiencia').value = btn.dataset.val;
}

function submitBooking(e) {
    e.preventDefault();
    const nombre   = document.getElementById('f-nombre').value.trim();
    const paquete  = document.getElementById('f-paquete').value;
    const fecha    = document.getElementById('f-fecha').value;
    const hora     = document.getElementById('f-hora').value;
    const personas = document.getElementById('f-personas').value;
    const exp      = document.getElementById('f-experiencia').value;

    let fechaFmt = fecha;
    if (fecha) {
        const [y, m, d] = fecha.split('-');
        fechaFmt = `${d}/${m}/${y}`;
    }

    const msg =
        `${t('wa.greeting')}\n\n` +
        `${t('wa.nombre')}: ${nombre}\n` +
        `${t('wa.paquete')}: ${paquete}\n` +
        `${t('wa.fecha')}: ${fechaFmt}\n` +
        `${t('wa.hora')}: ${hora}\n` +
        `${t('wa.personas')}: ${personas}\n` +
        `${t('wa.exp')}: ${exp}\n\n` +
        `${t('wa.closing')}`;

    window.open(`https://wa.me/526221763312?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
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
});
