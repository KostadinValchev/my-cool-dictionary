const { setCurrentDate, getFirstDayOfWeek } = require("../utils/dateConverter");
let pattern;
let today;
beforeEach(() => {
  let dt = new Date();
  today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
  pattern = /\d{4}\/\d{1,2}\/\d{1,2}/;
});
describe("setCurrentDate", () => {
  test("setCurrentDate function exists", () => {
    expect(setCurrentDate).toBeDefined();
  });

  test("Should be truthy", () => {
    expect(setCurrentDate).toBeTruthy();
  });

  test("Should be falsy", () => {
    expect(setCurrentDate).not.toBeFalsy();
  });
  test("Should be non-null", () => {
    expect(setCurrentDate()).not.toBeNull();
  });
  test("Should not be undefined", () => {
    expect(setCurrentDate()).not.toBeUndefined();
  });
  test("Should return string", () => {
    expect(typeof setCurrentDate()).toBe("string");
  });
  test("Should match pattern", () => {
    expect(setCurrentDate()).toMatch(pattern);
  });
  test("Should be equal to today's date", () => {
    expect(setCurrentDate()).toEqual(today);
  });
});

describe("getFirstDayOfWeek", () => {
  test("getFirstDayOfWeek function exists", () => {
    expect(getFirstDayOfWeek).toBeDefined();
  });

  test("Should be truthy", () => {
    expect(getFirstDayOfWeek).toBeTruthy();
  });

  test("Should be falsy", () => {
    expect(getFirstDayOfWeek).not.toBeFalsy();
  });
  test("Should be non-null", () => {
    expect(getFirstDayOfWeek()).not.toBeNull();
  });
  test("Should not be undefined", () => {
    expect(getFirstDayOfWeek()).not.toBeUndefined();
  });
  test("Should return string", () => {
    expect(typeof getFirstDayOfWeek()).toBe("string");
  });
  test("Should match pattern", () => {
    expect(getFirstDayOfWeek()).toMatch(pattern);
  });
});
