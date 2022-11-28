type ClassValue = string | Record<string, boolean> | undefined;

export const cn = (...values: ClassValue[]) => {
  return values
    .flatMap((v) => {
      if (typeof v === 'undefined') {
        return [];
      }

      if (typeof v === 'string') {
        return v;
      }

      return Object.entries(v)
        .filter(([, value]) => !!value)
        .map(([key]) => key);
    })
    .join(' ');
};
