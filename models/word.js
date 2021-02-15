const firestore = require("../firebase/firebase.utils").firestore;
const { setCurrentDate, getFirstDayOfWeek } = require("../utils/dateConverter");

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
    let wordsRef = firestore
      .collection(userId)
      .orderBy("contextWord")
      .limit(10);
    let docSnapshots = await wordsRef.get();
    let lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1].data()
      .contextWord;
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
        return {
          contextWord: el.contextWord,
          score: el[prop],
          answers: el.answers,
        };
      });
  } catch (error) {
    console.log(error);
  }
};

const getDataFromToday = async (userId) => {
  try {
    let collectionRef = firestore.collection(userId);
    let today = setCurrentDate();
    let docSnapshots = await collectionRef
      .where("timestamp", "==", today)
      .get();
    let words = [...docSnapshots.docs.map((doc) => doc.data())];
    return JSON.stringify(words);
  } catch (error) {
    console.log(error);
  }
};

const getDataFromWeek = async (userId) => {
  try {
    let collectionRef = firestore.collection(userId);
    let target = getFirstDayOfWeek();
    let docSnapshots = await collectionRef
      .where("timestamp", "<=", target)
      .get();
    let words = [...docSnapshots.docs.map((doc) => doc.data())];
    return JSON.stringify(words);
  } catch (error) {
    console.log(error);
  }
};

const getNextPage = async (collectName, lastVisible) => {
  try {
    let collectionRef = firestore.collection(collectName);
    let docSnapshots = await collectionRef
      .orderBy("contextWord")
      .where("contextWord", ">", lastVisible)
      .limit(10)
      .get();
    let next = docSnapshots.docs[docSnapshots.docs.length - 1].data()
      .contextWord;
    let words = docSnapshots.docs
      .map((doc) => doc.data())
      .map((el) => {
        return { contextWord: el.contextWord, answers: el.answers };
      });
    return { words, next };
  } catch (error) {
    console.log(error);
  }
};

const getPrevPage = async (collectName, lastVisible) => {
  try {
    let collectionRef = firestore.collection(collectName);
    let docSnapshots = await collectionRef
      .orderBy("contextWord")
      .where("contextWord", "<", lastVisible)
      .limit(10)
      .get();
    let prev = docSnapshots.docs[docSnapshots.docs.length - 1].data()
      .contextWord;
    let words = docSnapshots.docs
      .map((doc) => doc.data())
      .map((el) => {
        return { contextWord: el.contextWord, answers: el.answers };
      });
    return { words, prev };
  } catch (error) {
    console.log(error);
  }
};

const additionsForWordDoc = (document) => {
  document.success = 0;
  document.failure = 0;
  document.hints = 0;
  document.timestamp = setCurrentDate();
  return document;
};

const updateWordData = async (userId, data) => {
  try {
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
            failure: word.failure,
            hints: word.hints,
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

const checkSetup = (req, res, next) => {
  req.session.user.setuped ? next() : res.redirect("/words/setup-exercise");
};

module.exports = {
  addWordDocument,
  getAllWordsFromDatabase,
  updateWordData,
  getFirstTenWordsFromDatabase,
  getCustomDocumentsOrderAndLimitData,
  getNextPage,
  getPrevPage,
  getDataFromToday,
  getDataFromWeek,
  checkSetup,
};
