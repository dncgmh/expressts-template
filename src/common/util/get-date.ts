/**
 *
 *
 * @param {Date} [date=new Date()]
 * @returns {Date} a start of a date
 */
export const getStartOfDate = (date: Date = new Date()): Date => {
  !(date instanceof Date) && (date = new Date(date));
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  return new Date(year, month, day);
};
/**
 *
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Date[]} array of date
 */
export const getDateArray: { (start: Date, end: Date): Date[] } = (start, end): Date[] => {
  const dateList = [];
  const date = new Date(start);
  while (date < end) {
    dateList.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dateList;
};

export const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
