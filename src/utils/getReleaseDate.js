export const getReleaseDate = (dateString, lang) => {
 const date = new Date(dateString);

 const day = date.getDay() + 1;

 let month = getMonths(lang)[date.getMonth()];
 if (lang === 'ru') {
  month = month[month.length - 1] === 'ь' ?
   month.slice(0, -1) + 'я' :
   month[month.length - 1] === 'й' ?
    month.slice(0, -1) + 'я' :
    month + 'а'
 }

 const year = date.getFullYear();

 if (lang === 'en') {
  return `${month} ${day}, ${year}`
 } else {
  return `${day} ${month} ${year} г.`
 }
}


const getMonths = (lang) => {
 return Array.from({ length: 12 },
  (_, i) => new Intl.DateTimeFormat(lang, { month: 'long' }).format(new Date(0, i))
 );
}
