export const CallAPI = async <T>(
    url: string,
    method: string,
    body?: unknown
): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json() as T;
    } catch (error) {
        console.error(error);
        throw error;
    }
};