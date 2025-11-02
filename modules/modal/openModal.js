// modules/modal/openModal.js
import { podcasts, seasons } from "../../data.js";
import { renderModal } from "./renderModal.js";
import { trapFocus } from "./focusTrap.js";
import { closeModal as doCloseModal, rememberOpener } from "./closeModal.js";

/**
 * Open the modal for a showId (string or number). Attaches event handlers
 * and manages focus. Keeps implementation straightforward.
 * @param {string|number} showId
 * @param {HTMLElement|null} openerEl
 */
export function openModal(showId, openerEl = null) {
  const idStr = String(showId);
  const show = podcasts.find((s) => String(s.id) === idStr);
  if (!show) return;

  // find matching seasons entry and normalize
  const seasonsEntry = seasons.find((s) => String(s.id) === idStr);
  const seasonList = (seasonsEntry?.seasonDetails || []).map((s) => ({
    title: s.title,
    episodes: s.episodes,
    subtitle: s.subtitle || "",
  }));

  // render overlay and important nodes
  const { overlay, closeBtn, firstFocusable } = renderModal(show, seasonList);

  // mount
  const mountPoint = document.getElementById("modal-root") || document.body;
  // lock scroll
  document.body.style.overflow = "hidden";
  mountPoint.appendChild(overlay);

  // focus management
  rememberOpener(openerEl);
  firstFocusable.focus();

  const cleanupTrap = trapFocus(overlay);

  // close helpers
  function tidyUp() {
    cleanupTrap();
    window.removeEventListener("keydown", onKey);
    overlay.removeEventListener("click", onOverlayClick);
    closeBtn.removeEventListener("click", onCloseClick);
    doCloseModal();
  }

  function onOverlayClick(e) {
    if (e.target?.dataset?.modalOverlay === "true") tidyUp();
  }

  function onKey(e) {
    if (e.key === "Escape") tidyUp();
  }

  function onCloseClick() {
    tidyUp();
  }

  // wire events
  overlay.addEventListener("click", onOverlayClick);
  window.addEventListener("keydown", onKey);
  closeBtn.addEventListener("click", onCloseClick);
}
