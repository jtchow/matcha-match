// ────────────────────────────────────────────────
//  ✿  QUESTIONS — Replace these with your own!  ✿
// ────────────────────────────────────────────────
// Each question has a `text` and an array of `answers`.
// Each answer has a `text` and a `type` that maps to one
// of the result keys below.

const questions = [
  {
    text: "What's your favorite fun drink? (Other than matcha)",
    answers: [
      { text: "🧋 Boba", type: "strawberry" },
      { text: "🍸 Alcoholic bevvie", type: "waffles" },
      { text: "🥤 Soda", type: "classic" },
    ],
  },
  {
    text: "Do you prefer hot or cold weather?",
    answers: [
      { text: "☀️ Hot", type: "strawberry" },
      { text: "❄️ Cold", type: "classic" },
    ],
  },
  {
    text: "It's Friday night! Where you at?",
    answers: [
      { text: "🪩 The club", type: "strawberry" },
      { text: "🎲 Playing board games", type: "ceremony" },
      { text: "🍿 Watching Netflix", type: "classic" },
    ],
  },
  {
    text: "If you won the lottery tomorrow, what you would you do first?",
    answers: [
      { text: "🛍️ Shopping spree!!", type: "strawberry" },
      { text: "📈 Invest it", type: "ceremony" },
      { text: "✌️ Quit your job", type: "straight" },
    ],
  },
  {
    text: "Uh oh, it's Saturday and your boss is calling! What do you do?",
    answers: [
      { text: "🔕 Ignore it", type: "waffles" },
      { text: "📞 Answer right away", type: "classic" },
      { text: "🗓️ Tell them you'll circle back on Monday", type: "ceremony" },
    ],
  },
  {
    text: "Your best friend just hit someone with their car and they come to you for help. What do you do?",
    answers: [
      { text: "🚓 Call the police", type: "straight" },
      { text: "⛏️ Grab a shovel", type: "waffles" },
      { text: "📝 Make a list of pros and cons", type: "ceremony" },
    ],
  },
  {
    text: "Oh no! Aliens have invaded earth. They said they'll leave us alone if we sacrifice one of these three. Who do you pick:",
    answers: [
      { text: "🎤 Justin Bieber", type: "classic" },
      { text: "🌟 Zendaya", type: "waffles" },
      { text: "🕷️ Tom Holland", type: "straight" },
    ],
  },
  {
    text: "Your dog and a random child are trapped in a burning building. Who do you save?",
    answers: [
      { text: "🐶 Your dog", type: "strawberry" },
      { text: "👦🏻 The child", type: "straight" },
      { text: "😵 They both die because you can't decide", type: "classic" },

    ],
  },
  {
    text: "If everyone in the world had the same super power except you, what would you want it to be? (You have no powers)",
    answers: [
      { text: "🌌 Teleportation", type: "waffles" },
      { text: "💪 Super strength", type: "straight" },
      { text: "🧠 Mind reading", type: "ceremony" },
    ],
  },
  {
    text: "When's the last time you cried?",
    answers: [
      { text: "😅 Today", type: "waffles" },
      { text: "📅 About a month ago", type: "classic" },
      { text: "🤷‍♀️ I don't even remember", type: "ceremony" },
    ],
  }
];

// ────────────────────────────────────────────────
//  ✿  RESULTS — Customize these too!  ✿
// ────────────────────────────────────────────────
// Keys must match the `type` values used in answers above.

