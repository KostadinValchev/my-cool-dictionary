let idCounters = {
  success: "success-span",
  falure: "falure-span",
  hints: "hints-span",
};

// Create Session
let createSession = (name) => {
  sessionStorage.setItem(`${name}`, "0");
};

let increaseSession = (name) => {
  sessionStorage[name] = Number(sessionStorage[name]) + 1;
};
// sessionStorage.setItem("key", "value");
// Check For Session

// <----- END ----->

// COUNTERS
// Init Counters
let initCounters = () => {
  createSession("success");
  createSession("falure");
  createSession("hints");
  document.getElementById("success-span").innerHTML = 0;
  document.getElementById("falure-span").innerHTML = 0;
  document.getElementById("hints-span").innerHTML = 0;
};

// <----- EVENTS  ----->
// Attach event for Checking word suggestion
const handleCheck = () => {
  const bgInput = document.getElementById("answer-input");
  let answers = Object.values(currentWord);
  if (answers.includes(bgInput.value)) {
    toggleSuccessAlert();
    increaseSession("success");
    increaseCounter("success");
    setTimeout(() => {
      toggleSuccessAlert();
      cleanInputSuggestion();
      setNewWord();
    }, 1000);
  } else {
    toggleFalureAlert();
    toggleFalureAlert();
    increaseSession("falure");
    increaseCounter("falure");
  }
};

const enterCheck = (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    handleCheck();
  }
};

const makeHint = (word) => {
  let word_answers = Object.values(word);
  let target = word_answers[Math.floor(Math.random() * word_answers.length)];
  let hint = "";
  for (let i = 0; i < target.length; i++) {
    if (i === 0) hint += target[i];
    else if (i === target.length - 1) hint += target[target.length - 1];
    else hint += " _ ";
  }
  return hint;
};

const handleHint = () => {
  cleanInputSuggestion();
  let hint = makeHint(currentWord);
  increaseSession("hints");
  increaseCounter("hints");
  document.getElementById("answer-input").setAttribute("placeholder", hint);
};

// <----- DOM  ----->
// Set New Word
let setNewWord = () => {
  const randomElement =
    document.words[Math.floor(Math.random() * document.words.length)];
  document.getElementById("guess-word").innerHTML = randomElement.contextWord;
  document.getElementById("answer-input").removeAttribute("placeholder");
  currentWord = randomElement.answers;
};

let handleNextWord = () => {
  cleanInputSuggestion();
  increaseSession("falure");
  increaseCounter("falure");
  setNewWord();
};

// Increase counters

let increaseCounter = (name) => {
  let getId = idCounters[name];
  document.getElementById(getId).innerHTML = sessionStorage[name];
};

// Clean front-end
let toggleSuccessAlert = () => {
  let successClasses = document.getElementById("success").classList;
  successClasses.contains("hidden")
    ? successClasses.remove("hidden")
    : successClasses.add("hidden");
};

let toggleFalureAlert = () => {
  let falureClasses = document.getElementById("failure").classList;
  if (falureClasses.contains("hidden")) falureClasses.remove("hidden");
  else {
    setTimeout(() => {
      falureClasses.add("hidden");
    }, 1000);
  }
};

let cleanInputSuggestion = () => {
  document.getElementById("answer-input").value = "";
};

(function () {
  // Get random word from collection
  const randomElement =
    document.words[Math.floor(Math.random() * document.words.length)];
  // Settup counters
  initCounters();
  // Set word to the front-end
  document.getElementById("guess-word").innerHTML = randomElement.contextWord;

  currentWord = randomElement.answers;

  // Attach Check button
  document.getElementById("check-button").onclick = handleCheck;
  document.getElementById("answer-input").onkeyup = enterCheck;
  // Attach Hint Event
  document.getElementById("hint-button").onclick = handleHint;
  // Attach Next Event
  document.getElementById("next-button").onclick = handleNextWord;
})();
