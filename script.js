
// Menu para celulares
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
});

// Fechar menu ao clicar em um link
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Ano automático
document.getElementById("year").textContent = new Date().getFullYear();

// Partículas mágicas
const particles = document.getElementById("particles");

for (let i = 0; i < 45; i++) {
  const particle = document.createElement("span");

  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 7 + "s";
  particle.style.animationDuration = (5 + Math.random() * 6) + "s";

  particles.appendChild(particle);
}

// Animações ao rolar a página
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});
