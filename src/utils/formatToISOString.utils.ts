export const formatToISOString = (date: any) => {
  if (!date) return null;

  // Firestore Timestamp dạng { seconds, nanoseconds }
  if (typeof date === "object" && date.seconds) {
    const jsDate = new Date(date.seconds * 1000);
    return jsDate.toISOString();
  }

  // Nếu đã là ISO string hoặc Date bình thường
  const jsDate = new Date(date);
  return isNaN(jsDate.getTime()) ? null : jsDate.toISOString();
};
