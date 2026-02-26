import { useRef } from 'react';

export function useDebounce(fun, delay) {
    const timerRef = useRef(null);

    return function (...args) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            fun(...args);
        }, delay);
    }
}