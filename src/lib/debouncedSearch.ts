import { useEffect } from "react";

const useDebounce = (
    query: string,
    cb: (query: string) => Promise<void>,
    time: number
) => {
    useEffect(() => {
        if (!query) return;
        const debounce = setTimeout(() => {
            cb(query).catch((error) => {
                console.error("Error in debounced callback:", error);
            });
        }, time);

        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, time]);
};
export default useDebounce;