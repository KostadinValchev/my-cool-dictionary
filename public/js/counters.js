let idCounters = {
  success: "success-span",
  failure: "failure-span",
  hints: "hints-span",
};

let idDivCounters = {
  success: "success-span-container",
  failure: "failure-span-container",
  hints: "hint-span-container",
};

let initCounters = () => {
  createSession("success");
  createSession("failure");
  createSession("hints");
  document.getElementById("success-span").innerHTML = 0;
  document.getElementById("failure-span").innerHTML = 0;
  document.getElementById("hints-span").innerHTML = 0;
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
  shakingCounter("hints");
  increaseUICounter("hints");
  document.getElementById("answer-input").setAttribute("placeholder", hint);
};

let increaseWordCounter = (index, counterName) => {
  document.words[index][counterName]++;
};

let increaseUICounter = (name) => {
  let getId = idCounters[name];
  document.getElementById(getId).innerHTML = sessionStorage[name];
};

let shakingCounter = (name) => {
  let getId = idDivCounters[name];
  let element = document.getElementById(getId);
  element.classList.add("shaking");
  setTimeout(() => {
    element.classList.remove("shaking");
  }, 1000);
};
