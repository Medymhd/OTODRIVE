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

function setFormStatus(form, message) {
  const scope = form.closest("[data-form-scope]") || form.parentElement;
  const status = scope ? scope.querySelector("[data-form-status]") : null;

  if (status) {
    status.hidden = false;
    status.textContent = message;
  }
}

function encodeFormValue(value) {
  return encodeURIComponent(value).replace(/%0A/g, "%0D%0A");
}

document.querySelectorAll("form[data-mailto]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const lines = [];

    data.forEach((value, key) => {
      const text = String(value).trim();
      if (text && key !== "subject") {
        lines.push(`${key}: ${text}`);
      }
    });

    const subject = form.dataset.subject || "Otodrive website enquiry";
    const body = lines.join("\r\n");
    window.location.href = `mailto:info@otodrive.co.ke?subject=${encodeFormValue(subject)}&body=${encodeFormValue(body)}`;
    setFormStatus(
      form,
      "Your email app should open with the message ready to send. If it does not, call +254 704 644 909 or email info@otodrive.co.ke."
    );
  });
});

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

const autoplayVideo = document.querySelector("[data-autoplay-on-view]");
const filmSection = document.querySelector("#film");

if (autoplayVideo && filmSection && !reduceMotion) {
  let started = false;

  const startFilm = () => {
    if (started) return;
    started = true;
    autoplayVideo.muted = true;
    autoplayVideo.preload = "auto";
    autoplayVideo.play().catch(() => {
      // If the browser blocks playback, the poster and controls remain usable.
    });
  };

  const checkFilmPosition = () => {
    const rect = filmSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      startFilm();
      window.removeEventListener("scroll", checkFilmPosition);
    }
  };

  window.addEventListener("scroll", checkFilmPosition, { passive: true });
  window.addEventListener("load", checkFilmPosition);
  checkFilmPosition();

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startFilm();
        } else if (started && !autoplayVideo.paused) {
          autoplayVideo.pause();
        }
      },
      { threshold: 0.2 }
    );
    videoObserver.observe(filmSection);
  }
}
