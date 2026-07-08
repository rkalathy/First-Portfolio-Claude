// Entry point — wires up modules on DOMContentLoaded. Loaded as <script type="module">.
import { initNavigation } from "./modules/navigation.js";
import { initScrollSpy } from "./modules/scrollSpy.js";
import { initLazyLoad } from "./modules/lazyLoad.js";
import { renderCards } from "./modules/renderCards.js";
import { initFooterYear } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollSpy();
  initLazyLoad();
  renderCards();
  initFooterYear();
});
