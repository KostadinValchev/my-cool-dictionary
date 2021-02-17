const setCurrentDate = () => {
  let dt = new Date();

  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

const getFirstDayOfWeek = () => {
  let today = new Date().getDay();
  if (today === 1) return setCurrentDate();
  let dt = new Date(Date.now() - (today - 1) * 24 * 60 * 60 * 1000);
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

module.exports = { setCurrentDate, getFirstDayOfWeek };
