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

module.exports = {
  init,
};
