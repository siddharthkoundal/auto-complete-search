import { useState, useEffect } from "react";

export function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value); // update only after user stops typing
        }, delay);

        return () => clearTimeout(timer); // cancel previous timer on every value change
    }, [value, delay]);

    return debouncedValue;
}

/*
  HOW TO USE IN App.jsx:

  import { useDebouncedValue } from "./useDebouncedValue";

  const debouncedInput = useDebouncedValue(input, 300);

  useEffect(() => {
    if (!debouncedInput.trim()) return;
    fetchData(debouncedInput);
  }, [debouncedInput]);  // ← watches debouncedInput, not input

  onChange={(e) => setInput(e.target.value)}  // ← simple, no manual debounce call
*/
