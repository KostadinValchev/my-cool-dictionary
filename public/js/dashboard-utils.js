let currentPage = 1;
let totalPages = 0;

const handleNextPage = async () => {
  let words = await getJSONData("http://localhost:3000/words/next-page");
  addTableRows(JSON.parse(words));
  currentPage++;
  checkBtns();
};

const handlePrevPage = async () => {
  let words = await getJSONData("http://localhost:3000/words/prev-page");
  addTableRows(JSON.parse(words));
  currentPage--;
  checkBtns();
};

const addTableRows = (data) => {
  let tbodyRef = document
    .getElementById("dashboard-word-table")
    .getElementsByTagName("tbody")[0];
  clearTableBody(tbodyRef);

  data.map((word, index) => {
    var row = tbodyRef.insertRow(index);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = word.contextWord;
    cell2.innerHTML = word.answers.native1;
  });
};

const clearTableBody = (tbodyRef) => {
  while (tbodyRef.hasChildNodes()) {
    tbodyRef.removeChild(tbodyRef.lastChild);
  }
};

let checkBtns = () => {
  let nextBtn = document.getElementById("next-btn");
  let prevBtn = document.getElementById("prev-btn");
  if (totalPages === 1) {
    nextBtn.classList.add("disabled");
    prevBtn.classList.add("disabled");
  } else if (currentPage === 1) {
    nextBtn.classList.add("disabled");
    totalPages === 2 ? prevBtn.classList.remove("disabled") : null;
  } else if (currentPage === totalPages) {
    prevBtn.classList.add("disabled");
    totalPages === 2 ? nextBtn.classList.remove("disabled") : null;
  } else {
    nextBtn.classList.remove("disabled");
    prevBtn.classList.remove("disabled");
  }
};

(function () {
  let totalWords = Number(document.getElementById("total-words").innerHTML);
  totalPages = Math.round(totalWords / 10);
})();
