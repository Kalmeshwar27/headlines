const headline = {
  text: 'Donald Trump said he would be "very _____" in negotiations with China.',
  correctAnswer: "tough",
  options: ["tough", "kind", "quiet", "optimistic"],
};

const blank = document.getElementById("blank");
const optionsDiv = document.querySelector(".options");
const resultDiv = document.getElementById("result");

// Populate the options dynamically
headline.options.forEach(option => {
  const btn = document.createElement("button");
  btn.innerText = option;
  btn.className = "option";
  btn.onclick = () => handleAnswer(btn, option);
  optionsDiv.appendChild(btn);
});

function handleAnswer(button, selected) {
  const allButtons = document.querySelectorAll(".option");
  allButtons.forEach(btn => btn.disabled = true); // lock options

  if (selected === headline.correctAnswer) {
    button.classList.add("correct");
    blank.innerText = selected;
    blank.style.color = "#48bb78"; // Green for correct answer
    resultDiv.innerHTML = "✅ Correct!";
    resultDiv.style.color = "#48bb78";
  } else {
    button.classList.add("wrong");
    blank.innerText = selected;
    blank.style.color = "#f56565"; // Red for wrong answer
    resultDiv.innerHTML = `❌ Wrong! Correct answer is "${headline.correctAnswer}"`;
    resultDiv.style.color = "#f56565";
  }
}
