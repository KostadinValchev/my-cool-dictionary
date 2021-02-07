const firestore = require("../firebase/firebase.utils").firestore;
const { setCurrentDate } = require("../utils/dateConverter");

const addWordDocument = async (userId, additionalData) => {
  let word = additionsForWordDoc(additionalData);
  firestore.collection(userId).doc().set(word);
};

const getAllWordsFromDatabase = async (userId) => {
  try {
    let wordsRef = firestore.collection(userId);
    let allWords = await wordsRef.get();
    let result = [];
    for (const doc of allWords.docs) {
      result.push(doc.data());
    }
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
};

const getFirstTenWordsFromDatabase = async (userId) => {
  try {
    let wordsRef = firestore.collection(userId).limit(10);
    let docSnapshots = await wordsRef.get();
    let lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1];
    let words = docSnapshots.docs.map((doc) => doc.data());
    return { words, lastVisible };
  } catch (error) {
    console.log(error);
  }
};

const getCustomDocumentsOrderAndLimitData = async (
  collectName,
  prop,
  quantity
) => {
  try {
    let collectionRef = firestore.collection(collectName);
    let documents = await collectionRef
      .orderBy(prop, "desc")
      .limit(quantity)
      .get();
    return documents.docs
      .map((doc) => doc.data())
      .map((el) => {
        return { contextWord: el.contextWord, score: el[prop] };
      });
  } catch (error) {
    console.log(error);
  }
};

const additionsForWordDoc = (document) => {
  document.success = 0;
  document.falure = 0;
  document.hints = 0;
  document.timestamp = setCurrentDate();
  return document;
};

const updateWordData = async (userId, data) => {
  let wordsRef = firestore.collection(userId);
  data.map((word) => {
    wordsRef
      .where("contextWord", "==", word.contextWord)
      .limit(1)
      .get()
      .then((query) => {
        const thing = query.docs[0];
        thing.ref.update({
          success: word.success,
          falure: word.falure,
          hints: word.hints,
        });
      });
  });
};

const setNewScoreResultFromUser = async (userId, score) => {
  try {
    await firestore
      .collection("scores")
      .doc()
      .set({ userId, score, timestamp: new Date() });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addWordDocument,
  getAllWordsFromDatabase,
  updateWordData,
  setNewScoreResultFromUser,
  getFirstTenWordsFromDatabase,
  getCustomDocumentsOrderAndLimitData,
};
