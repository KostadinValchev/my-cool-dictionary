const { firestore, update } = require("../firebase/firebase.utils");
const firebase = require("firebase");

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
        competitions: 0,
        falure: 0,
        hints: 0,
        success: 0,
        totalWords: 0,
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
    // retrieveIdToken();
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

const increaseUserTotalWordsCounter = (userId) => {
  try {
    let docRef = firestore.collection("users").doc(userId);
    docRef.update({ totalWords: update.FieldValue.increment(1) });
  } catch (error) {
    console.log(error);
  }
};

const increaseUserCountersAftCompetition = (userId, score) => {
  try {
    let docRef = firestore.collection("users").doc(userId);
    docRef.update({
      competitions: update.FieldValue.increment(1),
      success: update.FieldValue.increment(score.success),
      falure: update.FieldValue.increment(score.falure),
      hints: update.FieldValue.increment(score.hints),
    });
  } catch (error) {
    console.log(error);
  }
};

const onAuthStateChanged = (req, res, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) next();
  });
};

// Redirection middlewares
const redirectLogin = (req, res, next) => {
  !req.session.user ? res.redirect("/users/login") : next();
};

const redirectHome = (req, res, next) => {
  req.session.user ? res.redirect("/") : next();
};

module.exports = {
  createWithEmailAndPassword,
  createProfileDocument,
  signInWithEmailAndPassword,
  logout,
  onAuthStateChanged,
  redirectHome,
  redirectLogin,
  increaseUserTotalWordsCounter,
  increaseUserCountersAftCompetition,
};
