/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';


export const useDebouncedValue = (input: string = '', time: number = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(time);
        };

    }, [input]);

    return debouncedValue;
};
