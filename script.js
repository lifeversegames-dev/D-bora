
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// MENU
const menuToggle = $("#menuToggle");
const navigation = $("#navigation");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navigation.classList.remove("open"));
});

// HEADER
window.addEventListener("scroll", () => {
  $(".header").classList.toggle("scrolled", window.scrollY > 40);
});

// ANO
$("#year").textContent = new Date().getFullYear();

// PARTÍCULAS
const particleContainer = $("#particles");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  for (let i = 0; i < 65; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const size = Math.random() * 3 + 1;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${9 + Math.random() * 16}s`;
    particle.style.animationDelay = `${-Math.random() * 20}s`;

    particleContainer.appendChild(particle);
  }
}

// ANIMAÇÃO AO ROLAR
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(element => observer.observe(element));

// MODAL DOS PERSONAGENS
const modal = $("#characterModal");

$$(".character-card").forEach(card => {
  card.querySelector(".details-button").addEventListener("click", () => {
    $("#modalName").textContent = card.dataset.name;
    $("#modalType").textContent = card.dataset.type;
    $("#modalDescription").textContent = card.dataset.description;
    $("#modalTrait").textContent = card.dataset.trait;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    $("#modalClose").focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$("#modalClose").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

// QUIZ
const questions = [
  {
    question: "O que você mais valoriza?",
    answers: [
      { text: "Liberdade", type: "vivienne" },
      { text: "Poder", type: "jude" },
      { text: "Lealdade", type: "taryn" },
      { text: "Independência", type: "cardan" }
    ]
  },
  {
    question: "Em uma situação difícil, você...",
    answers: [
      { text: "Enfrenta tudo de frente", type: "jude" },
      { text: "Segue seu próprio caminho", type: "vivienne" },
      { text: "Pensa antes de agir", type: "taryn" },
      { text: "Age com estratégia", type: "cardan" }
    ]
  },
  {
    question: "Qual lugar escolheria em Elfhame?",
    answers: [
      { text: "Uma floresta encantada", type: "vivienne" },
      { text: "O palácio real", type: "cardan" },
      { text: "Uma biblioteca secreta", type: "taryn" },
      { text: "O centro das intrigas da corte", type: "jude" }
    ]
  },
  {
    question: "Qual palavra combina mais com você?",
    answers: [
      { text: "Coragem", type: "jude" },
      { text: "Mistério", type: "cardan" },
      { text: "Liberdade", type: "vivienne" },
      { text: "Sensibilidade", type: "taryn" }
    ]
  }
];

const profiles = {
  jude: {
    name: "Jude Duarte",
    description: "Você é determinada, corajosa e não aceita que outras pessoas decidam seu destino."
  },
  cardan: {
    name: "Cardan Greenbriar",
    description: "Você é misteriosa, estratégica e sabe que as aparências podem esconder muito mais."
  },
  vivienne: {
    name: "Vivienne",
    description: "Você valoriza sua liberdade, segue suas próprias regras e não gosta de viver presa às expectativas dos outros."
  },
  taryn: {
    name: "Taryn Duarte",
    description: "Você observa o mundo com cuidado, valoriza suas relações e procura seu próprio espaço."
  }
};

let currentQuestion = 0;
let scores = { jude: 0, cardan: 0, vivienne: 0, taryn: 0 };

const questionTitle = $("#questionTitle");
const answersContainer = $("#answers");
const gameResult = $("#gameResult");

function showQuestion() {
  const question = questions[currentQuestion];

  questionTitle.textContent = question.question;
  $("#questionCounter").textContent =
    `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;

  $("#progressFill").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  answersContainer.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      scores[answer.type]++;

      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    });

    answersContainer.appendChild(button);
  });
}

function showResult() {
  answersContainer.hidden = true;
  questionTitle.hidden = true;
  $("#questionCounter").hidden = true;

  gameResult.hidden = false;

  const winner = Object.keys(scores).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );

  $("#resultTitle").textContent = profiles[winner].name;
  $("#resultDescription").textContent = profiles[winner].description;
}

function restartGame() {
  currentQuestion = 0;
  scores = { jude: 0, cardan: 0, vivienne: 0, taryn: 0 };

  answersContainer.hidden = false;
  questionTitle.hidden = false;
  $("#questionCounter").hidden = false;
  gameResult.hidden = true;

  showQuestion();
}

$("#restartGame").addEventListener("click", restartGame);

showQuestion();

// SEGREDO
const spoilerButton = $("#spoilerToggle");
const spoilerContent = $("#spoilerContent");

spoilerButton.addEventListener("click", () => {
  const isHidden = spoilerContent.hidden;

  spoilerContent.hidden = !isHidden;
  spoilerButton.textContent = isHidden
    ? "ESCONDER SEGREDO"
    : "REVELAR SEGREDO";
});
