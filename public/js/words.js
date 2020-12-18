let answerCount = 1;

function addAnswer() {
  answerCount++;
  let newNode = createInput();
  const submitBtn = document.querySelector("#btn-word-submit");
  submitBtn.before(newNode);
}

function createInput() {
  // Div
  let div = document.createElement("div");
  div.classList.add("form-label-group");
  div.classList.add("mb-4");

  // Label
  let label = document.createElement("label");
  label.setAttribute("for", `native${answerCount}`);
  label.innerHTML = `Native answer ${answerCount}`;

  // Input
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", `native${answerCount}`);
  input.setAttribute("required", "");
  input.classList.add("form-control");

  div.appendChild(label);
  div.appendChild(input);
  return div;
}
