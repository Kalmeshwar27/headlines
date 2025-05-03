const questions = [
  {
    image: "images/trump-speech.jpg",
    text: 'Donald Trump said he would be "very <span id="blank">_____</span>" in negotiations with China.',
    options: ["tough", "gentle", "silent", "neutral"],
    answer: "tough",
    summary: "Trump emphasized a firm stance on trade negotiations."
  },
  {
    image: "images/elon.jpg",
    text: 'Elon Musk announced Tesla would begin manufacturing in <span id="blank">_____</span> by next year.',
    options: ["India", "Canada", "Brazil", "Russia"],
    answer: "India",
    summary: "Tesla’s expansion reflects growing demand in Asian markets."
  },
];

let currentIndex = 0;

const image = document.getElementById("headline-image");
const text = document.getElementById("headline-text");
const optionsContainer = document.getElementById("options-container");
const result = document.getElementById("result-text");
const questionCount = document.getElementById("question-count");

// const tickSound = new Audio("sounds/tick.mp3"); // add this sound file in /sounds/
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

function loadQuestion(index) {
  const q = questions[index];
  image.src = q.image;
  text.innerHTML = q.text;
  result.innerHTML = "";
  optionsContainer.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "option slot-reel";
    btn.innerText = option;
    btn.style.animationDelay = `${i * 250}ms`;

    setTimeout(() => {
      optionsContainer.appendChild(btn);
      tickSound.currentTime = 0;
      tickSound.play();
    }, i * 150);

    btn.onclick = () => {
      const updatedText = q.text.replace(
        '<span id="blank">_____</span>',
        `<span id="blank" class="${option === q.answer ? 'correct flash' : 'wrong'}">${option}</span>`
      );
      text.innerHTML = updatedText;
    
      if (option === q.answer) {
        btn.classList.add("correct");
        result.innerText = q.summary;
        correctSound.currentTime = 0;
        correctSound.play();
      } else {
        btn.classList.add("wrong");
        result.innerText = `Incorrect! ${q.summary}`;
        wrongSound.currentTime = 0;
        wrongSound.play();
      }
    
      Array.from(document.getElementsByClassName("option")).forEach(b => {
        b.disabled = true;
        if (b.innerText === q.answer) b.classList.add("correct");
      });
    };
  });

  questionCount.innerText = `${index + 1} / ${questions.length}`;
}

document.getElementById("next-btn").onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
};

document.getElementById("prev-btn").onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
};

window.onload = () => loadQuestion(currentIndex);
