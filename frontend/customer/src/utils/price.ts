export const calculateDiscount = (bp: number, sp: number): string => {
  const discount = sp - bp;
  const percent = (discount / bp) * 100;
  return isNaN(percent) ? `0` : percent.toFixed(0);
};
