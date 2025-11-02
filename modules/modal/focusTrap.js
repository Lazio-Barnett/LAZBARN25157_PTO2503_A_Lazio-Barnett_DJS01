// modules/modal/focusTrap.js
/**
 * Very small focus trap: cycles focus inside a container while Tab is used.
 * Returns a cleanup function to detach the listener.
 * @param {HTMLElement} container
 * @returns {function():void}
 */
export function trapFocus(container) {
  const selectors =
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  const nodes = Array.from(container.querySelectorAll(selectors)).filter(
    (n) => !n.hasAttribute("disabled")
  );

  if (nodes.length === 0) return () => {};

  function onKey(e) {
    if (e.key !== "Tab") return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener("keydown", onKey);
  return () => container.removeEventListener("keydown", onKey);
}
