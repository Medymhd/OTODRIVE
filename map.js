const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const locations = [
  {
    name: "Thika",
    service: "both",
    coords: [37.063842, -1.042145],
    area: "Thika, Kenya",
    mapsUrl: "https://maps.app.goo.gl/ZHujXRnAL1nDtZSu6",
  },
  {
    name: "Mavoko",
    service: "both",
    coords: [36.960198, -1.429533],
    area: "Mavoko, Kenya",
    mapsUrl: "https://maps.app.goo.gl/C2WLEC5tz1VwoAwZ7",
  },
  {
    name: "Kangundo Road",
    service: "fueling",
    coords: [36.8893014, -1.2752261],
    area: "Kangundo Road, Nairobi",
    mapsUrl: "https://maps.app.goo.gl/3EDXSLFxYyYutGrA9",
  },
  {
    name: "Rongai",
    service: "fueling",
    coords: [36.7234206, -1.4002857],
    area: "Rongai, Kajiado",
    mapsUrl: "https://maps.app.goo.gl/GxpfryWxtuegwdWR7",
  },
  {
    name: "Shanzu",
    service: "fueling",
    coords: [39.7382157, -3.9837529],
    area: "Shanzu, Mombasa",
    mapsUrl: "https://maps.app.goo.gl/hYihjjUFbdxKwveR7",
  },
  {
    name: "Jomvu",
    service: "fueling",
    coords: [39.6040628, -4.0078763],
    area: "Jomvu, Mombasa",
    mapsUrl: "https://maps.app.goo.gl/LQZJuWqmyCyEe3Nk6",
  },
  {
    name: "Jomvu Yard",
    service: "conversion",
    coords: [39.596643, -4.0074044],
    area: "Jomvu, Mombasa",
    mapsUrl: "https://maps.app.goo.gl/frdagKS94VieWW7a7",
  },
];

const mapElement = document.querySelector("#network-map");
const mapSection = document.querySelector("#map");
const mapDetail = document.querySelector("#map-detail");
const mapDetailName = document.querySelector("#map-detail-name");
const mapDetailServices = document.querySelector("#map-detail-services");
const mapDetailArea = document.querySelector("#map-detail-area");
const mapDetailLink = document.querySelector("#map-detail-link");
const mapMarkers = new Map();
let networkMap;
let networkBounds;

function serviceLabel(service) {
  if (service === "both") return "Otodrive conversion + Autogas LPG";
  if (service === "conversion") return "Otodrive conversion";
  return "Autogas LPG";
}

function serviceTags(service) {
  if (service === "both") return ["Otodrive conversion", "Autogas LPG"];
  if (service === "conversion") return ["Otodrive conversion"];
  return ["Autogas LPG"];
}

