(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const yearNodes = document.querySelectorAll("[data-current-year]");
  yearNodes.forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  if (menuButton && navigation) {
    const setMenuOpen = (open) => {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", open);
    };
    menuButton.addEventListener("click", () => {
      setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 761px)").matches) setMenuOpen(false);
    }, { passive: true });
  }

  const printButton = document.querySelector("[data-print]");
  if (printButton) printButton.addEventListener("click", () => window.print());

  // A lightweight reading-progress indicator, with no third-party dependency.
  const header = document.querySelector(".site-header");
  if (header) {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<span></span>";
    header.append(progress);
    const bar = progress.firstElementChild;
    let scheduled = false;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
      scheduled = false;
    };
    window.addEventListener("scroll", () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
  }

  // Reveal content as it enters view; content stays visible if the API is unavailable.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = document.querySelectorAll(
    ".page-hero-inner, .section-heading-row, .split-grid, .values-layout, .quote-inner, .contact-panel, .privacy-panel, .cv-sheet, .service-card, .portfolio-card, .portfolio-detail-card, .credential-card, .values-list article"
  );
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealTargets.forEach((element) => observer.observe(element));
  }
})();