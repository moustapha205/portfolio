// ===============================
// 📱 MENU HAMBURGER - VERSION CORRECTE
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');

  console.log('🔍 Éléments trouvés:', {
      hamburger: !!hamburger,
      navMenu: !!navMenu,
      navbar: !!navbar
  });

  // ===============================
  // 📱 MENU HAMBURGER
  // ===============================
  if (hamburger && navMenu) {
      console.log('✅ Menu hamburger trouvé');
      
      hamburger.addEventListener('click', function(e) {
          e.stopPropagation(); // Important pour mobile
          console.log('🖱️ Hamburger cliqué');
          navMenu.classList.toggle('active');
          hamburger.classList.toggle('active');
      });
      
      // Fermer le menu en cliquant sur un lien
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              navMenu.classList.remove('active');
              hamburger.classList.remove('active');
          });
      });
      
      // Fermer le menu en cliquant à l'extérieur
      document.addEventListener('click', function(e) {
          if (navMenu.classList.contains('active') && 
              !hamburger.contains(e.target) && 
              !navMenu.contains(e.target)) {
              navMenu.classList.remove('active');
              hamburger.classList.remove('active');
          }
      });
      
  } else {
      console.log('❌ Menu hamburger non trouvé');
  }

  // ===============================
  // 🧭 CHANGEMENT DE NAVBAR AU SCROLL
  // ===============================
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
  // ✨ ANIMATION APPARITION (FADE-IN)
  // ===============================
  const faders = document.querySelectorAll('.fade-in');

  if (faders.length > 0) {
      const appearOnScroll = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  entry.target.classList.add('appear');
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px"
      });

      faders.forEach(function(fader) {
          appearOnScroll.observe(fader);
      });
  }

  // ===============================
  // 📞 FORMULAIRE SIMPLE
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
  } else {
      console.log('❌ Formulaire NON trouvé!');
  }
});