// ===============================
// 📱 MENU HAMBURGER - FONCTIONNEL
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script JavaScript chargé');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    console.log('✅ Éléments trouvés:', {
        hamburger: hamburger !== null,
        navMenu: navMenu !== null,
        menuOverlay: menuOverlay !== null
    });

    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
        console.log('🎯 Menu cliqué - changement d\'état');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Clic sur le hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Clic sur l'overlay pour fermer
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            toggleMenu();
        });
    }

    // Clic sur les liens pour fermer le menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fermer le menu si on redimensionne l'écran
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ===============================
    // 🧭 CHANGEMENT DE NAVBAR AU SCROLL
    // ===============================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = "#0d1117";
                navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.4)";
            } else {
                navbar.style.backgroundColor = "#161b22";
                navbar.style.boxShadow = "none";
            }
        });
    }

    // ===============================
    // 📞 FORMULAIRE DE CONTACT
    // ===============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log('✅ Formulaire trouvé!');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log('📝 Données:', { name, email, subject, message });
            
            // Vérifier que tous les champs sont remplis
            if (!name || !email || !subject || !message) {
                alert('❌ Veuillez remplir tous les champs');
                return;
            }
            
            // Message de confirmation
            alert('✅ Merci ' + name + '! Votre message a été envoyé.\nJe vous répondrai rapidement à: ' + email);
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
});