export const getBudgetString = (num) => {
 const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
 });
 return USDollar.format(num)
}