const questions = [
  {
    image: "images/trump-speech.jpg",
    text: 'Donald Trump said he would be "very <span id="blank">_____</span>" in negotiations with China.',
    options: ["tough", "gentle", "silent", "neutral"],
    answer: "tough",
    summary: "Trump emphasized a firm stance on trade negotiations."
  },
  {
    image: "images/trump1.jpg",
    text: 'Trump says he will be <span id="blank">_____</span> to China in trade talks.',
    options: ["tough but fair", "very nice", "a total nightmare", "strategically distant"],
    answer: "very nice",
    summary: "Donald Trump stated he plans to approach trade negotiations with China in a more cooperative manner. He emphasized being very nice during future talks to ease tensions."
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

const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

function loadQuestion(index) {
  const q = questions[index];
  image.src = q.image;
  text.innerHTML = q.text;
  result.innerHTML = "";
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option;

    optionsContainer.appendChild(btn);

    btn.onclick = () => {
      if (option === q.answer) {
        const updatedText = q.text.replace(
          '<span id="blank">_____</span>',
          `<span id="blank" class="correct flash">${option}</span>`
        );
        text.innerHTML = updatedText;
        btn.classList.add("correct");
        result.innerText = q.summary;
        correctSound.currentTime = 0;
        correctSound.play();
      } else {
        const updatedText = q.text.replace(
          '<span id="blank">_____</span>',
          `<span id="blank" class="correct flash">${q.answer}</span>`
        );
        text.innerHTML = updatedText;
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
