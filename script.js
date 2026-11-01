document.documentElement.classList.add("js");

/* ---------- Navigation ---------- */
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

/* ---------- Reveal on scroll ---------- */
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

/* ---------- Header state ---------- */
const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    },
    { passive: true }
  );
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

/* ---------- Forms ---------- */
function setFormStatus(form, message) {
  const scope = form.closest("[data-form-scope]") || form.parentElement;
  const status = scope ? scope.querySelector("[data-form-status]") : null;

  if (status) {
    status.hidden = false;
    status.textContent = message;
  }
}

function encode(value) {
  return encodeURIComponent(value).replace(/%0A/g, "%0D%0A");
}

function collectLines(data) {
  const lines = [];
  const consent = String(data.get("Consent") || "").trim();

  if (consent) {
    lines.push(
      "Consent to contact: Yes — the customer agreed to Otodrive using these details to respond to this request."
    );
  }

  data.forEach((value, key) => {
    const text = String(value).trim();
    if (text && key !== "subject" && key !== "company_website" && key !== "Consent") {
      lines.push(`${key}: ${text}`);
    }
  });
  return lines;
}

function openMailClient(subject, lines) {
  const body = lines.join("\r\n");
  window.location.href = `mailto:info@otodrive.co.ke?subject=${encode(subject)}&body=${encode(body)}`;
}

function normalizeKenyanPhone(raw) {
  let digits = String(raw || "").replace(/\D/g, "");

  if (digits.startsWith("254")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!/^[71]\d{8}$/.test(digits)) {
    return null;
  }

  return `+254${digits}`;
}

function normalizePhoneField(form) {
  const field = form.elements["Phone Number"] || form.elements["Phone"];
  if (!field) return true;

  const normalized = normalizeKenyanPhone(field.value);
  if (!normalized) {
    setFormStatus(
      form,
      "Please enter a valid Kenyan phone number — for example 07XXXXXXXX, 01XXXXXXXX or +254XXXXXXXX."
    );
    field.focus();
    return false;
  }

  field.value = normalized;
  return true;
}

/* Honeypot plus a minimum time-on-form check. Bots submit instantly. */
function isSpam(form) {
  const honey = form.querySelector('input[name="company_website"]');
  if (honey && honey.value.trim()) return true;

  const loadedAt = Number(form.dataset.loadedAt || 0);
  if (loadedAt && Date.now() - loadedAt < 2500) return true;

  return false;
}

document.querySelectorAll("form").forEach((form) => {
  form.dataset.loadedAt = String(Date.now());
});

const EMAILJS_PUBLIC_KEY = "UqC86yPkdUUSFLchd";
const EMAILJS_SERVICE_ID = "service_u7bdgwm";
const EMAILJS_TEMPLATE_ID = "template_u57mj4b";
let emailjsReady = false;

if (typeof emailjs !== "undefined") {
  try {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    emailjsReady = true;
  } catch (error) {
    emailjsReady = false;
  }
}

function sendViaEmailJS(data) {
  return new Promise((resolve) => {
    if (!emailjsReady) {
      resolve(false);
      return;
    }

    const params = {
      from_name: String(data.get("Name") || "").trim(),
      phone_number: String(data.get("Phone Number") || data.get("Phone") || "").trim(),
      email_id: String(data.get("Email") || "").trim(),
      message: collectLines(data).join("\n"),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}

function submitFormEmailJS(form, data) {
  return sendViaEmailJS(data).then((sent) => {
    if (sent) {
      setFormStatus(form, "Thank you — your message has been sent. Otodrive will get back to you shortly.");
      return true;
    }

    const subject = form.dataset.subject || "Otodrive website enquiry";
    openMailClient(subject, collectLines(data));
    setFormStatus(
      form,
      "We couldn't send automatically, so your email app was opened with the message ready to send. If it does not open, call +254 704 644 909 or email info@otodrive.co.ke."
    );
    return false;
  });
}

document.querySelectorAll("form[data-mailto]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isSpam(form)) {
      setFormStatus(form, "Thank you — your message has been received.");
      return;
    }

    if (!normalizePhoneField(form)) {
      return;
    }

    const data = new FormData(form);
    const subject = form.dataset.subject || "Otodrive website enquiry";
    openMailClient(subject, collectLines(data));
    setFormStatus(
      form,
      "Your email app should open with the message ready to send. If it does not, call +254 704 644 909 or email info@otodrive.co.ke."
    );
  });
});

document.querySelectorAll("form[data-emailjs]").forEach((form) => {
  if (form.id === "booking-form") return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isSpam(form)) {
      setFormStatus(form, "Thank you — your message has been received.");
      return;
    }

    if (!normalizePhoneField(form)) {
      return;
    }

    submitFormEmailJS(form, new FormData(form));
  });
});

/* ---------- Booking ---------- */
const bookingForm = document.querySelector("#booking-form");
const bookingDate = document.querySelector("#booking-date");
const bookingTime = document.querySelector("#booking-time");
const bookingSlots = document.querySelector("#booking-slots");
const bookingSlotStatus = document.querySelector("#booking-slot-status");

