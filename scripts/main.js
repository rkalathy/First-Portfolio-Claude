import { renderCards } from "./modules/renderCards.js";
import { initFooterYear } from "./modules/footer.js";
import { initNavToggle } from "./modules/nav.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  initFooterYear();
  initNavToggle();
});
