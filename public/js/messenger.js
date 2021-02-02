const MESSAGE_TYPE = {
  success: ["alert", "alert-success"],
  falure: ["alert", "alert-danger"],
};

const showMsg = (type, msg) => {
  let errorContainer = document.getElementsByClassName("error-container")[0];
  let el = document.createElement("div");
  el.classList.add(...MESSAGE_TYPE[type]);
  el.innerHTML = msg;
  errorContainer.appendChild(el);
  setTimeout(() => {
    errorContainer.removeChild(el);
  }, 5000);
};

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
