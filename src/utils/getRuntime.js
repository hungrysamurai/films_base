export const getRuntime = (mins, lang) => {
 const totalHours = Math.floor(mins / 60);
 const appMins = mins % 60;

 let hoursEndString;
 let minutesEndString;

 if (lang === 'ru') {

  const hoursString = String(totalHours);
  const minsString = String(appMins);

  if (hoursString[hoursString.length - 1] === '1') {
   hoursEndString = 'час'
  } else if (
   Number(hoursString[hoursString.length - 1]) > 1 &&
   Number(hoursString[hoursString.length - 1]) < 5) {
   hoursEndString = 'часа'
  } else {
   hoursEndString = 'часов'
  }


  if (minsString[minsString.length - 1] === '1') {
   minutesEndString = 'минута';
  } else if (
   Number(minsString[minsString.length - 1]) > 1 &&
   Number(minsString[minsString.length - 1]) < 5) {
   minutesEndString = 'минуты';
  } else {
   minutesEndString = 'минут';
  }

  if (minsString === '11' || minsString === '12' || minsString === '13' || minsString === '14') {
   minutesEndString = 'минут';
  }

  if (totalHours === 0) {
   return `${minsString} ${minutesEndString}`
  }

  if (appMins === 0) {
   return `${hoursString} ${hoursEndString}`
  }

  return `${hoursString} ${hoursEndString} ${minsString} ${minutesEndString}`
 }

 if (lang === 'en') {

  if (totalHours === 1) {
   hoursEndString = 'hour'
  } else {
   hoursEndString = 'hours'
  }

  if (appMins === 1) {
   minutesEndString = 'minute'
  } else {
   minutesEndString = 'minutes'
  }

  if (totalHours === 0) {
   return `${appMins} ${minutesEndString}`
  }

  return `${totalHours} ${hoursEndString} ${appMins} ${minutesEndString}`
 }
}