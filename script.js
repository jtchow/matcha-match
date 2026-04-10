// ────────────────────────────────────────────────
//  ✿  QUESTIONS — Replace these with your own!  ✿
// ────────────────────────────────────────────────
// Each question has a `text` and an array of `answers`.
// Each answer has a `text` and a `type` that maps to one
// of the result keys below.

const questions = [
  {
    text: "How do you start your morning?",
    answers: [
      { text: "Slow and cozy — candles, journaling, the works", type: "classic" },
      { text: "I'm already running late, coffee in hand", type: "iced" },
      { text: "Yoga or a quick workout", type: "oat" },
      { text: "I hit snooze at least 3 times", type: "lavender" },
    ],
  },
  {
    text: "Pick a weekend activity:",
    answers: [
      { text: "Farmer's market & brunch", type: "oat" },
      { text: "Binge-watching my comfort show", type: "lavender" },
      { text: "Trying the newest café in town", type: "iced" },
      { text: "Reading at a cozy bookshop", type: "classic" },
    ],
  },
  {
    text: "What's your go-to aesthetic?",
    answers: [
      { text: "Clean and minimal", type: "classic" },
      { text: "Colorful and eclectic", type: "iced" },
      { text: "Earthy and natural", type: "oat" },
      { text: "Soft and dreamy", type: "lavender" },
    ],
  },
  {
    text: "Pick a color palette:",
    answers: [
      { text: "Forest green & cream", type: "classic" },
      { text: "Bright pink & orange", type: "iced" },
      { text: "Warm brown & sage", type: "oat" },
      { text: "Lilac & cloud white", type: "lavender" },
    ],
  },
  {
    text: "Your friends would describe you as:",
    answers: [
      { text: "The reliable one", type: "classic" },
      { text: "The adventurous one", type: "iced" },
      { text: "The nurturing one", type: "oat" },
      { text: "The daydreamer", type: "lavender" },
    ],
  },
];

// ────────────────────────────────────────────────
//  ✿  RESULTS — Customize these too!  ✿
// ────────────────────────────────────────────────
// Keys must match the `type` values used in answers above.

const results = {
  classic: {
    emoji: "🍵",
    title: "Classic Matcha Latte",
    description:
      "You're timeless and grounded. You appreciate the simple things done really well — a perfectly whisked bowl of matcha, a good book, and a quiet morning. People look up to your calm energy.",
  },
  iced: {
    emoji: "🧊",
    title: "Iced Matcha Latte",
    description:
      "You're bold, refreshing, and always on the move! You bring energy to every room and love trying new things. Life's too short to stay in one place.",
  },
  oat: {
    emoji: "🥛",
    title: "Oat Milk Matcha Latte",
    description:
      "Warm, creamy, and nurturing — that's you! You care deeply about the world around you and always make people feel welcome. You're everyone's comfort person.",
  },
  lavender: {
    emoji: "💜",
    title: "Lavender Matcha Latte",
    description:
      "Dreamy, creative, and a little mysterious. You see the world through a soft-focus lens and have a rich inner world. People are drawn to your gentle magic.",
  },
};

// ────────────────────────────────────────────────
//  ✿  QUIZ ENGINE (you probably don't need to
//     touch anything below)  ✿
// ────────────────────────────────────────────────

let currentQuestion = 0;
const userAnswers = []; // stores selected type per question

// DOM refs
const introScreen = document.getElementById("intro-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const retakeBtn = document.getElementById("retake-btn");
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");

// ── Screen helpers ──────────────────────────────
function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

// ── Render a question ───────────────────────────
function renderQuestion() {
  const q = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.text;

  // progress
  progressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;

  // answers
  answersContainer.innerHTML = "";
  q.answers.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = a.text;
    btn.setAttribute("id", `answer-${currentQuestion}-${i}`);

    // re-select if user already answered
    if (userAnswers[currentQuestion] === a.type) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => selectAnswer(a.type, btn));
    answersContainer.appendChild(btn);
  });

  // button states
  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = userAnswers[currentQuestion] === undefined;

  // change "Next" to "See Results" on last question
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "See Results 🌸" : "Next →";
}

// ── Select an answer ────────────────────────────
function selectAnswer(type, clickedBtn) {
  userAnswers[currentQuestion] = type;

  // visual feedback
  answersContainer.querySelectorAll(".answer-btn").forEach((b) => b.classList.remove("selected"));
  clickedBtn.classList.add("selected");

  nextBtn.disabled = false;
}

// ── Calculate result ────────────────────────────
function calculateResult() {
  const tally = {};
  userAnswers.forEach((type) => {
    tally[type] = (tally[type] || 0) + 1;
  });
  // find the type with the highest count
  return Object.keys(tally).reduce((a, b) => (tally[a] >= tally[b] ? a : b));
}

// ── Show result ─────────────────────────────────
function showResult() {
  const winnerType = calculateResult();
  const result = results[winnerType];

  resultEmoji.textContent = result.emoji;
  resultTitle.textContent = `You are a ${result.title}!`;
  resultDescription.textContent = result.description;
  progressBar.style.width = "100%";

  showScreen(resultScreen);
}

// ── Event listeners ─────────────────────────────
startBtn.addEventListener("click", () => {
  showScreen(questionScreen);
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

retakeBtn.addEventListener("click", () => {
  currentQuestion = 0;
  userAnswers.length = 0;
  showScreen(introScreen);
});
