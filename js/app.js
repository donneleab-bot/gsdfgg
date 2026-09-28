/* ============================================
   FENBO · РЫНОК · ОБЩИЙ СКРИПТ
   ============================================ */

/* ============================================
   ПЫЛЬ (золотые частицы)
   ============================================ */
(function dustBg() {
    const c = document.getElementById('dustBg');
    if (!c) return;
    for (let i = 0; i < 30; i++) {
        const m = document.createElement('div');
        m.className = 'mote';
        const s = Math.random() * 2.5 + 1;
        m.style.width = s + 'px';
        m.style.height = s + 'px';
        m.style.left = (Math.random() * 100) + '%';
        m.style.bottom = '-10px';
        m.style.setProperty('--mx', (Math.random() * 80 - 40) + 'px');
        m.style.animationDuration = (Math.random() * 12 + 15) + 's';
        m.style.animationDelay = (Math.random() * 15) + 's';
        c.appendChild(m);
    }
})();

/* ============================================
   ТАЙМЕРЫ АУКЦИОНОВ
   Формат: data-end="2025-12-31T23:59:59" (или timestamp)
   ============================================ */
(function auctionTimers() {
    const timers = document.querySelectorAll('[data-end]');
    if (!timers.length) return;

    function pad(n) { return n < 10 ? '0' + n : n; }

    function updateTimer(el) {
        const endStr = el.dataset.end;
        const endTime = new Date(endStr).getTime();
        const now = Date.now();
        let diff = Math.floor((endTime - now) / 1000);

        if (diff <= 0) {
            el.textContent = 'ЗАВЕРШЁН';
            el.style.color = '#888';
            return;
        }

        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        if (hours > 0) {
            el.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        } else {
            el.textContent = pad(minutes) + ':' + pad(seconds);
        }
    }

    function tick() {
        timers.forEach(el => updateTimer(el));
    }

    tick();
    setInterval(tick, 1000);
})();

/* ============================================
   КЛИКИ ПО КАРТОЧКАМ (заглушка)
   ============================================ */
(function cardClicks() {
    /* Аукционы */
    document.querySelectorAll('.auction-card').forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault();
            const title = card.dataset.title || 'Работа';
            const author = card.dataset.author || 'Аноним';
            const bid = card.dataset.bid || '—';
            alert(`🔴 АУКЦИОН\n\nРабота: ${title}\nАвтор: ${author}\nТекущая ставка: ${bid} FEN\n\n(Здесь будет лайтбокс с торгами)`);
        });
    });

    /* Ючи */
    document.querySelectorAll('.ych-card').forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault();
            const title = card.dataset.title || 'YCH';
            const author = card.dataset.author || 'Аноним';
            const slots = card.dataset.slots || '?';
            alert(`🎟️ YCH\n\nРабота: ${title}\nАвтор: ${author}\nСвободных слотов: ${slots}\n\n(Здесь будет лайтбокс с записью)`);
        });
    });

    /* Арты */
    document.querySelectorAll('.art-card').forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault();
            const title = card.dataset.title || 'Работа';
            const author = card.dataset.author || 'Аноним';
            const price = card.dataset.price || '—';
            alert(`🎨 АРТ\n\nРабота: ${title}\nАвтор: ${author}\nЦена: ${price} FEN\n\n(Здесь будет лайтбокс с заказом)`);
        });
    });
})();

/* ============================================
   ФИЛЬТРЫ И НАВИГАЦИЯ
   ============================================ */
(function navActive() {
    /* Пункты навигации */
    document.querySelectorAll('.topbar-nav a').forEach(a => {
        a.addEventListener('click', e => {
            /* Если ссылка ведёт на реальный href — оставляем переход */
            const href = a.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) return;
            e.preventDefault();
            document.querySelectorAll('.topbar-nav a').forEach(x => x.classList.remove('active'));
            a.classList.add('active');
        });
    });

    /* Фильтры (если есть) */
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
})();

/* ============================================
   ПРОКРУТКА КАРУСЕЛИ КОЛЕСОМ (по горизонтали)
   ============================================ */
(function horizontalScroll() {
    document.querySelectorAll('.auction-carousel').forEach(carousel => {
        carousel.addEventListener('wheel', e => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        }, { passive: false });
    });
})();

/* ============================================
   СЧЁТЧИК В ТАБЛО (анимация цифр при загрузке)
   ============================================ */
(function animateCounters() {
    const counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    counters.forEach(el => {
        const target = parseInt(el.dataset.countTo, 10);
        const duration = 1500;
        const start = performance.now();
        const startVal = 0;

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.floor(startVal + (target - startVal) * eased);
            el.textContent = val.toLocaleString('ru-RU');
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString('ru-RU');
        }
        requestAnimationFrame(step);
    });
})();
