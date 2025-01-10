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

export function transformToUrlFriendly(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove any non-alphanumeric characters except for spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .trim(); // Trim any leading/trailing spaces
}

// Example usage:
const title =
  "KSL Capital to Invest $21M in W Maldives, Restart Sheraton Maldives Renovation";
const urlFriendlyTitle = transformToUrlFriendly(title);

console.log(urlFriendlyTitle); // "ksl-capital-to-invest-21m-in-w-maldives-restart-sheraton-maldives-renovation"
