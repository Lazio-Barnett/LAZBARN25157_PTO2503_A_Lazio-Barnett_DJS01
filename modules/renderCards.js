// modules/renderCards.js
import { podcasts } from "../data.js";
import { humanDate } from "./format.js";
import { buildGenreMap } from "./genres.js";
import { openModal } from "./modal/openModal.js";

const genreLookup = buildGenreMap();

/**
 * Show all podcasts on the homepage.
 */
export function mountAllCards() {
  renderList(podcasts);
}

/**
 * Create all cards from a list of shows.
 * @param {Array} list
 */
export function renderList(list) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  list.forEach((show) => {
    const card = createCard(show);
    container.appendChild(card);
  });
}

/**
 * Build an individual podcast card.
 * @param {object} show
 * @returns {HTMLElement}
 */
function createCard(show) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "listitem");

  // --- Cover image ---
  const img = document.createElement("img");
  img.alt = `${show.title} cover image`;
  img.className = "card-image"; // Add this line

  // Remove height: 0 and padding-bottom from the image element
  img.style.width = "100%";
  img.style.height = "225px"; // Add fixed height

  // ✅ fallback image + faster rendering
  img.src =
    show.image && show.image.trim() !== ""
      ? show.image
      : "https://via.placeholder.com/400x225?text=No+Image";
  img.loading = "lazy"; // improves performance

  // --- Card body ---
  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = show.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `📚 ${show.seasons} ${
    show.seasons === 1 ? "season" : "seasons"
  } • Updated ${humanDate(show.updated)}`;

  const chips = document.createElement("div");
  chips.className = "chips";

  (show.genres || []).forEach((id) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = genreLookup[id] ?? "Unknown";
    chips.appendChild(chip);
  });

  // --- Assemble card ---
  body.append(title, meta, chips);
  card.append(img, body);

  // --- Click + Keyboard interactions ---
  card.addEventListener("click", () => openModal(String(show.id), card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(String(show.id), card);
    }
  });

  return card;
}
