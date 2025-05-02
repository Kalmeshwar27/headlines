// Sample data for headline
const correctAnswer = "tough";
const options = ["tough", "friendly", "passive", "aggressive"];

// DOM references
const optionsContainer = document.querySelector(".options");
const result = document.getElementById("result");
const blank = document.getElementById("blank");

// Render options
options.forEach(option => {
  const button = document.createElement("button");
  button.classList.add("option");
  button.innerText = option;
  button.addEventListener("click", () => handleAnswer(option, button));
  optionsContainer.appendChild(button);
});

// Handle answer selection
function handleAnswer(selected, button) {
  // Disable all buttons after selection
  document.querySelectorAll(".option").forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = 0.6;
  });

  // Fill in the blank
  blank.innerText = selected;

  // Show result
  if (selected === correctAnswer) {
    result.innerText = "Correct! Donald Trump said he would be 'tough' in negotiations with China.";
    result.style.color = "green";
    button.style.backgroundColor = "#2f855a";
    button.style.color = "white";
  } else {
    result.innerText = `Wrong. The correct word was "tough".`;
    result.style.color = "red";
    button.style.backgroundColor = "#c53030";
    button.style.color = "white";
  }
}
