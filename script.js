
/* =====================================
   THE CRUEL PRINCE
   Edição especial para Débora
===================================== */


/* 1. MENU DE NAVEGAÇÃO */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");

  menuToggle.textContent = opened ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(opened));
});

document.querySelectorAll("#navigation a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* 2. HEADER DINÂMICO */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });


/* 3. ANO AUTOMÁTICO */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* 4. PARTÍCULAS MÁGICAS */

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 45; i++) {
  const particle = document.createElement("span");

  particle.className = "particle";

  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";

  particle.style.animationDuration =
    (5 + Math.random() * 8) + "s";

  particle.style.animationDelay =
    Math.random() * 8 + "s";

  particleContainer.appendChild(particle);
}


/* 5. ANIMAÇÃO AO ROLAR */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});


/* 6. BANCO DE DADOS DOS PERSONAGENS */

const characters = {

  jude: {
    name: "Jude Duarte",
    symbol: "J",
    type: "PROTAGONISTA",
    description:
      "Jude é uma humana criada em Elfhame. Determinada a conquistar seu próprio lugar entre os seres feéricos, ela enfrenta preconceitos, rivalidades e disputas pelo poder.",
    personality: "Ambiciosa e determinada",
    trait: "Coragem e estratégia"
  },

  cardan: {
    name: "Cardan Greenbriar",
    symbol: "C",
    type: "PRÍNCIPE DE ELFHAME",
    description:
      "Cardan é um príncipe feérico cuja posição na corte está ligada a intrigas, rivalidades e conflitos familiares. Sua personalidade complexa faz dele uma figura central na história.",
    personality: "Irônico e imprevisível",
    trait: "Poder e complexidade"
  },

  vivienne: {
    name: "Vivienne Duarte",
    symbol: "V",
    type: "FAMÍLIA DUARTE",
    description:
      "Vivienne é filha de Madoc e irmã mais velha de Jude e Taryn. Diferente de suas irmãs, ela tem uma relação particular com o mundo humano e valoriza sua independência.",
    personality: "Independente e ousada",
    trait: "Liberdade e individualidade"
  },

  taryn: {
    name: "Taryn Duarte",
    symbol: "T",
    type: "FAMÍLIA DUARTE",
    description:
      "Taryn é irmã gêmea de Jude. Sua maneira de lidar com a vida em Elfhame é diferente da de sua irmã, e suas decisões têm consequências importantes para a família.",
    personality: "Reservada e cautelosa",
    trait: "Adaptação e escolhas"
  },

  madoc: {
    name: "Madoc",
    symbol: "M",
    type: "GENERAL DE ELFHAME",
    description:
      "Madoc é um poderoso general feérico e pai de Vivienne, Jude e Taryn. Sua autoridade, suas decisões e suas relações familiares são fundamentais para a trama.",
    personality: "Autoritário e estratégico",
    trait: "Guerra e liderança"
  }

};


/* 7. SISTEMA DE FICHAS */

const modal = document.getElementById("characterModal");

const modalSymbol = document.getElementById("modalSymbol");
const modalType = document.getElementById("modalType");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPersonality = document.getElementById("modalPersonality");
const modalTrait = document.getElementById("modalTrait");

const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

let previousFocus = null;

function openCharacter(id) {

  const character = characters[id];

  if (!character) return;

  previousFocus = document.activeElement;

  modalSymbol.textContent = character.symbol;
  modalType.textContent = character.type;
  modalName.textContent = character.name;
  modalDescription.textContent = character.description;
  modalPersonality.textContent = character.personality;
  modalTrait.textContent = character.trait;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  modalClose.focus();
}

function closeCharacter() {

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll("[data-open]").forEach(button => {

  button.addEventListener("click", () => {
    openCharacter(button.dataset.open);
  });

});

modalClose.addEventListener("click", closeCharacter);
modalDone.addEventListener("click", closeCharacter);

modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeCharacter();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeCharacter();
  }

});


/* 8. PESQUISA DE PERSONAGENS */

const searchInput = document.getElementById("characterSearch");
const characterCards = document.querySelectorAll(".character-card");
const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "todos";

function filterCharacters() {

  const search = searchInput.value
    .trim()
    .toLowerCase();

  let visibleCount = 0;

  characterCards.forEach(card => {

    const name = card.dataset.name;
    const category = card.dataset.category;

    const matchesSearch = name.includes(search);

    const matchesFilter =
      currentFilter === "todos" ||
      category.split(" ").includes(currentFilter);

    const visible = matchesSearch && matchesFilter;

    card.classList.toggle("hidden", !visible);

    if (visible) visibleCount++;

  });

  emptyMessage.classList.toggle(
    "show",
    visibleCount === 0
  );

}

searchInput.addEventListener("input", filterCharacters);


/* 9. FILTROS */

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    filterCharacters();

  });

});


/* 10. MECÂNICA DO QUIZ */

