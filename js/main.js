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
function openModal(modelo) {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (modelo) {
        const map = { chico: 'Chico', mediano: 'Mediano', grande: 'Grande' };
        const sel = document.getElementById('f-modelo');
        if (sel && map[modelo]) sel.value = map[modelo];
    }

    setTimeout(() => document.getElementById('f-nombre')?.focus(), 350);
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('open');
    document.body.style.overflow = '';
}

function selectDur(btn) {
    document.querySelectorAll('.exp-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('f-duracion').value = btn.dataset.val;
}

function submitBooking(e) {
    e.preventDefault();
    const nombre   = document.getElementById('f-nombre').value.trim();
    const modelo   = document.getElementById('f-modelo').value;
    const duracion = document.getElementById('f-duracion').value;
    const fecha    = document.getElementById('f-fecha').value;
    const personas = document.getElementById('f-personas').value;

    if (!duracion) {
        alert(currentLang === 'en' ? 'Please choose a duration.' : 'Elige una duración.');
        return;
    }

    let fechaFmt = fecha;
    if (fecha) {
        const [y, m, d] = fecha.split('-');
        fechaFmt = `${d}/${m}/${y}`;
    }

    const msg =
        `${t('wa.greeting')}\n\n` +
        `${t('wa.nombre')}: ${nombre}\n` +
        `${t('wa.modelo')}: ${modelo}\n` +
        `${t('wa.duracion')}: ${duracion}\n` +
        `${t('wa.fecha')}: ${fechaFmt}\n` +
        `${t('wa.personas')}: ${personas}\n\n` +
        `${t('wa.closing')}`;

    window.open(`https://wa.me/526221763312?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
}

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
});
