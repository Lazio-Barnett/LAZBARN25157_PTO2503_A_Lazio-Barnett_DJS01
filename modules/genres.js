// modules/genres.js
import { genres } from "../data.js";

/**
 * Build a map of genre id => title.
 * Keeps the logic small and easy to follow.
 * @returns {{[key:number]: string}}
 */
export function buildGenreMap() {
  const map = {};
  for (const g of genres) {
    map[g.id] = g.title;
  }
  return map;
}
