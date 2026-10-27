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

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
}

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

function openMailClient(subject, lines) {
  const body = lines.join("\r\n");
  window.location.href = `mailto:info@otodrive.co.ke?subject=${encode(subject)}&body=${encode(body)}`;
}

function collectLines(data) {
  const lines = [];
  data.forEach((value, key) => {
    const text = String(value).trim();
    if (text && key !== "subject") {
      lines.push(`${key}: ${text}`);
    }
  });
  return lines;
}

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
      phone_number: String(data.get("Phone Number") || "").trim(),
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
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitFormEmailJS(form, new FormData(form));
  });
});

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
