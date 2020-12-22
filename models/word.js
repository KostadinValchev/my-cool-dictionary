const firestore = require("../firebase/firebase.utils").firestore;
const { setCurrentDate } = require("../utils/dateConverter");

const addWordDocument = async (userId, additionalData) => {
  additionalData.timestamp = setCurrentDate();
  firestore.collection(userId).doc().set(additionalData);
};

module.exports = { addWordDocument };
