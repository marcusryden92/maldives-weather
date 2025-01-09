export const formatHourString = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export function convertDateFormat(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-indexed month
  return `${day}/${month}`;
}

export function getCurrentYear(): number {
  const currentYear: number = new Date().getFullYear();
  return currentYear;
}

export function getCurrentMonth(): number {
  const currentMonth: number = new Date().getMonth() + 1; // Adding 1 to make it 1-based
  return currentMonth;
}