if (bookingForm && bookingDate && bookingTime && bookingSlots) {
  const today = new Date();
  const todayIso = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  bookingDate.min = todayIso;

  const renderSlots = () => {
    bookingSlots.replaceChildren();
    bookingTime.value = "";

    if (!bookingDate.value) {
      bookingSlotStatus.textContent = "Choose a date to see the provisional time slots.";
      return;
    }

    const date = new Date(`${bookingDate.value}T12:00:00`);
    const day = date.getDay();
    let start = 8;
    let end = 17;

    if (day === 0) {
      bookingSlotStatus.textContent = "Sundays are not available online. Choose another date or call the team.";
      return;
    }

    if (day === 6) {
      end = 12;
    }

    const slots = [];
    for (let hour = start; hour < end; hour += 1) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }

    slots.forEach((slot) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "booking-slot";
      button.textContent = slot;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        bookingTime.value = slot;
        bookingSlots.querySelectorAll(".booking-slot").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        bookingSlotStatus.textContent = `${slot} selected. Otodrive will confirm the slot by phone or email.`;
      });
      bookingSlots.append(button);
    });

    bookingSlotStatus.textContent = "Times shown are provisional. Otodrive will confirm your slot.";
  };

  bookingDate.addEventListener("change", renderSlots);
  renderSlots();

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    if (isSpam(bookingForm)) {
      setFormStatus(bookingForm, "Thank you — your booking request has been received.");
      return;
    }

    if (!normalizePhoneField(bookingForm)) {
      return;
    }

    if (!bookingTime.value) {
      bookingSlotStatus.textContent = "Choose an available time slot before sending the request.";
      bookingSlots.focus();
      return;
    }

    const data = new FormData(bookingForm);
    const service = data.get("Service") || "Service";
    const date = data.get("Date") || "";
    const time = data.get("Time") || "";
    const lines = collectLines(data);
    const subject = `Booking request — ${service} — ${date} ${time}`;

    sendViaEmailJS(data).then((sent) => {
      if (sent) {
        setFormStatus(
          bookingForm,
          "Thank you — your booking request has been sent. Otodrive will confirm the appointment by phone or email."
        );
        return;
      }

      openMailClient(subject, lines);
      setFormStatus(
        bookingForm,
        "We couldn't send automatically, so your email app was opened with the booking request ready to send. If it does not open, call +254 704 644 909."
      );
    });
  });
}

/* ---------- Location filters ---------- */
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

/* ---------- Film ---------- */
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

/* ---------- Content-driven sections ---------- */
const statsBand = document.querySelector(".stats-band");
const instalmentPanel = document.querySelector(".instalment-panel");
const savingsCalc = document.querySelector(".savings-calc");

if (statsBand || instalmentPanel || savingsCalc) {
  const fallback = {
    stats: {
      saving: { value: "40%+", label: "Fuel saving versus regular petrol" },
      hours: { value: "24/7", label: "Open for our customers" },
      license: { value: "KEBS", label: "Licensed to convert vehicles" },
      check: { value: "Free", label: "LPG system check for Autogas vehicles" },
    },
    instalment: { total: 65000, deposit: 40000, months: 5 },
    savings: { petrolPrice: 220, lpgPrice: 115 },
  };

  const formatKsh = (n) => Number(n).toLocaleString("en-KE");

  function initSavingsCalc(settings) {
    const petrol = document.querySelector("#calc-petrol");
    const lpg = document.querySelector("#calc-lpg");
    const spend = document.querySelector("#calc-spend");
    const outMonthly = document.querySelector("#calc-monthly");
    const outYearly = document.querySelector("#calc-yearly");
    const outPercent = document.querySelector("#calc-percent");
    if (!petrol || !lpg || !spend || !outMonthly) return;

    petrol.value = settings.petrolPrice;
    lpg.value = settings.lpgPrice;

    const update = () => {
      const p = parseFloat(petrol.value);
      const l = parseFloat(lpg.value);
      const s = parseFloat(spend.value);

      if (!(p > 0) || !(l >= 0) || !(s > 0) || l >= p) {
        outMonthly.textContent = "—";
        outYearly.textContent = "—";
        outPercent.textContent = "0%";
        return;
      }

      const litres = s / p;
      const monthly = litres * (p - l);
      const yearly = monthly * 12;
      const percent = ((p - l) / p) * 100;

      outMonthly.textContent = `KSh ${formatKsh(Math.round(monthly))}`;
      outYearly.textContent = `KSh ${formatKsh(Math.round(yearly))}`;
      outPercent.textContent = `${Math.round(percent)}%`;
    };

    [petrol, lpg, spend].forEach((el) => el.addEventListener("input", update));
    update();
  }

  fetch("content.json")
    .then((res) => res.json())
    .then((content) => {
      if (statsBand) {
        const stats = content.stats || fallback.stats;
        statsBand.querySelectorAll(".stat").forEach((el) => {
          const key = el.querySelector("dt").dataset.stat;
          const stat = stats[key];
          if (stat) {
            el.querySelector("dt").textContent = stat.value;
            el.querySelector("dd").textContent = stat.label;
          }
        });
      }

      if (instalmentPanel) {
        const offer = content.installment || fallback.instalment;
        const monthly = Math.round((offer.total - offer.deposit) / offer.months);
        instalmentPanel.querySelectorAll("[data-instalment]").forEach((el) => {
          const key = el.dataset.instalment;
          if (key === "monthly") el.textContent = formatKsh(monthly);
          else if (key === "months") el.textContent = String(offer.months);
          else el.textContent = formatKsh(offer[key]);
        });
      }

      if (savingsCalc) initSavingsCalc(content.savings || fallback.savings);
    })
    .catch(() => {
      if (savingsCalc) initSavingsCalc(fallback.savings);
    });
}
