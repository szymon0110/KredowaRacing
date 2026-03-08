// 1. Scroll do góry przy odświeżeniu
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// 2. Obsługa Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// 3. Logika Liczników i Pasków Postępu
// Zmieniono na Quint dla jeszcze delikatniejszego finiszu
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const progressBar = counter.parentElement.querySelector('.progress-bar');
    
    // WYDŁUŻONY CZAS: Baza 2s + dodatkowy czas zależny od wielkości liczby
    const dynamicDuration = 2000 + (target * 12); 
    let startTime = null;

    const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / dynamicDuration, 1);
        const easedProgress = easeOutQuint(progress);
        
        // Aktualizacja cyfr
        counter.innerText = Math.floor(easedProgress * target);
        
        // Aktualizacja paska
        if (progressBar) {
            progressBar.style.width = `${easedProgress * 100}%`;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
            if (progressBar) progressBar.style.width = '100%';
        }
    };
    requestAnimationFrame(updateCount);
};

// 4. Observer - uruchamia animację, gdy sekcja pojawi się na ekranie
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));

// 5. Obsługa Formularza
document.getElementById('racingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Dziękujemy! Twoje zgłoszenie zostało wysłane.');
    e.target.reset();
});