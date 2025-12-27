export function formatCount(value?: number | null): string {
  if (value == null || isNaN(value)) return "0";

  if (value < 1000) return String(value);

  const units = ["K", "M", "B"];
  let unitIndex = -1;
  let num = value;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return `${parseFloat(num.toFixed(1))}${units[unitIndex]}`;
}
