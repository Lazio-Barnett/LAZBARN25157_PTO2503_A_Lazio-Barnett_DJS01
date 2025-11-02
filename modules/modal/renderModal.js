// modules/modal/renderModal.js
import { humanDate } from "../format.js";
import { buildGenreMap } from "../genres.js";

/**
 * Build the modal overlay DOM for a given podcast object and seasons list.
 * Returns key elements so caller can attach interactions.
 * @param {object} show
 * @param {Array<{title:string, episodes:number, subtitle?:string}>} seasonList
 */
export function renderModal(show, seasonList) {
  const genreMap = buildGenreMap();

  // overlay
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.dataset.modalOverlay = "true";

  // modal shell
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");

  // aria ids
  const titleId = `dialog-title-${show.id}`;
  const descId = `dialog-desc-${show.id}`;
  modal.setAttribute("aria-labelledby", titleId);
  modal.setAttribute("aria-describedby", descId);
  modal.setAttribute("aria-modal", "true");

  // header
  const header = document.createElement("div");
  header.className = "modal__header";

  const h2 = document.createElement("h2");
  h2.className = "modal__title";
  h2.id = titleId;
  h2.textContent = show.title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal__close";
  closeBtn.setAttribute("aria-label", "Close dialog");
  closeBtn.innerHTML = "×";

  header.append(h2, closeBtn);

  // scroll body
  const scroll = document.createElement("div");
  scroll.className = "modal__scroll";

  // intro panel (cover + description)
  const intro = document.createElement("div");
  intro.className = "intro";

  const media = document.createElement("div");
  media.className = "intro__media";
  const cover = document.createElement("img");
  cover.src = show.image;
  cover.alt = `${show.title} cover`;
  media.appendChild(cover);

  const descWrap = document.createElement("div");
  descWrap.className = "intro__desc";
  const descTitle = document.createElement("p");
  descTitle.className = "intro__desc-title";
  descTitle.textContent = "Description";
  const desc = document.createElement("p");
  desc.className = "intro__desc-text";
  desc.id = descId;
  desc.textContent = show.description;

  descWrap.append(descTitle, desc);

  intro.append(media, descWrap);

  // tags + updated
  const metaBlock = document.createElement("div");
  metaBlock.className = "meta-block";

  const tags = document.createElement("div");
  tags.className = "tags";
  for (const g of show.genres || []) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = genreMap[g] ?? "Unknown";
    tags.appendChild(tag);
  }

  const updated = document.createElement("span");
  updated.className = "updated";
  updated.textContent = `Last updated: ${humanDate(show.updated)}`;

  metaBlock.append(tags, updated);

  // seasons
  const seasonsTitle = document.createElement("p");
  seasonsTitle.className = "section-title";
  seasonsTitle.textContent = "Seasons";

  const seasonsPanel = document.createElement("div");
  seasonsPanel.className = "seasons-panel";

  for (const s of seasonList) {
    const row = document.createElement("div");
    row.className = "season";

    const left = document.createElement("div");
    left.className = "season__left";

    const t = document.createElement("h3");
    t.className = "season__title";
    t.textContent = s.title;

    const sub = document.createElement("p");
    sub.className = "season__subtitle";
    sub.textContent = s.subtitle || " ";

    const count = document.createElement("span");
    count.className = "season__count";
    count.textContent = `${s.episodes} ${
      s.episodes === 1 ? "episode" : "episodes"
    }`;

    left.append(t, sub);
    row.append(left, count);
    seasonsPanel.appendChild(row);
  }

  // assemble
  scroll.append(intro, metaBlock, seasonsTitle, seasonsPanel);
  modal.append(header, scroll);
  overlay.appendChild(modal);

  // first focus target
  const firstFocusable = closeBtn;

  return { overlay, closeBtn, firstFocusable };
}
