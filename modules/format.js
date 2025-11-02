// modules/format.js
/**
 * Turn an ISO date into a short readable string.
 * Example: "Nov 3, 2022"
 * @param {string} iso
 * @returns {string}
 */
export function humanDate(iso) {
  const d = new Date(iso);
  // Use user's locale for formatting
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
