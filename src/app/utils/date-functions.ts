export const todayDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDate = (timestamp: number | string) => {
    if (typeof timestamp === 'string') {
        // If the timestamp is already a string, assume it's already formatted
        return timestamp;
    }
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};