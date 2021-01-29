const MESSAGE_TYPE = {
  success: ["alert", "alert-success"],
  falure: ["alert", "alert-danger"],
};

const showError = (type, msg) => {
  let errorContainer = document.getElementsByClassName("error-container")[0];
  let el = document.createElement("div");
  el.classList.add(...MESSAGE_TYPE[type]);
  el.innerHTML = msg;
  errorContainer.appendChild(el);
  setTimeout(() => {
    errorContainer.removeChild(el);
  }, 5000);
};
