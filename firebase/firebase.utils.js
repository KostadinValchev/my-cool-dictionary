const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

async function init() {
  firebase.initializeApp(firebaseConfig);
}

// const auth = firebase.auth();

module.exports = {
  init,
};
