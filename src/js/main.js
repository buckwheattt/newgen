// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // close mobile menu after navigation
                const navMenu = document.getElementById('navMenu');
                navMenu?.classList.remove('nav__menu--open');
            }
        }
    }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('nav__menu--open');
        navMenu.style.display = navMenu.classList.contains('nav__menu--open') ? 'flex' : '';
    });
}

// Modal open/close
function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('modal--open');
    m.setAttribute('aria-hidden', 'false');
}
function closeModal(el) {
    const m = el.closest('.modal');
    m?.classList.remove('modal--open');
    m?.setAttribute('aria-hidden', 'true');
}
document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    const closeBtn = e.target.closest('[data-modal-close]');
    if (openBtn) { openModal(openBtn.dataset.modalOpen); }
    if (closeBtn) { closeModal(closeBtn); }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.modal--open').forEach(m => {
            m.classList.remove('modal--open');
            m.setAttribute('aria-hidden', 'true');
        });
    }
});

// Simple client-side validation demo
function wireForm(id) {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);
        console.log('Form submitted', Object.fromEntries(formData));
        alert('Thank you! We will contact you shortly.');
        form.reset();
    });
}
wireForm('orderForm');
wireForm('quickForm');
