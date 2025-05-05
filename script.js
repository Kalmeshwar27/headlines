const questions = [
  {
    image: "images/trump1.jpg",
    text: 'Trump says he will be very <span id="blank">_____</span> to China in trade talks.',
    options: ["fair", "nice", "nightmare", "distant"],
    answer: "nice",
    summary: "Donald Trump stated he plans to approach trade negotiations with China in a more cooperative manner. He emphasized being very nice during future talks to ease tensions.",
    link: "https://www.cnbctv18.com/world/trump-says-he-will-be-very-nice-to-china-in-trade-talks-ws-l-19592769.htm",
    attempted: false,
    correct: false
  },
  {
    image: "images/trump-tariff.jpg",
    text: 'President Trump announced a 100% tariff on all <span id="blank">_____</span> produced abroad.',
    options: ["movies", "cars", "phones", "clothing"],
    answer: "movies",
    summary: "President Donald Trump stated that efforts by foreign nations to attract American filmmakers and studios constitute 'a National Security threat.'",
    link: "https://abcnews.go.com/US/live-updates/trump-admin-live-updates-trump-threatens-100-tariff/?id=121461146",
    attempted: false,
    correct: false
  },
  {
    image: "images/sensex-drop.jpg",
    text: 'The BSE Sensex fell below <span id="blank">_____</span> amid global equity rout on tariff war worries.',
    options: ["73,000", "75,000", "70,000", "72,000"],
    answer: "73,000",
    summary: "The BSE Sensex closed below the 73,000 mark amid global equity rout on tariff war worries and persistent foreign fund outflows.",
    link: "https://www.news9live.com/business/markets/stock-market-on-march-4-2025-sensex-nifty-updates-2830179",
    attempted: false,
    correct: false
  },
  {
    image: "images/berkshire.jpg",
    text: 'Warren Buffett announced he will step down as CEO of <span id="blank">_____</span> by year-end.',
    options: ["Berkshire Hathaway", "Apple", "Amazon", "Tesla"],
    answer: "Berkshire Hathaway",
    summary: "Warren Buffett announced he will step down as CEO of Berkshire Hathaway by the end of the year, naming Greg Abel as his successor.",
    link: "https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-bulls-run-ai-trump-tariff-news-warren-buffett-berkshire-palantir-tesla/",
    attempted: false,
    correct: false
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

const image = document.getElementById("headline-image");
const text = document.getElementById("headline-text");
const optionsContainer = document.getElementById("options-container");
const result = document.getElementById("result-text");
const questionCount = document.getElementById("question-count");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  } else {
    showFinalScore();
  }
};

const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

function startTimer() {
  timeLeft = 20;
  timerDisplay.innerText = `Time: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoReveal();
    }
  }, 1000);
}

function autoReveal() {
  const q = questions[currentIndex];
  const updatedText = q.text.replace(
    '<span id="blank">_____</span>',
    `<span id="blank" class="correct">${q.answer}</span>`
  );
  text.innerHTML = updatedText;
  result.innerHTML = `Time's up! ${q.summary} <a href="${q.link}" target="_blank">Read More</a>`;

  Array.from(document.getElementsByClassName("option")).forEach(b => {
    b.disabled = true;
    if (b.innerText === q.answer) b.classList.add("correct");
  });

  q.attempted = true;
  nextBtn.disabled = false;
}

function loadQuestion(index) {
  const q = questions[index];
  image.src = q.image;
  text.innerHTML = q.text;
  result.innerHTML = "";
  optionsContainer.innerHTML = "";

  // Enable next button if already attempted
  nextBtn.disabled = !q.attempted;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option slot-reel";
    btn.innerText = option;

    // If already attempted, disable button
    if (q.attempted) {
      btn.disabled = true;
      if (option === q.answer) {
        btn.classList.add("correct");
      }
    }

    optionsContainer.appendChild(btn);

    btn.onclick = () => {
      clearInterval(timer);
      const isCorrect = option === q.answer;
      const updatedText = q.text.replace(
        '<span id="blank">_____</span>',
        `<span id="blank" class="correct flash">${q.answer}</span>`
      );
      text.innerHTML = updatedText;

      if (!q.attempted) {
        q.attempted = true;
        if (isCorrect) {
          q.correct = true;
          score++;
          scoreDisplay.innerText = `Score: ${score}`;
          btn.classList.add("correct");
          correctSound.currentTime = 0;
          correctSound.play();
        } else {
          q.correct = false;
          btn.classList.add("wrong");
          wrongSound.currentTime = 0;
          wrongSound.play();
        }
      } else {
        // Already attempted — no score update
        if (isCorrect) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
        }
      }

      result.innerHTML = `${isCorrect ? '' : 'Incorrect! '}${q.summary} <a href="${q.link}" target="_blank">Read More</a>`;

      Array.from(document.getElementsByClassName("option")).forEach(b => {
        b.disabled = true;
        if (b.innerText === q.answer) b.classList.add("correct");
      });

      nextBtn.disabled = false;
    };
  });

  questionCount.innerText = `${index + 1} / ${questions.length}`;

  // Auto-fill blank if already attempted
  if (q.attempted) {
    const updatedText = q.text.replace(
      '<span id="blank">_____</span>',
      `<span id="blank" class="correct">${q.answer}</span>`
    );
    text.innerHTML = updatedText;

    result.innerHTML = `${q.correct ? '' : 'Incorrect! '}${q.summary} <a href="${q.link}" target="_blank">Read More</a>`;
  } else {
    startTimer();
  }
}
nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
};

window.onload = () => {
  scoreDisplay.innerText = `Score: 0`;
  loadQuestion(currentIndex);
};

