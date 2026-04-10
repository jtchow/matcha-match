// ────────────────────────────────────────────────
//  ✿  QUESTIONS — Replace these with your own!  ✿
// ────────────────────────────────────────────────
// Each question has a `text` and an array of `answers`.
// Each answer has a `text` and a `type` that maps to one
// of the result keys below.

const questions = [
  {
    text: "Do you prefer hot or cold weather?",
    answers: [
      { text: "☀️ Hot", type: "classic" },
      { text: "❄️ Cold", type: "iced" },
    ],
  },
  {
    text: "If you won the lottery tomorrow, what you would you do first?",
    answers: [
      { text: "🛍️ Shopping spree!!", type: "iced" },
      { text: "📈 Invest it", type: "classic" },
      { text: "✌️ Quit your job", type: "lavender" },
    ],
  },
  {
    text: "Your best friend just hit someone with their car and they come to you for help. What do you do?",
    answers: [
      { text: "🚓 Call the police", type: "classic" },
      { text: "⛏️ Grab a shovel", type: "iced" },
      { text: "📝 Make a list of pros and cons", type: "oat" },
    ],
  },
  {
    text: "Which kind of ice do you prefer?",
    answers: [
      { text: "🧊 Pebble ice", type: "iced" },
      { text: "🔲 Cube", type: "classic" },
      { text: "🚫 I hate ICE", type: "oat" },
    ],
  },
  {
    text: "It’s Friday night! Where you at?",
    answers: [
      { text: "🪩 The club", type: "iced" },
      { text: "🎲 Playing board games", type: "oat" },
      { text: "🍿 Watching Netflix", type: "lavender" },
    ],
  },
  {
    text: "Uh oh, it’s Saturday and your boss is calling! What do you do?",
    answers: [
      { text: "🔕 Ignore it", type: "lavender" },
      { text: "📞 Answer right away", type: "classic" },
      { text: "🗓️ Tell them you’ll circle back on Monday", type: "oat" },
    ],
  },
  {
    text: "Oh no! Aliens have invaded earth. They said they’ll leave us alone if we sacrifice one of these three. Who do you pick:",
    answers: [
      { text: "🎤 Justin Bieber", type: "classic" },
      { text: "🌟 Zendaya", type: "lavender" },
      { text: "🕷️ Tom Holland", type: "oat" },
    ],
  },
  {
    text: "You have to eat one food for the rest of your life, what is it?",
    answers: [
      { text: "🍜 Ramen", type: "iced" },
      { text: "🍕 Pizza", type: "oat" },
      { text: "🥣 Soup", type: "classic" },
    ],
  },
  {
    text: "If everyone in the world had the same super power except you, what would you want it to be? (You have no powers)",
    answers: [
      { text: "🌌 Teleportation", type: "iced" },
      { text: "💪 Super strength", type: "classic" },
      { text: "🧠 Mind reading", type: "lavender" },
    ],
  },
  {
    text: "What’s your favorite fun drink? (Other than matcha)",
    answers: [
      { text: "🧋 Boba", type: "lavender" },
      { text: "🍸 Alcoholic bevvie", type: "iced" },
      { text: "🥤 Soda", type: "classic" },
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

// ── Prank mode ──────────────────────────────────
const urlParams = new URLSearchParams(window.location.search);
const isPrank = urlParams.has("refer");

// ── Loading screen ──────────────────────────────
const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-text");

const loadingMessages = [
  "Whisking your answers... 🍵",
  "Steaming the oat milk... 🥛",
  "Sifting through matcha powder... 🍃",
  "Adding a sprinkle of magic... ✨",
  "Almost ready... 🌸",
];

let loadingInterval = null;

function showLoadingScreen() {
  showScreen(loadingScreen);
  progressBar.style.width = "90%";

  let msgIndex = 0;
  loadingText.textContent = loadingMessages[0];

  loadingInterval = setInterval(() => {
    msgIndex++;
    if (msgIndex < loadingMessages.length) {
      loadingText.style.opacity = "0";
      setTimeout(() => {
        loadingText.textContent = loadingMessages[msgIndex];
        loadingText.style.opacity = "1";
      }, 1000);
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(loadingInterval);
    showResult();
  }, loadingMessages.length * 1000);
}

// ── Show result ─────────────────────────────────
function showResult() {
  if (isPrank) {
    resultEmoji.textContent = "🚫";
    resultTitle.textContent = "u a hoe";
    resultDescription.textContent = "";
  } else {
    const winnerType = calculateResult();
    const result = results[winnerType];
    resultEmoji.textContent = result.emoji;
    resultTitle.textContent = `You are a ${result.title}!`;
    resultDescription.textContent = result.description;
  }

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
    showLoadingScreen();
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
