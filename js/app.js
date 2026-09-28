/* ============================================
   FENBO · РЫНОК · ОБЩИЙ СКРИПТ (новый)
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
   Работают у любых элементов с data-end
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
            el.style.color = '#767e8b';
            return;
        }

        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        if (days > 0) {
            el.textContent = days + 'д ' + pad(hours) + ':' + pad(minutes);
        } else if (hours > 0) {
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
   КЛИКИ ПО КАРТОЧКАМ (заглушка до лайтбоксов)
   ============================================ */
(function cardClicks() {
    /* Аукционы — полосы */
    document.querySelectorAll('.auction-row').forEach(row => {
        row.addEventListener('click', e => {
            e.preventDefault();
            const title = row.dataset.title || 'Работа';
            const author = row.dataset.author || 'Аноним';
            const bid = row.dataset.bid || '—';
            alert('🔴 АУКЦИОН\n\nРабота: ' + title + '\nАвтор: ' + author + '\nТекущая ставка: ' + bid + ' FEN\n\n(Здесь будет лайтбокс со ставками)');
        });
    });

    /* Ючи — строки таблицы */
    document.querySelectorAll('.ych-row').forEach(row => {
        row.addEventListener('click', e => {
            e.preventDefault();
            const title = row.dataset.title || 'YCH';
            const author = row.dataset.author || 'Аноним';
            const slots = row.dataset.slots || '?';
            alert('🎟️ YCH\n\nРабота: ' + title + '\nАвтор: ' + author + '\nСвободных слотов: ' + slots + '\n\n(Здесь будет лайтбокс с записью на слот)');
        });
    });

    /* Арты — плитки */
    document.querySelectorAll('.art-tile').forEach(tile => {
        tile.addEventListener('click', e => {
            e.preventDefault();
            const title = tile.dataset.title || 'Работа';
            const author = tile.dataset.author || 'Аноним';
            const price = tile.dataset.price || '—';
            alert('🎨 АРТ\n\nРабота: ' + title + '\nАвтор: ' + author + '\nЦена: ' + price + ' FEN\n\n(Здесь будет лайтбокс с заказом)');
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
            const href = a.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) return;
            e.preventDefault();
            document.querySelectorAll('.topbar-nav a').forEach(x => x.classList.remove('active'));
            a.classList.add('active');
        });
    });

    /* Фильтры (если есть на странице) */
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
})();
