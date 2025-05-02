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
  // Add more questions as needed
];

let currentIndex = 0;

const image = document.getElementById("headline-image");
const text = document.getElementById("headline-text");
const optionsContainer = document.getElementById("options-container");
const result = document.getElementById("result-text");
const questionCount = document.getElementById("question-count");

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
    btn.onclick = () => {
      if (option === q.answer) {
        btn.classList.add("correct!");
        result.innerText = q.summary;
      } else {
        btn.classList.add("wrong");
        result.innerText = `Incorrect!. ${q.summary}`;
      }

      Array.from(document.getElementsByClassName("option")).forEach(b => {
        b.disabled = true;
        if (b.innerText === q.answer) b.classList.add("correct");
      });
    };
    optionsContainer.appendChild(btn);
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
