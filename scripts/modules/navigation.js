// Mobile nav toggle.
export function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector('.site-header nav[aria-label="Primary"]');
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") setOpen(false);
  });
}
