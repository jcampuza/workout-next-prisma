export const KG_COEFFICIENT = 2.20462;

export const fix = (value: number) => Number(value.toFixed(1));

export const isNumeric = (str: string) => {
  if (typeof str != 'string') return false;
  return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
};
