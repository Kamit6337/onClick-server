import addZeroToDigit from "./addZeroToDigit.js";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  return `${addZeroToDigit(date)} ${monthsList[month]}, ${year}`;
};

export default currentDate;
