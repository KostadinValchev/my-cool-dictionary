const firestore = require("../firebase/firebase.utils").firestore;
const { setCurrentDate } = require("../utils/dateConverter");

const addWordDocument = async (userId, additionalData) => {
  additionalData.timestamp = setCurrentDate();
  firestore.collection(userId).doc().set(additionalData);
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

module.exports = { addWordDocument, getAllWordsFromDatabase };
