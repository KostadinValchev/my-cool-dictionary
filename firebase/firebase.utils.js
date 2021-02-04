const firebase = require("firebase");
const serviceAccount = require("../serviceAccountKey.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-cool-dictionary.firebaseio.com",
});

const firestore = admin.firestore();
const update = admin.firestore;

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
  firestore,
  update,
};
