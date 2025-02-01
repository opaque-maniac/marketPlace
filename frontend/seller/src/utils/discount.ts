export const calculateDiscount = (bp: number, sp: number): string => {
  const discount = bp - sp;
  const percent = (discount / bp) * 100;
  return isNaN(percent) ? `0` : percent.toFixed(0);
};
