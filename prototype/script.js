document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const header = document.querySelector(".site-header");
let lastScroll = 0;

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;
      header.classList.toggle("is-scrolled", currentScroll > 18);
      lastScroll = currentScroll;
    },
    { passive: true }
  );
  header.classList.toggle("is-scrolled", lastScroll > 18);
}

const filterButtons = document.querySelectorAll(".filter");
const networkRows = document.querySelectorAll(".network-row");

function applyLocationFilter(filter) {
  networkRows.forEach((row) => {
    const services = row.dataset.service;
    const visible =
      filter === "all" ||
      (filter === "conversion" && (services === "both" || services === "conversion")) ||
      (filter === "fueling" && (services === "both" || services === "fueling"));
    row.classList.toggle("is-hidden", !visible);
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyLocationFilter(button.dataset.filter));
});