const results = {
  strawberry: {
    emoji: "🍓",
    image: null,
    title: "Strawberry Matcha Latte!",
    description:
      "You're the life of the party! Spunky, social, and always outgoing — you light up every room you walk into. People are drawn to your infectious energy and you never meet a stranger.",
    compatible: ["Matcha Waffles", "Classic Matcha Latte"],
    lessCompatible: ["Tea Ceremony Matcha"],
    hobbies: ["Going to concerts 🎶", "Hosting game nights 🎲", "Trying new restaurants 🍽️"],
  },
  classic: {
    emoji: "🍵",
    image: "assets/matchalattej.png",
    title: "Classic Matcha Latte!",
    description:
      "Reliable, steady, and comforting — that's you! You're the person everyone counts on. You love your routines and do things the right way, every time. Why fix what isn't broken?",
    compatible: ["Tea Ceremony Matcha", "Strawberry Matcha Latte"],
    lessCompatible: ["Matcha Waffles"],
    hobbies: ["Reading 📚", "Cooking comfort food 🍳", "Morning walks ☀️"],
  },
  straight: {
    emoji: "🍃",
    image: null,
    title: "Straight Matcha!",
    description:
      "No nonsense, no fluff. You're direct, decisive, and a natural-born leader. You cut through the noise and get things done while everyone else is still talking.",
    compatible: ["Classic Matcha Latte"],
    lessCompatible: ["Strawberry Matcha Latte", "Matcha Waffles"],
    hobbies: ["Working out 💪", "Listening to podcasts 🎧", "Chess ♟️"],
  },
  ceremony: {
    emoji: "🫖",
    image: "assets/teaceremonymatcha.png",
    title: "Tea Ceremony Matcha!",
    description:
      "Methodical, thoughtful, and intentional. You approach life like a perfectly choreographed ritual — every step has a purpose. Your logical mind and attention to detail are unmatched.",
    compatible: ["Classic Matcha Latte", "Straight Matcha"],
    lessCompatible: ["Strawberry Matcha Latte"],
    hobbies: ["Coding 💻", "Journaling ✍️", "Video Games 🎮"],
  },
  waffles: {
    emoji: "🍦",
    image: "assets/softserve.png",
    title: "Matcha Soft Serve!",
    description:
      "A timeless classic, with a fun new twist. You're not afraid to go off the beaten path! Bold, adventurous, and endlessly creative — you're never afraid to shake up the status quo.",
    compatible: ["Strawberry Matcha Latte", "Straight Matcha"],
    lessCompatible: ["Classic Matcha Latte"],
    hobbies: ["Traveling ✈️", "Brainstorming new ideas 💡", "Learning random skills on YouTube 📱"],
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

// ── Backdoor: force a specific result via ?name=<name> ──
const nameBackdoors = {
  jason: "waffles",
  kylie: "strawberry",
  richard: "ceremony",
  tyler: "straight",
  annie: "classic",
};
const backdoorName = (urlParams.get("name") || "").toLowerCase().trim();
const backdoorType = nameBackdoors[backdoorName] || null;

// ── Loading screen ──────────────────────────────
const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-text");

const loadingMessages = [
  "Sifting through matcha powder... 🍃",
  "Steaming the oat milk... 🥛",
  "Whisking your answers... 🍵",
  "Adding a sprinkle of magic... ✨",
  "Almost ready... 🌸",
];

let loadingTimeout = null;

function showLoadingScreen() {
  showScreen(loadingScreen);
  progressBar.style.width = "90%";

  let msgIndex = 0;
  loadingText.textContent = loadingMessages[0];
  loadingText.style.opacity = "1";

  function cycleMessage() {
    msgIndex++;
    if (msgIndex < loadingMessages.length) {
      // fade out over 300ms, swap text, fade back in
      loadingText.style.opacity = "0";
      setTimeout(() => {
        loadingText.textContent = loadingMessages[msgIndex];
        loadingText.style.opacity = "1";
      }, 300);
      // schedule next message 1s after this one appeared
      loadingTimeout = setTimeout(cycleMessage, 1500);
    } else {
      // all messages shown — go to reveal screen
      setTimeout(showRevealScreen, 600);
    }
  }

  // first message shows for 1s, then start cycling
  loadingTimeout = setTimeout(cycleMessage, 1500);
}

// ── Reveal screen ───────────────────────────────
const revealScreen = document.getElementById("reveal-screen");
const revealBtn = document.getElementById("reveal-btn");

function showRevealScreen() {
  progressBar.style.width = "95%";
  showScreen(revealScreen);
}

// ── Show result ─────────────────────────────────
const resultDetails = document.getElementById("result-details");
const resultCompatible = document.getElementById("result-compatible");
const resultLessCompatible = document.getElementById("result-less-compatible");
const resultHobbies = document.getElementById("result-hobbies");

function renderResultImage(result) {
  // Clear existing content
  resultEmoji.textContent = "";
  resultEmoji.innerHTML = "";

  if (result.image) {
    // Show image in cute box
    resultEmoji.classList.add("has-image");
    const img = document.createElement("img");
    img.src = result.image;
    img.alt = result.title;
    img.className = "result-profile-img";
    resultEmoji.appendChild(img);
  } else {
    // Fallback to emoji
    resultEmoji.classList.remove("has-image");
    resultEmoji.textContent = result.emoji;
  }
}

function showResult() {
  if (backdoorType) {
    // Backdoor: force a specific real result via ?name=
    const result = results[backdoorType];
    renderResultImage(result);
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    resultDetails.style.display = "";
    resultCompatible.textContent = result.compatible.join(" & ");
    resultLessCompatible.textContent = result.lessCompatible.join(" & ");
    resultHobbies.innerHTML = result.hobbies.map(h => `<li>${h}</li>`).join("");
  } else if (isPrank) {
    const prankResult = {
      emoji: "🚫",
      image: "assets/sarah.jpg",       // ← swap in your friend's photo
      title: "a hoe",
      description: "happy birthday pal!",
      compatible: ["richard"],
      lessCompatible: ["dairy, eggs, nuts, and shellfish 😭"],
      hobbies: ["taking personality quizzes 💅", "workin 💻"],
    };
    renderResultImage(prankResult);
    resultTitle.textContent = prankResult.title;
    resultDescription.textContent = prankResult.description;
    resultDetails.style.display = "";
    resultCompatible.textContent = prankResult.compatible.join(" & ");
    resultLessCompatible.textContent = prankResult.lessCompatible.join(" & ");
    resultHobbies.innerHTML = prankResult.hobbies.map(h => `<li>${h}</li>`).join("");
  } else {
    const winnerType = calculateResult();
    const result = results[winnerType];
    renderResultImage(result);
    resultTitle.textContent = `${result.title}`;
    resultDescription.textContent = result.description;
    resultDetails.style.display = "";
    resultCompatible.textContent = result.compatible.join(" & ");
    resultLessCompatible.textContent = result.lessCompatible.join(" & ");
    resultHobbies.innerHTML = result.hobbies.map(h => `<li>${h}</li>`).join("");
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

revealBtn.addEventListener("click", () => {
  showResult();
});

retakeBtn.addEventListener("click", () => {
  currentQuestion = 0;
  userAnswers.length = 0;
  showScreen(introScreen);
});
