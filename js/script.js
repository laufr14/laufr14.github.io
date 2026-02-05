const typedText = document.getElementById("typed-text");

// Detectar idioma según el <html lang="">
const currentLang = document.documentElement.lang;

// Palabras en inglés y español
const wordsEN = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "UI/UX Enthusiast"
];

const wordsES = [
  "Desarrolladora Frontend",
  "Desarrolladora Backend",
  "Desarrolladora Full-Stack",
  "Entusiasta de UI/UX"
];

// Seleccionar idioma
let words = currentLang === "es" ? wordsES : wordsEN;

// Variables para el efecto
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let speed = 100;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typedText.textContent = currentWord.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === currentWord.length) {
      isDeleting = true;
      speed = 1500; // Pausa al completar palabra
    }

  } else {
    typedText.textContent = currentWord.substring(0, letterIndex - 1);
    letterIndex--;
    speed = 60; // Velocidad al borrar

    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 200;
    }
  }

  setTimeout(typeEffect, speed);
}

// Iniciar animación al cargar la página
document.addEventListener("DOMContentLoaded", typeEffect);

// Filtrado de proyectos
const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {

      // Botón activo
      filters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.dataset.filter;

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  //Script para el modal de solicitud de CV

// ESPERAR A QUE CARGUE EL DOM 
document.addEventListener("DOMContentLoaded", function () {

  // ===== INIT EMAILJS =====
  emailjs.init("xKFXTla-zatfORixC");


  // ===== ABRIR MODAL =====
  window.openForm = function () {
    document.getElementById("cvForm").classList.add("show");
  };

  // ===== CERRAR MODAL =====
  window.closeForm = function () {

    document.getElementById("cvForm").classList.remove("show");

    document.getElementById("resumeForm").reset();
    document.getElementById("resumeForm").style.display = "block";
    document.getElementById("successMessage").style.display = "none";
  };


  // ===== ENVIAR FORMULARIO =====
  document.getElementById("resumeForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    emailjs.sendForm(
      "service_y3j87zr",
      "template_vi3u5kj",
      this
    ).then(function() {

      document.getElementById("resumeForm").style.display = "none";
      document.getElementById("successMessage").style.display = "block";

    }, function(error) {

      alert("Error al enviar la solicitud");
      console.log(error);

    });

  });


  // ===== CERRAR MODAL AL HACER CLICK FUERA =====
  window.onclick = function(event) {

    const modal = document.getElementById("cvForm");

    if (event.target === modal) {
      window.closeForm();
    }

  };

});

// Formulario de contacto 

document.getElementById("contactForm")
.addEventListener("submit", function(event){

  event.preventDefault();

  emailjs.sendForm(
    "service_y3j87zr",
    "template_vi3u5kj",
    this
  ).then(function(){

    document.getElementById("contactForm").style.display = "none";
    document.getElementById("contactSuccess").style.display = "block";

  });

});


//FUNCIÓN RESET 
function resetContactForm(){

  document.getElementById("contactForm").reset();
  document.getElementById("contactForm").style.display = "block";
  document.getElementById("contactSuccess").style.display = "none";

}

//BURGER MENU 

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");


menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Bloquear el scroll cuando el menú está abierto
  document.body.classList.toggle("menu-open");
});


navItems.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("click", (e) => {

  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

});