const questions = [

  {
    question:
      "Você acaba de chegar a Elfhame. O que faria primeiro?",

    answers: [
      { text: "Procuraria conhecer o reino e seus segredos.", value: "coragem" },
      { text: "Tentaria entender quem realmente possui o poder.", value: "estrategia" },
      { text: "Exploraria tudo sem aceitar ordens.", value: "liberdade" },
      { text: "Procuraria descobrir os encantamentos do lugar.", value: "magia" }
    ]
  },

  {
    question:
      "Alguém oferece uma aliança. Qual seria sua reação?",

    answers: [
      { text: "Aceitaria, mas sem abandonar meus objetivos.", value: "estrategia" },
      { text: "Recusaria se isso ameaçasse minha liberdade.", value: "liberdade" },
      { text: "Tentaria descobrir as verdadeiras intenções.", value: "coragem" },
      { text: "Procuraria saber se existe algum encantamento envolvido.", value: "magia" }
    ]
  },

  {
    question:
      "Qual objeto escolheria para representar seu destino?",

    answers: [
      { text: "Uma espada antiga.", value: "coragem" },
      { text: "Uma coroa dourada.", value: "estrategia" },
      { text: "Uma chave para qualquer porta.", value: "liberdade" },
      { text: "Um livro de encantamentos.", value: "magia" }
    ]
  },

  {
    question:
      "O que considera mais importante em Elfhame?",

    answers: [
      { text: "Ter coragem para enfrentar qualquer desafio.", value: "coragem" },
      { text: "Saber conquistar e proteger seu poder.", value: "estrategia" },
      { text: "Poder viver sem estar presa às regras dos outros.", value: "liberdade" },
      { text: "Conhecer os mistérios que ninguém compreende.", value: "magia" }
    ]
  }

];

const results = {

  coragem: {
    title: "A INDOMÁVEL",
    description:
      "Você não recua diante de um desafio. Seu caminho é marcado por coragem, determinação e vontade de conquistar seu espaço."
  },

  estrategia: {
    title: "A SOBERANA",
    description:
      "Você observa antes de agir. Sabe que informação, paciência e inteligência podem ser tão importantes quanto uma coroa."
  },

  liberdade: {
    title: "O ESPÍRITO LIVRE",
    description:
      "Você não nasceu para viver presa às expectativas de ninguém. Seu maior tesouro é a própria liberdade. Sua essência lembra Vivienne."
  },

  magia: {
    title: "A ALMA ENCANTADA",
    description:
      "Você procura o que existe além do óbvio. Mistérios, descobertas e imaginação fazem parte do seu destino."
  }

};

let currentQuestion = 0;

let scores = {
  coragem: 0,
  estrategia: 0,
  liberdade: 0,
  magia: 0
};

const questionTitle = document.getElementById("questionTitle");
const answersContainer = document.getElementById("answers");
const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");

const gameResult = document.getElementById("gameResult");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");

function showQuestion() {

  const question = questions[currentQuestion];

  questionTitle.textContent = question.question;

  questionCounter.textContent =
    `PERGUNTA ${currentQuestion + 1} / ${questions.length}`;

  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  answersContainer.innerHTML = "";

  question.answers.forEach(answer => {

    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      selectAnswer(answer.value);
    });

    answersContainer.appendChild(button);

  });

}

function selectAnswer(value) {

  scores[value]++;

  currentQuestion++;

  if (currentQuestion < questions.length) {

    showQuestion();

  } else {

    showResult();

  }

}

function showResult() {

  answersContainer.hidden = true;
  questionTitle.hidden = true;

  const highestScore = Math.max(...Object.values(scores));

  const winners = Object.keys(scores).filter(
    key => scores[key] === highestScore
  );

  const winner = winners[0];

  resultTitle.textContent = results[winner].title;
  resultDescription.textContent = results[winner].description;

  gameResult.hidden = false;

  questionCounter.textContent = "DESTINO REVELADO";
  progressFill.style.width = "100%";

}

function restartGame() {

  currentQuestion = 0;

  scores = {
    coragem: 0,
    estrategia: 0,
    liberdade: 0,
    magia: 0
  };

  answersContainer.hidden = false;
  questionTitle.hidden = false;
  gameResult.hidden = true;

  showQuestion();

}

document.getElementById("restartGame").addEventListener(
  "click",
  restartGame
);

showQuestion();


/* 11. SISTEMA DE SPOILERS */

const spoilerToggle = document.getElementById("spoilerToggle");
const spoilerContent = document.getElementById("spoilerContent");

spoilerToggle.addEventListener("click", () => {

  const opened = spoilerContent.hidden;

  spoilerContent.hidden = !opened;

  spoilerToggle.textContent = opened
    ? "OCULTAR CONTEÚDO"
    : "REVELAR CONTEÚDO";

});


/* 12. NAVEGAÇÃO ATIVA */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#navigation a");

const sectionObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {

      const active =
        link.getAttribute("href") === "#" + entry.target.id;

      link.classList.toggle("active", active);

    });

  });

}, {
  rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* 13. PROTEÇÃO DE REDIRECIONAMENTO */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const destination = link.getAttribute("href");

    if (destination === "#") return;

    const target = document.querySelector(destination);

    if (!target) {
      event.preventDefault();
      return;
    }

  });

});


/* =====================================
   FIM DO SISTEMA
   THE CRUEL PRINCE
===================================== */

console.log(
  "%c THE CRUEL PRINCE ",
  "background:#10291b;color:#e3c994;padding:12px;font-size:18px;"
);

console.log("Bem-vinda a Elfhame, Débora. ♛");
