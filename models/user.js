const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const firebase = require("firebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-cool-dictionary.firebaseio.com",
});
const firestore = admin.firestore();

const createWithEmailAndPassword = async (email, password) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return user;
  } catch (error) {
    console.log(error);
  }
};

const createProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    let { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWithEmailAndPassword,
  createProfileDocument,
  signInWithEmailAndPassword,
  logout,
};
