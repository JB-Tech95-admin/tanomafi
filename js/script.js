// Variables globales
let isScrolling = false;

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Fonction d'initialisation principale
function initializeApp() {
  setupNavigation();
  setupScrollEffects();
  setupGalleryFilters();
  setupProgressBars();
  setupCounters();
  setupContactForm();
  setupAnimations();
  setupMobileMenu();
}

// Configuration de la navigation
function setupNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Effet de scroll sur la navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });

  // Navigation fluide
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Fermer le menu mobile si ouvert
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove("active");
      }
    });
  });

  // Mise en surbrillance du lien actif
  window.addEventListener("scroll", highlightActiveNavLink);
}

// Menu mobile
function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Fermer le menu en cliquant sur un lien
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// Mise en surbrillance du lien de navigation actif
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Effets de scroll et animations
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");

        // Déclencher les animations spécifiques
        if (entry.target.classList.contains("progress-bar")) {
          animateProgressBar(entry.target);
        }

        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec animation
  document
    .querySelectorAll("[data-aos], .action-card, .gallery-item, .stat-item")
    .forEach((el) => {
      el.classList.add("loading");
      observer.observe(el);
    });
}

// Configuration des filtres de galerie
function setupGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.classList.remove("hidden");
          setTimeout(() => {
            item.style.display = "block";
          }, 10);
        } else {
          item.classList.add("hidden");
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none";
            }
          }, 300);
        }
      });
    });
  });

  // Effet de clic sur les images de galerie
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector("h4").textContent;
      const description = item.querySelector("p").textContent;

      showImageModal(img.src, title, description);
    });
  });
}

// Modal pour les images de galerie
function showImageModal(src, title, description) {
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Styles pour le modal
  const style = document.createElement("style");
  style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            background: rgba(0, 0, 0, 0.9);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            max-width: 800px;
            max-height: 90vh;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-content img {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;

  document.head.appendChild(style);

  // Fermer le modal
  const closeModal = () => {
    modal.remove();
    style.remove();
  };

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-overlay").addEventListener("click", (e) => {
    if (e.target === modal.querySelector(".modal-overlay")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// Animation des barres de progression
function setupProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach((bar) => {
    bar.style.width = "0%";
  });
}

function animateProgressBar(progressBar) {
  const targetWidth = progressBar.getAttribute("data-progress");

  setTimeout(() => {
    progressBar.style.width = targetWidth + "%";
  }, 500);
}

// Animation des compteurs
function setupCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    counter.textContent = "0";
  });
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counter.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Configuration du formulaire de contact
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  // Validation en temps réel
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      }
    });
  });

  // Soumission du formulaire
  form.addEventListener("submit", handleFormSubmit);
}

// Validation des champs
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Validation selon le type de champ
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      break;
    case "text":
    case "textarea":
      isValid = value.length >= 2;
      break;
    default:
      isValid = value.length > 0;
  }

  // Appliquer les classes de validation
  if (isValid) {
    field.classList.remove("error");
    field.classList.add("success");
  } else {
    field.classList.remove("success");
    field.classList.add("error");
  }

  return isValid;
}

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  let isFormValid = true;

  // Valider tous les champs
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    // Simuler l'envoi du formulaire
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification("Message envoyé avec succès !", "success");
      form.reset();
      inputs.forEach((input) => {
        input.classList.remove("success", "error");
      });

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  } else {
    showNotification(
      "Veuillez corriger les erreurs dans le formulaire.",
      "error"
    );
  }
}

// Affichage des notifications
function showNotification(message, type = "success") {
  // Supprimer les notifications existantes
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Afficher la notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Masquer la notification après 4 secondes
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Configuration des animations générales
function setupAnimations() {
  // Animation du bouton CTA
  const ctaButton = document.getElementById("cta-button");

  ctaButton.addEventListener("click", () => {
    // Scroll vers la section actions
    const actionsSection = document.getElementById("actions");
    const offsetTop = actionsSection.offsetTop - 70;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Effet de clic
    ctaButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      ctaButton.style.transform = "scale(1)";
    }, 150);
  });

  // Animation des feuilles flottantes
  animateFloatingLeaves();

  // Parallax effect pour le hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (hero && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Animation des feuilles flottantes
function animateFloatingLeaves() {
  const leaves = document.querySelectorAll(".leaf");

  leaves.forEach((leaf, index) => {
    // Animation aléatoire pour chaque feuille
    setInterval(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const randomRotate = Math.random() * 360;

      leaf.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    }, 3000 + index * 1000);
  });
}

// Effet de typing pour le titre hero
function setupTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 1000);
}

// Gestion du thème sombre (optionnel)
function setupThemeToggle() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 1000;
        transition: var(--transition);
    `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-theme")) {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  });
}

// Lazy loading pour les images
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Gestion des erreurs d'images
function setupImageErrorHandling() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Image+Non+Disponible";
      this.alt = "Image non disponible";
    });
  });
}

// Performance: Debounce pour les événements de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimisation des événements de scroll
const optimizedScrollHandler = debounce(() => {
  highlightActiveNavLink();
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Gestion du redimensionnement de la fenêtre
window.addEventListener(
  "resize",
  debounce(() => {
    // Recalculer les positions si nécessaire
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      item.style.transition = "none";
      setTimeout(() => {
        item.style.transition = "var(--transition)";
      }, 100);
    });
  }, 250)
);

// Préchargement des images critiques
function preloadCriticalImages() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialisation du préchargement
preloadCriticalImages();

// Analytics et suivi (optionnel)
function trackUserInteraction(action, element) {
  // Ici vous pouvez ajouter votre code de suivi analytics
  console.log(`Action: ${action}, Element: ${element}`);
}

// Ajouter le suivi aux éléments interactifs
document.addEventListener("click", (e) => {
  if (e.target.matches(".cta-button")) {
    trackUserInteraction("cta_click", "hero_button");
  }

  if (e.target.matches(".filter-btn")) {
    trackUserInteraction("filter_click", e.target.textContent);
  }

  if (e.target.matches(".submit-btn")) {
    trackUserInteraction("form_submit", "contact_form");
  }
});

// Gestion de l'état de connexion (PWA ready)
window.addEventListener("online", () => {
  showNotification("Connexion rétablie", "success");
});

window.addEventListener("offline", () => {
  showNotification("Connexion perdue - Mode hors ligne", "error");
});

// Service Worker pour PWA (optionnel)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Fonction utilitaire pour smooth scroll personnalisé
function smoothScrollTo(target, duration = 1000) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.offsetTop - 70;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Initialisation complète
console.log("🌱 Site environnemental initialisé avec succès !");
