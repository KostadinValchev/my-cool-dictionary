(function () {
  let data = document.getElementById("words-collection").innerHTML;
  var words = JSON.parse(data);
  document.words = words;
})();
