const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const afterTomorrow = new Date(today);
afterTomorrow.setDate(afterTomorrow.getDate() + 2);

const formatDate = (date) => {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}/${month}/${day}`;
};

const formatShortDate = (date) => {
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${day}/${month}`;
};

const longToday = formatDate(today);
const shortToday = formatShortDate(today);
const shortTomorrow = formatShortDate(tomorrow);
const shortAfter = formatShortDate(afterTomorrow);

export {longToday, shortToday, shortTomorrow, shortAfter};