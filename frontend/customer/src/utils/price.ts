export const calculateDiscount = (bp: number, sp: number): string => {
  const discount = sp - bp;
  const percent = (discount / bp) * 100;
  return isNaN(percent) ? `0` : percent.toFixed(0);
};

export const priceRanges: number[] = [
  0, 500, 1000, 2000, 3000, 4000, 5000, 10000, 100000, 1000000,
];

export const categoriesArray = [
  "",
  "ELECTRONICS",
  "FASHION",
  "HOME",
  "BEAUTY",
  "SPORTS",
  "FOOD",
  "BOOKS",
  "TOYS",
  "OTHER",
];
