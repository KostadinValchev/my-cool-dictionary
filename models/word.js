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

const additionsForWordDoc = (document) => {
  document.success = 0;
  document.falure = 0;
  document.hints = 0;
  document.timestamp = setCurrentDate();
  return document;
};

module.exports = { addWordDocument, getAllWordsFromDatabase };
