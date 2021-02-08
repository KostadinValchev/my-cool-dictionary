const MESSAGE_TYPE = {
  success: ["alert", "alert-success"],
  failure: ["alert", "alert-danger"],
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

let toggleFailureAlert = () => {
  let failureClasses = document.getElementById("failure").classList;
  if (failureClasses.contains("hidden")) failureClasses.remove("hidden");
  else {
    setTimeout(() => {
      failureClasses.add("hidden");
    }, 1000);
  }
};
