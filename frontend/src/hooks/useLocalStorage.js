import { useState } from "react";

export const useLocalStorage = (key, initialVal) => {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initialVal;
    } catch (e) {
      return initialVal;
    }
  });

  const setValue = (val) => {
    setState(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [state, setValue];
};
