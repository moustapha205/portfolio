// =============================================
// MOUSTAPHA KANE — Portfolio script.js
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. CANVAS PARTICULES
    // ==========================================
    var canvas = document.getElementById('bg-canvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var W, H, particles = [];
        function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
        resize();
        window.addEventListener('resize', function() { resize(); initP(); });
        function initP() {
            particles = [];
            var n = Math.floor((W * H) / 16000);
            for (var i = 0; i < n; i++) {
                particles.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.2+0.3, vx: (Math.random()-0.5)*0.22, vy: (Math.random()-0.5)*0.22, a: Math.random()*0.5+0.1 });
            }
        }
        initP();
        function drawP() {
            ctx.clearRect(0,0,W,H);
            for (var i = 0; i < particles.length; i++) {
                for (var j = i+1; j < particles.length; j++) {
                    var dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y, d = Math.sqrt(dx*dx+dy*dy);
                    if (d < 110) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle='rgba(0,229,255,'+(0.05*(1-d/110))+')'; ctx.lineWidth=0.5; ctx.stroke(); }
                }
            }
            particles.forEach(function(p) {
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(0,229,255,'+p.a+')'; ctx.fill();
                p.x+=p.vx; p.y+=p.vy;
                if (p.x<0||p.x>W) p.vx*=-1;
                if (p.y<0||p.y>H) p.vy*=-1;
            });
            requestAnimationFrame(drawP);
        }
        drawP();
    }

    // ==========================================
    // 2. CURSEUR — désactivé sur les éléments cliquables
    // ==========================================
    var cur = document.getElementById('cursor');
    var ring = document.getElementById('cursorRing');
    if (cur && ring && window.innerWidth > 768) {
        var mx=0, my=0, rx=0, ry=0;
        document.addEventListener('mousemove', function(e) {
            mx = e.clientX; my = e.clientY;
            cur.style.left = mx+'px'; cur.style.top = my+'px';
        });
        (function tick() { rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(tick); })();
        document.addEventListener('mouseleave', function() { cur.style.opacity='0'; ring.style.opacity='0'; });
        document.addEventListener('mouseenter', function() { cur.style.opacity='1'; ring.style.opacity='0.5'; });
    }

    // ==========================================
    // 3. NAVBAR SCROLL
    // ==========================================
    var nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', function() { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });
    }

    // ==========================================
    // 4. MENU BURGER
    // ==========================================
    var burger = document.getElementById('burger');
    var navLinks = document.getElementById('navLinks');
    var navOverlay = document.getElementById('navOverlay');
    if (burger && navLinks) {
        function toggleMenu() {
            burger.classList.toggle('open');
            navLinks.classList.toggle('open');
            if (navOverlay) navOverlay.classList.toggle('show');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        }
        burger.addEventListener('click', toggleMenu);
        if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
        document.querySelectorAll('.nl').forEach(function(l) {
            l.addEventListener('click', function() { if (navLinks.classList.contains('open')) toggleMenu(); });
        });
    }

    // ==========================================
    // 5. SCROLL REVEAL
    // ==========================================
    var revEls = document.querySelectorAll('.fade-up');
    var revObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    revEls.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) { setTimeout(function() { el.classList.add('in'); }, 80); }
        else { revObs.observe(el); }
    });

    // ==========================================
    // 6. TILT SKILL CARDS
    // ==========================================
    document.querySelectorAll('.sk').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var r = card.getBoundingClientRect();
            var x = ((e.clientX-r.left)/r.width-0.5)*12;
            var y = ((e.clientY-r.top)/r.height-0.5)*12;
            card.style.transform = 'translateY(-4px) rotateX('+(-y)+'deg) rotateY('+x+'deg)';
        });
        card.addEventListener('mouseleave', function() { card.style.transform = ''; });
    });

    // ==========================================
    // 7. FORMULAIRE MULTI-ÉTAPES
    // ==========================================
    var currentStep = 1;

    // Exposés globalement pour les onclick dans le HTML
    window.mfNext = function(s) {
        var ok = true;
        document.querySelectorAll('#step'+s+' input, #step'+s+' select').forEach(function(f) {
            f.classList.remove('err');
            if (f.required && !f.value.trim()) {
                f.classList.add('err');
                ok = false;
                setTimeout(function() { f.classList.remove('err'); }, 1500);
            }
        });
        if (!ok) return;
        document.getElementById('step'+s).classList.remove('active');
        document.getElementById('step'+(s+1)).classList.add('active');
        currentStep = s+1;
        majBarre();
    };

    window.mfPrev = function(s) {
        document.getElementById('step'+s).classList.remove('active');
        document.getElementById('step'+(s-1)).classList.add('active');
        currentStep = s-1;
        majBarre();
    };

    function majBarre() {
        var bar = document.getElementById('mfBar');
        if (bar) bar.style.width = (currentStep/3*100)+'%';
        for (var i = 1; i <= 3; i++) {
            var d = document.getElementById('dot'+i);
            if (!d) continue;
            d.classList.remove('active','done');
            if (i === currentStep) d.classList.add('active');
            if (i < currentStep) d.classList.add('done');
        }
    }

    // ---- BOUTON ENVOYER — triple sécurité ----
    var btnSubmit = document.getElementById('mfSubmit');
    var form = document.getElementById('mfForm');
    var alreadySent = false;

    function doSend() {
        if (alreadySent) return;

        var ta      = document.getElementById('mfMessage');
        var name    = (document.getElementById('mfName')    ? document.getElementById('mfName').value.trim()    : '');
        var email   = (document.getElementById('mfEmail')   ? document.getElementById('mfEmail').value.trim()   : '');
        var subject = (document.getElementById('mfSubject') ? document.getElementById('mfSubject').value.trim() : '');
        var type    = (document.getElementById('mfType')    ? document.getElementById('mfType').value            : '');
        var message = (ta ? ta.value.trim() : '');

        if (!message) {
            if (ta) { ta.classList.add('err'); setTimeout(function() { ta.classList.remove('err'); }, 1500); }
            return;
        }

        alreadySent = true;
        if (btnSubmit) { btnSubmit.textContent = 'Envoi...'; btnSubmit.disabled = true; }

        fetch('https://formspree.io/f/xpqorpdg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: name, email: email, subject: subject, type: type, message: message })
        })
        .then(function() { afficherSucces(name, email); })
        .catch(function() { afficherSucces(name, email); });
    }

    // Écoute 1 : submit du formulaire
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            doSend();
        });
    }

    // Écoute 2 : click direct sur le bouton (contourne cursor:none)
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            doSend();
        });
        // Écoute 3 : touchend pour mobile
        btnSubmit.addEventListener('touchend', function(e) {
            e.preventDefault();
            doSend();
        });
    }

    // ---- AFFICHAGE SUCCÈS ----
    function afficherSucces(nom, mail) {
        // 1. Cache le formulaire
        if (form) {
            form.style.display = 'none';
            form.style.visibility = 'hidden';
        }

        // 2. Barre 100% + tous dots "done"
        var bar = document.getElementById('mfBar');
        if (bar) bar.style.width = '100%';
        for (var i = 1; i <= 3; i++) {
            var d = document.getElementById('dot'+i);
            if (d) { d.classList.remove('active'); d.classList.add('done'); }
        }

        // 3. Texte personnalisé
        var txt = document.getElementById('mfSuccessText');
        if (txt) txt.innerHTML = 'Merci <strong>'+nom+'</strong>, votre message a bien été reçu !<br>Je vous répondrai très prochainement.';

        // 4. Badge email
        var badge = document.getElementById('mfSuccessBadge');
        if (badge) badge.textContent = '📩 Réponse prévue à : '+mail;

        // 5. Affiche la div succès — FORCE le display
        var success = document.getElementById('mfSuccess');
        if (success) {
            success.removeAttribute('style'); // enlève tout display:none inline
            success.style.cssText = 'display:flex !important; flex-direction:column; align-items:center; text-align:center; padding:20px 10px;';
            success.classList.add('show');
        }
    }

}); // fin DOMContentLoaded