function directionsUrl(location) {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.coords[1]},${location.coords[0]}`;
}

function setMapDetail(location) {
  if (!mapDetail || !mapDetailName || !mapDetailServices || !mapDetailArea || !mapDetailLink) {
    return;
  }

  mapDetailName.textContent = location.name;
  mapDetailArea.textContent = location.area;
  mapDetailLink.href = directionsUrl(location);
  mapDetailServices.replaceChildren(
    ...serviceTags(location.service).map((label) => {
      const tag = document.createElement("span");
      tag.textContent = label;
      return tag;
    })
  );

  mapMarkers.forEach((marker, name) => {
    const element = marker.getElement();
    element.classList.toggle("is-selected", name === location.name);
    element.setAttribute("aria-pressed", String(name === location.name));
  });
}

class OtodriveZoomControl {
  onAdd(map) {
    this._map = map;
    const wrap = document.createElement("div");
    wrap.className = "maplibregl-ctrl maplibregl-ctrl-group otodrive-zoom";

    const zoomIn = document.createElement("button");
    zoomIn.type = "button";
    zoomIn.className = "otodrive-zoom-btn";
    zoomIn.setAttribute("aria-label", "Zoom in");
    zoomIn.title = "Zoom in";
    zoomIn.textContent = "+";
    zoomIn.addEventListener("click", () => {
      this._map.easeTo({ zoom: this._map.getZoom() + 1, duration: prefersReducedMotion ? 0 : 240 });
    });

    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.className = "otodrive-zoom-btn";
    zoomOut.setAttribute("aria-label", "Zoom out");
    zoomOut.title = "Zoom out";
    zoomOut.textContent = "\u2212";
    zoomOut.addEventListener("click", () => {
      this._map.easeTo({ zoom: this._map.getZoom() - 1, duration: prefersReducedMotion ? 0 : 240 });
    });

    wrap.append(zoomIn, zoomOut);
    this._container = wrap;
    return wrap;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }
}

class OtodriveResetControl {
  onAdd(map) {
    this._map = map;
    const wrap = document.createElement("div");
    wrap.className = "maplibregl-ctrl maplibregl-ctrl-group otodrive-reset";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "otodrive-reset-btn";
    button.setAttribute("aria-label", "Reset map view");
    button.title = "Reset view";
    button.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg>';
    button.addEventListener("click", () => {
      if (!networkBounds) return;
      this._map.fitBounds(networkBounds, {
        padding: 64,
        maxZoom: 7,
        duration: prefersReducedMotion ? 0 : 800,
      });
    });

    wrap.append(button);
    this._container = wrap;
    return wrap;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }
}

function initNetworkMap() {
  if (networkMap || !mapElement || typeof maplibregl === "undefined") return;

  try {
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    networkMap = new maplibregl.Map({
      container: "network-map",
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [37.2, -2.2],
      zoom: 5.7,
      minZoom: 4,
      maxZoom: 17,
      maxBounds: [[32.5, -5.5], [42.5, 5.5]],
      attributionControl: { compact: true },
      cooperativeGestures: !finePointer,
      scrollZoom: finePointer,
    });

    networkMap.addControl(new maplibregl.FullscreenControl(), "top-right");
    networkMap.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
      }),
      "top-right"
    );
    networkMap.addControl(new OtodriveZoomControl(), "bottom-right");
    networkMap.addControl(new OtodriveResetControl(), "bottom-right");

    networkBounds = new maplibregl.LngLatBounds();

    locations.forEach((location) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = `map-pin map-pin--${location.service}`;
      markerElement.setAttribute(
        "aria-label",
        `${location.name}: ${serviceLabel(location.service)}`
      );
      markerElement.title = `${location.name} — ${serviceLabel(location.service)}`;

      const marker = new maplibregl.Marker({ element: markerElement, anchor: "center" })
        .setLngLat(location.coords)
        .addTo(networkMap);

      markerElement.addEventListener("click", () => {
        setMapDetail(location);
        networkMap.flyTo({
          center: location.coords,
          zoom: 12.5,
          duration: prefersReducedMotion ? 0 : 800,
        });
        if (window.innerWidth <= 820) {
          mapDetail.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest",
          });
        }
      });

      mapMarkers.set(location.name, marker);
      networkBounds.extend(location.coords);
    });

    setMapDetail(locations[1]);

    networkMap.on("load", () => {
      networkMap.fitBounds(networkBounds, { padding: 64, maxZoom: 7 });
      injectMapHint(finePointer);
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

function injectMapHint(finePointer) {
  const panel = mapElement.parentElement;
  if (!panel || panel.querySelector(".map-hint")) return;

  const hint = document.createElement("p");
  hint.className = "map-hint";
  hint.textContent = finePointer
    ? "Scroll to zoom · Drag to pan"
    : "Pinch with two fingers to zoom · Tap a pin for details";
  panel.append(hint);
}

if (mapSection) {
  if (mapSection.hasAttribute("data-map-eager") || document.readyState === "complete") {
    initNetworkMap();
  } else {
    window.addEventListener("load", initNetworkMap, { once: true });
  }
}
