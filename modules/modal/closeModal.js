// modules/modal/closeModal.js
let _lastTrigger = null;

/**
 * Save the element that opened the modal so we can restore focus on close.
 * @param {HTMLElement|null} el
 */
export function rememberOpener(el) {
  _lastTrigger = el;
}

/**
 * Remove modal overlay and restore state (scroll + focus).
 */
export function closeModal() {
  const overlay = document.querySelector(".modal-overlay");
  if (!overlay) return;

  overlay.remove();
  document.body.style.overflow = "";

  if (_lastTrigger && typeof _lastTrigger.focus === "function") {
    _lastTrigger.focus();
  }
  _lastTrigger = null;
}
