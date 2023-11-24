export const getFormattedDay = (daysShift?: number): string => {
 if (daysShift) {
  const now = new Date();
  now.setDate(now.getDate() + daysShift);
  return now.toISOString().split('T')[0];
 }
 return new Date().toISOString().split('T')[0];
}