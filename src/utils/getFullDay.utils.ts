export const getFullDay = (day?: any): string => {
    if(!day) return "";

    return new Date(day).toLocaleDateString("VN-vi")
} 