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

// Get Status for current competition
let getResults = () => {
  return {
    success: Number(sessionStorage["success"]),
    falure: Number(sessionStorage["falure"]),
    hints: Number(sessionStorage["hints"]),
  };
};

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
  let answers = Object.values(currentWord.answers);
  if (answers.includes(bgInput.value)) {
    toggleSuccessAlert();
    increaseSession("success");
    increaseWordCounter(currentWord.index, "success");
    increaseUICounter("success");
    setTimeout(() => {
      toggleSuccessAlert();
      cleanInputSuggestion();
      setNewWord();
    }, 1000);
  } else {
    toggleFalureAlert();
    toggleFalureAlert();
    increaseSession("falure");
    increaseWordCounter(currentWord.index, "falure");
    increaseUICounter("falure");
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
  let hint = makeHint(currentWord.answers);
  increaseSession("hints");
  increaseWordCounter(currentWord.index, "hints");
  increaseUICounter("hints");
  document.getElementById("answer-input").setAttribute("placeholder", hint);
};

// <----- DOM  ----->

// Set New Word
let setNewWord = () => {
  let index = Math.floor(Math.random() * document.words.length);
  const randomElement = document.words[index];
  document.getElementById("guess-word").innerHTML = randomElement.contextWord;
  document.getElementById("answer-input").removeAttribute("placeholder");
  currentWord = { index: index, answers: randomElement.answers };
};

let handleNextWord = () => {
  cleanInputSuggestion();
  increaseSession("falure");
  increaseWordCounter(currentWord.index, "falure");
  increaseUICounter("falure");
  setNewWord();
};

// Increase counters

let increaseWordCounter = (index, counterName) => {
  document.words[index][counterName]++;
};

let increaseUICounter = (name) => {
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

const handleFinishCompetition = () => {
  if (confirm("Are you sure you want to finish competition?")) {
    let score = getResults();
    postData("http://localhost:3000/words/finish-competition", {
      score,
      data: document.words,
    }).then(() => {
      window.location.replace("http://localhost:3000/");
    });
  }
};

(function () {
  // Get random word from collection
  setNewWord();
  // Settup counters
  initCounters();

  // Attach Check button
  document.getElementById("check-button").onclick = handleCheck;
  document.getElementById("answer-input").onkeyup = enterCheck;
  // Attach Event Hint
  document.getElementById("hint-button").onclick = handleHint;
  // Attach Event for next word
  document.getElementById("next-button").onclick = handleNextWord;
  // Attach Event for finishing current competition
  document.getElementById("finish-button").onclick = handleFinishCompetition;
})();
