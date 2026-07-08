// Lazy-loads images marked with data-src using IntersectionObserver.
export function initLazyLoad() {
  const images = document.querySelectorAll("img[data-src]");
  if (!images.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      obs.unobserve(img);
    });
  });

  images.forEach((img) => observer.observe(img));
}
