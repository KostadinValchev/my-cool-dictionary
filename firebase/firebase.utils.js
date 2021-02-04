const firebase = require("firebase");
const serviceAccount = require("../serviceAccountKey.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-cool-dictionary.firebaseio.com",
});

const firestore = admin.firestore();

const firebaseConfig = {
  apiKey: "AIzaSyCuMipkdQlrPcCOoKpIAbRoiNMa8IJQzhU",
  authDomain: "my-cool-dictionary.firebaseapp.com",
  databaseURL: "https://my-cool-dictionary.firebaseio.com",
  projectId: "my-cool-dictionary",
  storageBucket: "my-cool-dictionary.appspot.com",
  messagingSenderId: "659096318566",
  appId: "1:659096318566:web:71bc779a101bb3591fb3a7",
  measurementId: "G-REL5DP3HD2",
};

async function init() {
  firebase.initializeApp(firebaseConfig);
}

module.exports = {
  init,
  firestore,
};
