/**
 * Format date time to string using 12 hours format DD/MM/YYYY hh:mm:ss
 * @param {Date} date 
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;

  const strTime = hours + ':' + minutes + ' ' + ampm;

  return date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear() + '  ' + strTime;
}
