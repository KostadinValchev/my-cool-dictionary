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
    failure: Number(sessionStorage["failure"]),
    hints: Number(sessionStorage["hints"]),
  };
};

const handleCheckWord = () => {
  const input = document.getElementById("answer-input").value.toLowerCase();
  let answers = Object.values(currentWord.answers);
  if (answers.includes(input)) {
    toggleSuccessAlert();
    increaseSession("success");
    increaseWordCounter(currentWord.index, "success");
    shakingCounter("success");
    increaseUICounter("success");
    setTimeout(() => {
      toggleSuccessAlert();
      cleanInputSuggestion();
      setNewWord();
    }, 1000);
  } else {
    toggleFailureAlert();
    toggleFailureAlert();
    increaseSession("failure");
    increaseWordCounter(currentWord.index, "failure");
    shakingCounter("failure");
    increaseUICounter("failure");
  }
};

const enterCheck = (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    handleCheckWord();
  }
};

let setNewWord = () => {
  let index = Math.floor(Math.random() * document.words.length);
  const randomElement = document.words[index];
  document.getElementById("guess-word").innerHTML = randomElement.contextWord;
  document.getElementById("answer-input").removeAttribute("placeholder");
  currentWord = { index: index, answers: randomElement.answers };
};

let handleNextWord = () => {
  cleanInputSuggestion();
  increaseSession("failure");
  increaseWordCounter(currentWord.index, "failure");
  shakingCounter("failure");
  increaseUICounter("failure");
  setNewWord();
};

let cleanInputSuggestion = () => {
  document.getElementById("answer-input").value = "";
};

const handleFinishCompetition = () => {
  let score = getResults();
  postData("http://localhost:3000/words/finish-competition", {
    score,
    data: document.words,
  })
    .then((res) => {
      showMsg("success", "You have successfully completed!");
      setTimeout(() => {
        window.location.replace("http://localhost:3000/");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      showMsg("failure", "Opps something went wrong. Invalid data!");
    });
};

function initCompetition() {
  // Get random word from collection
  setNewWord();
  // Settup counters
  initCounters();

  // Attach Check button
  document.getElementById("check-button").onclick = handleCheckWord;
  document.getElementById("answer-input").onkeyup = enterCheck;
  // Attach Event Hint
  document.getElementById("hint-button").onclick = handleHint;
  // Attach Event for next word
  document.getElementById("next-button").onclick = handleNextWord;
  // Attach Event for finishing current competition
  document.getElementById("finish-button").onclick = handleFinishCompetition;
}
