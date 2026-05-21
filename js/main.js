// ── CAROUSEL ──
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots   = document.querySelectorAll('.dot');

        function showSlide(n) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        function nextSlide() { showSlide(currentSlide + 1); }
        const autoplay = setInterval(nextSlide, 6500);
        dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(autoplay); showSlide(i); }));

        // ── PETALS ──
        const petalContainer = document.getElementById('petalContainer');
        const petalColors = [
            'rgba(238,165,233,0.55)',
            'rgba(168,230,214,0.5)',
            'rgba(203,174,242,0.55)',
            'rgba(183,240,245,0.5)',
            'rgba(240,201,130,0.45)',
            'rgba(244,145,143,0.45)',
        ];
        for (let i = 0; i < 22; i++) {
            const p = document.createElement('div');
            p.className = 'petal';
            const size = 8 + Math.random() * 14;
            p.style.cssText = `
                --ps: ${size}px;
                --pd: ${6 + Math.random() * 10}s;
                --delay: ${Math.random() * 12}s;
                left: ${Math.random() * 100}%;
                background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50% 50% 50% 0' : '50% 0 50% 50%'};
                transform: rotate(${Math.random() * 360}deg);
            `;
            petalContainer.appendChild(p);
        }

        // ── SCROLL REVEAL ──
        const revealEls = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // LOGICA DEL MENU LATERAL (DRAWER)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const heartBtn      = document.getElementById('heartBtn');
        const drawer        = document.getElementById('drawer');
        const drawerOverlay = document.getElementById('drawerOverlay');
        const drawerClose   = document.getElementById('drawerClose');

        function openDrawer() {
            drawer.classList.add('open');
            drawerOverlay.classList.add('open');
            heartBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('open');
            heartBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        heartBtn.addEventListener('click', openDrawer);
        drawerClose.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);
        document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

        // ── SMOOTH SCROLL ──
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        });
