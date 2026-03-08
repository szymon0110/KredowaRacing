{
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

            // 3. Liczniki z efektem Ease-Out Quart
            const counters = document.querySelectorAll('.counter');
            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const startCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                const dynamicDuration = 800 + (target * 10); 
                let startTime = null;

                const updateCount = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    let progress = Math.min(elapsed / dynamicDuration, 1);
                    const easedProgress = easeOutQuart(progress);
                    
                    counter.innerText = Math.floor(easedProgress * target);

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                requestAnimationFrame(updateCount);
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));

            // 4. Obsługa Formularza
            document.getElementById('racingForm').addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Dziękujemy! Twoje zgłoszenie zostało wysłane.');
                e.target.reset();
            });
        }