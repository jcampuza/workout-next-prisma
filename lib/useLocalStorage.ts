import { useEffect, useState } from 'react';

const parse = <T>(value: string): T | null => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const useLocalStorage = <T>(key: string, defaultValue: T | (() => T)) => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const stringItem = localStorage.getItem(key);
    if (!stringItem) {
      return;
    }

    const parsed = parse<T>(stringItem);
    if (!parsed) {
      return;
    }

    setState(parsed);
  }, [key]);

  const setStateWrapper: typeof setState = (value) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setStateWrapper] as const;
};
