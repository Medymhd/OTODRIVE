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

const locations = [
  { name: "Thika", service: "both", coords: [37.0638209, -1.0423809] },
  { name: "Mavoko", service: "both", coords: [36.9601985, -1.4297154] },
  { name: "Kangundo Road", service: "fueling", coords: [36.8893014, -1.2752261] },
  { name: "Rongai", service: "fueling", coords: [36.7234206, -1.4002857] },
  { name: "Shanzu", service: "fueling", coords: [39.7382157, -3.9837529] },
  { name: "Jomvu", service: "fueling", coords: [39.6040628, -4.0078763] },
  { name: "Jomvu Yard", service: "conversion", coords: [39.5965528, -4.0073924] },
];

const mapElement = document.querySelector("#network-map");
const mapSection = document.querySelector("#map");
let networkMap;

function serviceLabel(service) {
  if (service === "both") return "Otodrive conversion + Autogas LPG";
  if (service === "conversion") return "Otodrive conversion";
  return "Autogas LPG";
}

function initNetworkMap() {
  if (networkMap || !mapElement || typeof maplibregl === "undefined") return;

  try {
    networkMap = new maplibregl.Map({
      container: "network-map",
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [37.2, -2.2],
      zoom: 5.7,
      attributionControl: true,
      cooperativeGestures: true,
    });

    networkMap.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    const bounds = new maplibregl.LngLatBounds();

    locations.forEach((location) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = `map-pin map-pin--${location.service}`;
      markerElement.setAttribute(
        "aria-label",
        `${location.name}: ${serviceLabel(location.service)}`
      );
      markerElement.title = `${location.name} — ${serviceLabel(location.service)}`;

      const popup = new maplibregl.Popup({ offset: 16, closeButton: true }).setHTML(
        `<strong>${location.name}</strong><span>${serviceLabel(location.service)}</span>`
      );

      new maplibregl.Marker({ element: markerElement, anchor: "center" })
        .setLngLat(location.coords)
        .setPopup(popup)
        .addTo(networkMap);

      bounds.extend(location.coords);
    });

    networkMap.on("load", () => {
      networkMap.fitBounds(bounds, { padding: 64, maxZoom: 7 });
    });

    networkMap.on("error", (event) => {
      console.warn("Map tile error:", event.error);
    });
  } catch (error) {
    mapElement.innerHTML =
      '<p class="map-fallback">The interactive map could not load. Use the location list above or open the location page for details.</p>';
    console.warn("Map initialization failed:", error);
  }
}

if (mapSection && "IntersectionObserver" in window) {
  const mapObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        initNetworkMap();
        mapObserver.disconnect();
      }
    },
    { rootMargin: "300px 0px" }
  );
  mapObserver.observe(mapSection);
} else {
  initNetworkMap();
}
