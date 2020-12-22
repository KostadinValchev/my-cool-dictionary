const setCurrentDate = () => {
  var dt = new Date();
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

module.exports = { setCurrentDate };
