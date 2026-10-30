(() => {
  const host = document.querySelector("#blueprint-canvas");
  if (!host) return;

  const track = document.querySelector(".blueprint-track");
  const stage = document.querySelector(".blueprint-stage");
  const steps = [...document.querySelectorAll(".bp-step")];
  const bar = document.querySelector(".bp-bar i");
  const countEl = document.querySelector(".bp-count");
  const statusLabel = document.querySelector(".bp-status-label");
  const readoutIndex = document.querySelector(".bp-readout-index");
  const readoutTitle = document.querySelector(".bp-readout-title");
  const readoutDesc = document.querySelector(".bp-readout-desc");
  const calloutLayer = document.querySelector(".bp-callouts");
  const svg = document.querySelector(".bp-leaders");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const easeOut = (v) => 1 - Math.pow(1 - v, 3);

  let progress = 0;
let autoPlay = true;
let idleTimer = null;
const isMobileBP = () => window.matchMedia("(max-width: 900px)").matches;
  let currentStep = -1;
  let staticMode = reduceMotion;

  const measure = () => {
    staticMode = reduceMotion || !stage;
    if (!track) return;
    if (staticMode) {
      progress = 1;
      return;
    }
    if (autoPlay) return;
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight - window.innerHeight * 0.3;
    progress = total > 0 ? clamp01(-rect.top / total) : 1;
  };

  const updateUI = () => {
    if (!steps.length) return;
    const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    if (index !== currentStep) {
      currentStep = index;
      const step = steps[index];
      steps.forEach((el, i) => {
        el.classList.toggle("is-active", i === index);
        el.classList.toggle("is-done", i < index);
      });
      if (countEl) countEl.textContent = String(index + 1).padStart(2, "0");
      if (statusLabel) statusLabel.textContent = step?.dataset.name || "";
      if (readoutIndex) readoutIndex.textContent = String(index + 1).padStart(2, "0");
      if (readoutTitle) readoutTitle.textContent = step?.dataset.name || "";
      if (readoutDesc) readoutDesc.textContent = step?.dataset.desc || "";
    }
    if (bar) bar.style.width = `${(progress * 100).toFixed(1)}%`;
  };

  let ticking = false;
  const pauseAutoPlay = () => {
    if (isMobileBP()) return;
    autoPlay = false;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { autoPlay = true; }, 3500);
  };
  const onScroll = () => {
    pauseAutoPlay();
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      measure();
      updateUI();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  ["pointerdown","touchstart"].forEach((evt) => {
    window.addEventListener(evt, () => {
      if (isMobileBP()) return;
      autoPlay = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { autoPlay = true; }, 2500);
    }, { passive: true });
  });
  measure();
  updateUI();
  // Outer animation loop: drives progress + UI even if 3D fails to load
  let uiHoldStart = null;
  let uiLastTime = performance.now();
  let inViewOuter = true;
  if (typeof IntersectionObserver !== "undefined" && track) {
    new IntersectionObserver(([e]) => { inViewOuter = e.isIntersecting; }, { threshold: 0 }).observe(track);
  }
  const uiLoop = () => {
    requestAnimationFrame(uiLoop);
    const now = performance.now();
    const delta = Math.min((now - uiLastTime) / 1000, 0.05);
    uiLastTime = now;
    if (!inViewOuter && !isMobileBP()) return;
    if (autoPlay) {
      progress += delta * 0.055;
      if (progress >= 1) {
        if (uiHoldStart === null) uiHoldStart = now;
        if (now - uiHoldStart >= 2000) {
          progress = 0;
          uiHoldStart = null;
        } else {
          progress = 1;
        }
      } else {
        uiHoldStart = null;
      }
      updateUI();
    }
  };
  if (steps.length) uiLoop();

  const playBtn = document.getElementById("bp-play");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      autoPlay = true;
      progress = 0;
      if (!loaded3D && !loading3D) load3D();
    });
  }


  let loaded3D = false;
  let loading3D = false;
  const load3D = () => {
    if (loaded3D || loading3D) return;
    loading3D = true;
    import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js")
      .then((THREE) => { loaded3D = true; loading3D = false; initBlueprint3D(THREE); })
      .catch(() => { loading3D = false; fallback(); });
  };
  if ("IntersectionObserver" in window && track) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        load3D();
      }
    }, { rootMargin: "800px 0px" });
    io.observe(track);
    // Fallback: load after 2.5s if not already loaded and section is in view
    setTimeout(() => {
      if (!loaded3D) load3D();
    }, 2500);
  } else {
    load3D();
  }

  function fallback() {
    host.innerHTML = '<img src="images/zavoli/full-kit.jpg" alt="The complete Zavoli kit">';
    calloutLayer?.remove();
    svg?.remove();
    document.querySelector(".bp-legend")?.remove();
  }

  function initBlueprint3D(THREE) {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      try {
        renderer = new THREE.WebGLRenderer();
      } catch (error2) {
        fallback();
        return;
      }
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1018, 0.014);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    // ---- studio environment for believable metal ----
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x090e15);

    const envPanel = (w, h, x, y, z, rx, ry, r, g, b) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(r, g, b),
        side: THREE.DoubleSide,
      });
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
      panel.position.set(x, y, z);
      panel.rotation.set(rx, ry, 0);
      envScene.add(panel);
    };

    envPanel(14, 14, 0, 9, 0, Math.PI / 2, 0, 3.2, 3.2, 3.6);
    envPanel(9, 9, -9, 3, 0, 0, Math.PI / 2, 0.45, 1.1, 2.2);
    envPanel(9, 9, 9, 3, 0, 0, -Math.PI / 2, 2.1, 1.35, 0.75);
    envPanel(11, 7, 0, 2, -9, 0, 0, 0.4, 0.7, 1.5);
    const envMap = pmrem.fromScene(envScene, 0.02).texture;
    scene.environment = envMap;

    // ---- lights ----
    scene.add(new THREE.HemisphereLight(0x9cc4ff, 0x080b10, 0.65));

    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(4.5, 7.5, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 22;
    key.shadow.bias = -0.0004;
    key.shadow.camera.updateProjectionMatrix();
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x3b82e8, 2.6);
    rim.position.set(-6, 3, -4);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xffc98a, 1.1);
    fill.position.set(3, 2, -6);
    scene.add(fill);

    const highlight = new THREE.PointLight(0x5aa0ff, 0, 2.6, 2);
    scene.add(highlight);

    const bayLight = new THREE.PointLight(0xd6e7ff, 3, 3.4, 2);
    bayLight.position.set(1.35, 1.55, 0.75);
    scene.add(bayLight);

    const tankLight = new THREE.PointLight(0x9fc3f0, 2.6, 2.8, 2);
    tankLight.position.set(-1.75, 1.2, 0.85);
    scene.add(tankLight);

    // ---- materials ----
    const mats = {
      steel: new THREE.MeshStandardMaterial({
        color: 0xc3cedd,
        metalness: 0.9,
        roughness: 0.22,
        emissive: 0x0a1420,
        emissiveIntensity: 0.35,
        envMapIntensity: 1.6,
      }),
      dark: new THREE.MeshStandardMaterial({ color: 0x536072, metalness: 0.8, roughness: 0.32, envMapIntensity: 1.3 }),
      graphite: new THREE.MeshStandardMaterial({ color: 0x2b3340, metalness: 0.7, roughness: 0.38, envMapIntensity: 1.3 }),
      copper: new THREE.MeshStandardMaterial({
        color: 0xe08b4a,
        metalness: 0.9,
        roughness: 0.28,
        emissive: 0x4a1e06,
        emissiveIntensity: 0.45,
        envMapIntensity: 1.5,
      }),
      blue: new THREE.MeshStandardMaterial({
        color: 0x3b82e8,
        metalness: 0.65,
        roughness: 0.26,
        emissive: 0x0a2a5e,
        emissiveIntensity: 0.55,
        envMapIntensity: 1.4,
      }),
      fill: new THREE.MeshStandardMaterial({
        color: 0xf5c451,
        metalness: 0.55,
        roughness: 0.3,
        emissive: 0x4a3208,
        emissiveIntensity: 0.55,
        envMapIntensity: 1.4,
      }),
      vapor: new THREE.MeshStandardMaterial({
        color: 0x5fd0ff,
        metalness: 0.4,
        roughness: 0.24,
        emissive: 0x0d3a55,
        emissiveIntensity: 0.7,
        envMapIntensity: 1.4,
      }),
      control: new THREE.MeshStandardMaterial({
        color: 0x7ef0b0,
        metalness: 0.35,
        roughness: 0.3,
        emissive: 0x0d3a22,
        emissiveIntensity: 0.8,
        envMapIntensity: 1.3,
      }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x080b10, metalness: 0.1, roughness: 0.92 }),
      rim: new THREE.MeshStandardMaterial({ color: 0xa7b4c4, metalness: 0.95, roughness: 0.2, envMapIntensity: 1.5 }),
      body: new THREE.MeshPhysicalMaterial({
        color: 0x2c3d55,
        metalness: 0.75,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        side: THREE.DoubleSide,
        envMapIntensity: 1.4,
      }),
      seat: new THREE.MeshStandardMaterial({ color: 0x151c26, metalness: 0.3, roughness: 0.8, transparent: true, opacity: 0.55 }),
    };

    const lineMat = new THREE.LineBasicMaterial({ color: 0x8fc4ff, transparent: true, opacity: 0.62 });

    const addMesh = (geometry, material, parent) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // ---- ground ----
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: 0x060a10, roughness: 1, metalness: 0.05 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(120, 240, 0x2a466b, 0x162539);
    grid.position.y = 0.002;
    grid.material.transparent = true;
    grid.material.opacity = 0.12;
    scene.add(grid);

    const makeShadowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.scale(1, 0.5);
      const gradient = ctx.createRadialGradient(256, 128, 8, 256, 128, 128);
      gradient.addColorStop(0, "rgba(0,0,0,0.72)");
      gradient.addColorStop(0.55, "rgba(0,0,0,0.32)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 256);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 2.9),
      new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, opacity: 0.7, depthWrite: false })
    );
    contact.rotation.x = -Math.PI / 2;
    contact.position.y = 0.004;
    scene.add(contact);

    // ---- the car ----
    const car = new THREE.Group();
    scene.add(car);

    const shape = new THREE.Shape();
    shape.moveTo(-2.28, 0.42);
    shape.lineTo(-2.3, 0.62);
    shape.lineTo(-2.26, 1.0);
    shape.lineTo(-1.95, 1.06);
    shape.lineTo(-1.45, 1.1);
    shape.lineTo(-1.12, 1.44);
    shape.lineTo(0.3, 1.46);
    shape.lineTo(0.72, 1.12);
    shape.lineTo(1.62, 1.03);
    shape.lineTo(2.18, 0.94);
    shape.lineTo(2.3, 0.62);
    shape.lineTo(2.26, 0.42);
    shape.lineTo(1.91, 0.42);
    shape.absarc(1.45, 0.42, 0.46, 0, Math.PI, false);
    shape.lineTo(-0.99, 0.42);
    shape.absarc(-1.45, 0.42, 0.46, 0, Math.PI, false);
    shape.lineTo(-2.28, 0.42);

    const bodyGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 32,
    });
    bodyGeometry.translate(0, 0, -0.75);

    const body = new THREE.Mesh(bodyGeometry, mats.body);
    body.castShadow = false;
    body.receiveShadow = false;
    body.renderOrder = 4;
    car.add(body);

    const outlinePoints = shape.getPoints(72);
    [-0.75, 0.75].forEach((z) => {
      const points = outlinePoints.map((point) => new THREE.Vector3(point.x, point.y, z));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const loop = new THREE.LineLoop(geometry, lineMat);
      loop.renderOrder = 5;
      car.add(loop);
    });

    [
      [-2.28, 0.42],
      [-2.26, 1.0],
      [-1.12, 1.44],
      [0.3, 1.46],
      [0.72, 1.12],
      [2.18, 0.94],
      [2.26, 0.42],
    ].forEach(([x, y]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, -0.75),
        new THREE.Vector3(x, y, 0.75),
      ]);
      const connector = new THREE.Line(geometry, lineMat);
      connector.renderOrder = 5;
      car.add(connector);
    });

    // cabin glass, so the silhouette reads as a car rather than a cage
    const glassShape = new THREE.Shape();
    glassShape.moveTo(-1.45, 1.1);
    glassShape.lineTo(-1.12, 1.44);
    glassShape.lineTo(0.3, 1.46);
    glassShape.lineTo(0.72, 1.12);
    glassShape.closePath();

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b1727,
      metalness: 0.9,
      roughness: 0.08,
      transparent: true,
      opacity: 0.26,
      side: THREE.DoubleSide,
      depthWrite: false,
      envMapIntensity: 1.6,
    });

    const glassGeometry = new THREE.ShapeGeometry(glassShape);
    [0.755, -0.755].forEach((z) => {
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.z = z;
      glass.renderOrder = 6;
      car.add(glass);
    });

    [-0.755, 0.755].forEach((z) => {
      const pillar = addMesh(new THREE.BoxGeometry(0.045, 0.34, 0.012), mats.graphite, car);
      pillar.position.set(-0.35, 1.27, z);
      const belt = addMesh(new THREE.BoxGeometry(2.15, 0.012, 0.01), mats.steel, car);
      belt.position.set(-0.36, 1.1, z);
    });

    const glassPanel = (a, b) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([
            a[0], a[1], -0.75,
            a[0], a[1], 0.75,
            b[0], b[1], 0.75,
            a[0], a[1], -0.75,
            b[0], b[1], 0.75,
            b[0], b[1], -0.75,
          ]),
          3
        )
      );
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, glassMaterial);
      mesh.renderOrder = 6;
      car.add(mesh);
    };

    glassPanel([0.3, 1.46], [0.72, 1.12]);
    glassPanel([-1.45, 1.1], [-1.12, 1.44]);

    const grille = addMesh(new THREE.BoxGeometry(0.02, 0.12, 0.5), mats.graphite, car);
    grille.position.set(2.29, 0.66, 0);

    // floor pan and cabin
    const floor = addMesh(new THREE.BoxGeometry(3.3, 0.04, 1.25), mats.graphite, car);
    floor.position.set(0, 0.44, 0);

    const makeSeat = (x, z) => {
      const group = new THREE.Group();
      const base = addMesh(new THREE.BoxGeometry(0.44, 0.1, 0.4), mats.seat, group);
      base.position.y = 0.06;
      const back = addMesh(new THREE.BoxGeometry(0.1, 0.52, 0.4), mats.seat, group);
      back.position.set(-0.19, 0.3, 0);
      const head = addMesh(new THREE.BoxGeometry(0.08, 0.16, 0.26), mats.seat, group);
      head.position.set(-0.21, 0.62, 0);
      group.position.set(x, 0.5, z);
      car.add(group);
    };

    makeSeat(0.35, 0.36);
    makeSeat(0.35, -0.36);
    makeSeat(-0.75, 0.36);
    makeSeat(-0.75, -0.36);

    const dash = addMesh(new THREE.BoxGeometry(0.16, 0.16, 1.3), mats.seat, car);
    dash.position.set(0.95, 0.82, 0);

    const steering = addMesh(new THREE.TorusGeometry(0.13, 0.016, 10, 32), mats.dark, car);
    steering.rotation.y = Math.PI / 2;
    steering.position.set(0.82, 0.86, 0.36);

    // engine block
    const block = addMesh(new THREE.BoxGeometry(0.62, 0.36, 0.6), mats.dark, car);
    block.position.set(1.45, 0.64, 0);

    const head = addMesh(new THREE.BoxGeometry(0.66, 0.16, 0.5), mats.graphite, car);
    head.position.set(1.45, 0.86, 0);

    const gearbox = addMesh(new THREE.CylinderGeometry(0.12, 0.12, 0.55, 20), mats.dark, car);
    gearbox.rotation.z = Math.PI / 2;
    gearbox.position.set(0.9, 0.5, 0);

    // wheels
    const makeWheel = (x, z) => {
      const group = new THREE.Group();
      addMesh(new THREE.TorusGeometry(0.32, 0.095, 18, 48), mats.rubber, group);
      const rim = addMesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32), mats.rim, group);
      rim.rotation.x = Math.PI / 2;
      const hub = addMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.12, 20), mats.dark, group);
      hub.rotation.x = Math.PI / 2;
      for (let i = 0; i < 5; i += 1) {
        const spoke = addMesh(new THREE.BoxGeometry(0.035, 0.3, 0.025), mats.rim, group);
        spoke.rotation.z = (i / 5) * Math.PI * 2;
        spoke.position.z = 0.045;
      }
      const disc = addMesh(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 28), mats.dark, group);
      disc.rotation.x = Math.PI / 2;
      disc.position.z = -0.03;
      group.position.set(x, 0.42, z);
      car.add(group);
    };

    makeWheel(1.45, 0.8);
    makeWheel(1.45, -0.8);
    makeWheel(-1.45, 0.8);
    makeWheel(-1.45, -0.8);

    // ---- Zavoli components ----
    const tank = new THREE.Group();
    const tankRing = addMesh(new THREE.TorusGeometry(0.36, 0.15, 22, 64), mats.steel, tank);
    tankRing.rotation.x = Math.PI / 2;
    const tankHub = addMesh(new THREE.CylinderGeometry(0.13, 0.13, 0.28, 28), mats.dark, tank);
    tankHub.position.y = 0.01;
    const tankAccent = addMesh(new THREE.TorusGeometry(0.14, 0.012, 8, 40), mats.blue, tank);
    tankAccent.rotation.x = Math.PI / 2;
    tankAccent.position.y = 0.15;
    const tankRim = addMesh(new THREE.TorusGeometry(0.505, 0.007, 6, 72), mats.blue, tank);
    tankRim.rotation.x = Math.PI / 2;
    tank.position.set(-1.75, 0.4, 0);
    car.add(tank);

    const well = addMesh(new THREE.TorusGeometry(0.53, 0.018, 8, 56), mats.dark, car);
    well.rotation.x = Math.PI / 2;
    well.position.set(-1.75, 0.445, 0);

    const multivalve = new THREE.Group();
    addMesh(new THREE.CylinderGeometry(0.075, 0.075, 0.16, 24), mats.steel, multivalve);
    const mvTop = addMesh(new THREE.CylinderGeometry(0.045, 0.045, 0.09, 20), mats.dark, multivalve);
    mvTop.position.y = 0.12;
    const mvCoil = addMesh(new THREE.CylinderGeometry(0.045, 0.045, 0.14, 20), mats.blue, multivalve);
    mvCoil.rotation.z = Math.PI / 2;
    mvCoil.position.set(0.11, 0.02, 0);
    const mvOut = addMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.14, 12), mats.copper, multivalve);
    mvOut.rotation.z = Math.PI / 2;
    mvOut.position.set(-0.11, -0.02, 0);
    multivalve.position.set(-1.42, 0.58, 0.08);
    car.add(multivalve);

    const filling = new THREE.Group();
    addMesh(new THREE.TorusGeometry(0.1, 0.018, 12, 36), mats.steel, filling);
    const fCap = addMesh(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 28), mats.dark, filling);
    fCap.rotation.x = Math.PI / 2;
    const fInner = addMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.02, 20), mats.blue, filling);
    fInner.rotation.x = Math.PI / 2;
    fInner.position.z = 0.02;
    filling.position.set(-2.03, 0.86, 0.77);
    car.add(filling);

    const vaporizer = new THREE.Group();
    const vBody = addMesh(new THREE.CylinderGeometry(0.115, 0.115, 0.34, 28), mats.steel, vaporizer);
    vBody.rotation.z = Math.PI / 2;
    for (let i = -2; i <= 2; i += 1) {
      const fin = addMesh(new THREE.TorusGeometry(0.12, 0.01, 8, 32), mats.dark, vaporizer);
      fin.rotation.y = Math.PI / 2;
      fin.position.x = i * 0.055;
    }
    const vCapA = addMesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24), mats.dark, vaporizer);
    vCapA.rotation.z = Math.PI / 2;
    vCapA.position.x = 0.19;
    const vCapB = addMesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24), mats.dark, vaporizer);
    vCapB.rotation.z = Math.PI / 2;
    vCapB.position.x = -0.19;
    const vIn = addMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.12, 12), mats.copper, vaporizer);
    vIn.rotation.z = Math.PI / 2;
    vIn.position.set(-0.25, 0, 0);
    const vOut = addMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.12, 12), mats.copper, vaporizer);
    vOut.rotation.z = Math.PI / 2;
    vOut.position.set(0.25, 0.02, 0);
    vaporizer.position.set(1.18, 0.74, 0.42);
    car.add(vaporizer);

    const filter = new THREE.Group();
    const fBody = addMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.22, 20), mats.steel, filter);
    fBody.rotation.z = Math.PI / 2;
    const fHexA = addMesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 6), mats.dark, filter);
    fHexA.rotation.z = Math.PI / 2;
    fHexA.position.x = 0.12;
    const fHexB = addMesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 6), mats.dark, filter);
    fHexB.rotation.z = Math.PI / 2;
    fHexB.position.x = -0.12;
    const fBracket = addMesh(new THREE.BoxGeometry(0.04, 0.16, 0.06), mats.dark, filter);
    fBracket.position.y = -0.1;
    filter.position.set(1.5, 0.74, 0.42);
    car.add(filter);

    const rail = new THREE.Group();
    addMesh(new THREE.BoxGeometry(0.07, 0.07, 0.92), mats.steel, rail);
    const railTop = addMesh(new THREE.BoxGeometry(0.075, 0.012, 0.92), mats.blue, rail);
    railTop.position.y = 0.042;
    [-0.33, -0.11, 0.11, 0.33].forEach((z) => {
      const injector = addMesh(new THREE.CylinderGeometry(0.027, 0.027, 0.16, 16), mats.dark, rail);
      injector.position.set(0, -0.105, z);
      const clip = addMesh(new THREE.BoxGeometry(0.05, 0.045, 0.045), mats.graphite, rail);
      clip.position.set(0.05, 0.005, z);
    });
    rail.position.set(1.36, 0.98, 0);
    car.add(rail);

    const manifold = new THREE.Group();
    const plenum = addMesh(new THREE.CylinderGeometry(0.07, 0.07, 0.88, 24), mats.steel, manifold);
    plenum.rotation.x = Math.PI / 2;
    [-0.33, -0.11, 0.11, 0.33].forEach((z) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, z),
        new THREE.Vector3(0.1, -0.03, z),
        new THREE.Vector3(0.16, -0.1, z * 0.9),
        new THREE.Vector3(0.15, -0.18, z * 0.8),
      ]);
      addMesh(new THREE.TubeGeometry(curve, 24, 0.03, 10, false), mats.steel, manifold);
    });
    manifold.position.set(1.32, 0.9, 0);
    car.add(manifold);

    const ecu = new THREE.Group();
    addMesh(new THREE.BoxGeometry(0.34, 0.24, 0.14), mats.dark, ecu);
    const ecuPlate = addMesh(new THREE.BoxGeometry(0.13, 0.07, 0.004), mats.blue, ecu);
    ecuPlate.position.set(0, 0.02, 0.073);
    const ecuConn = addMesh(new THREE.BoxGeometry(0.1, 0.08, 0.08), mats.graphite, ecu);
    ecuConn.position.set(0.12, -0.1, 0);
    const ecuTab = addMesh(new THREE.BoxGeometry(0.05, 0.03, 0.18), mats.steel, ecu);
    ecuTab.position.set(-0.19, 0.1, 0);
    ecu.position.set(0.55, 0.98, -0.42);
    ecu.rotation.y = 0.18;
    car.add(ecu);

    // ---- pipe run ----
    const makePipe = (points, radius, material, start, duration) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 100, radius, 10, false);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      car.add(mesh);
      return { mesh, geometry, count: geometry.index.count, start, duration, curve };
    };

    const pipes = [
      makePipe(
        [
          new THREE.Vector3(-2.03, 0.86, 0.74),
          new THREE.Vector3(-1.95, 0.8, 0.5),
          new THREE.Vector3(-1.7, 0.65, 0.22),
          new THREE.Vector3(-1.45, 0.6, 0.1),
        ],
        0.028,
        mats.fill,
        0.6,
        0.18
      ),
      makePipe(
        [
          new THREE.Vector3(-1.42, 0.52, 0.06),
          new THREE.Vector3(-1.3, 0.3, 0.1),
          new THREE.Vector3(-0.6, 0.26, 0.2),
          new THREE.Vector3(0.6, 0.3, 0.35),
          new THREE.Vector3(1.05, 0.55, 0.42),
          new THREE.Vector3(1.18, 0.7, 0.42),
        ],
        0.034,
        mats.copper,
        0.14,
        0.4
      ),
      makePipe(
        [
          new THREE.Vector3(1.3, 0.74, 0.42),
          new THREE.Vector3(1.4, 0.74, 0.42),
          new THREE.Vector3(1.5, 0.74, 0.42),
        ],
        0.028,
        mats.vapor,
        0.24,
        0.16
      ),
      makePipe(
        [
          new THREE.Vector3(1.56, 0.76, 0.4),
          new THREE.Vector3(1.5, 0.88, 0.2),
          new THREE.Vector3(1.4, 0.96, 0.08),
          new THREE.Vector3(1.36, 0.98, 0.02),
        ],
        0.026,
        mats.vapor,
        0.32,
        0.16
      ),
      makePipe(
        [
          new THREE.Vector3(0.55, 0.98, -0.4),
          new THREE.Vector3(0.75, 1.05, -0.25),
          new THREE.Vector3(1.05, 1.05, -0.1),
          new THREE.Vector3(1.36, 0.99, 0),
        ],
        0.016,
        mats.control,
        0.5,
        0.18
      ),
    ];

    const flowCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.42, 0.52, 0.06),
      new THREE.Vector3(-1.3, 0.3, 0.1),
      new THREE.Vector3(-0.6, 0.26, 0.2),
      new THREE.Vector3(0.6, 0.3, 0.35),
      new THREE.Vector3(1.05, 0.55, 0.42),
      new THREE.Vector3(1.18, 0.7, 0.42),
      new THREE.Vector3(1.3, 0.74, 0.42),
      new THREE.Vector3(1.5, 0.74, 0.42),
      new THREE.Vector3(1.56, 0.76, 0.4),
      new THREE.Vector3(1.5, 0.88, 0.2),
      new THREE.Vector3(1.4, 0.96, 0.08),
      new THREE.Vector3(1.36, 0.98, 0.02),
    ]);

    const flowDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x9df3bd })
    );
    flowDot.visible = false;
    car.add(flowDot);

    const makeGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.25, "rgba(140,255,190,0.7)");
      gradient.addColorStop(1, "rgba(60,255,150,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const flowGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        color: 0x5fe39a,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    flowGlow.scale.set(0.26, 0.26, 1);
    flowGlow.visible = false;
    car.add(flowGlow);

    // ---- callouts ----
    const partDefs = [
      { name: "Tank", group: tank, point: [-1.75, 0.58, 0.16], scale: 1.05, color: "#ff9a52" },
      { name: "Multivalve", group: multivalve, point: [-1.42, 0.76, 0.08], scale: 1.4, color: "#ff9a52" },
      { name: "Vaporizer", group: vaporizer, point: [1.06, 0.82, 0.56], scale: 1.2, color: "#5fd0ff" },
      { name: "Filter", group: filter, point: [1.62, 0.8, 0.5], scale: 1.35, color: "#5fd0ff" },
      { name: "Injector rail", group: rail, point: [1.36, 1.08, 0.5], scale: 1.15, color: "#5fd0ff" },
      { name: "Manifold", group: manifold, point: [1.45, 0.8, -0.35], scale: 1.15, color: "#c4b5fd" },
      { name: "ECU", group: ecu, point: [0.55, 1.09, -0.36], scale: 1.2, color: "#7ef0b0" },
      { name: "Filling unit", group: filling, point: [-2.03, 0.89, 0.78], scale: 1.25, color: "#f5c451" },
    ];

    const svgNS = "http://www.w3.org/2000/svg";

    partDefs.forEach((part, index) => {
      part.start = index === 0 ? -0.16 : index * 0.085;
      part.duration = 0.26;
      part.base = part.group.position.clone();
      part.arrived = 0;
      part.point = new THREE.Vector3(...part.point);
      part.labelY = 0;
      part.calloutWidth = 0;
      part.side = "left";

      const callout = document.createElement("div");
      callout.className = "bp-callout";
      callout.style.setProperty("--part-color", part.color);
      callout.innerHTML = `<span class="bp-callout-num">${String(index + 1).padStart(2, "0")}</span><span class="bp-callout-name">${part.name}</span>`;
      calloutLayer.appendChild(callout);
      part.callout = callout;

      const group = document.createElementNS(svgNS, "g");
      group.setAttribute("class", "bp-leader");
      group.style.setProperty("--part-color", part.color);

      const path = document.createElementNS(svgNS, "path");
      const halo = document.createElementNS(svgNS, "circle");
      halo.setAttribute("class", "bp-leader-halo");
      halo.setAttribute("r", "11");
      const ring = document.createElementNS(svgNS, "circle");
      ring.setAttribute("class", "bp-leader-ring");
      ring.setAttribute("r", "8");
      const num = document.createElementNS(svgNS, "text");
      num.setAttribute("class", "bp-leader-num");
      num.setAttribute("text-anchor", "middle");
      num.setAttribute("dy", "0.34em");
      num.textContent = String(index + 1).padStart(2, "0");

      group.append(path, halo, ring, num);
      svg.appendChild(group);
      part.leader = group;
      part.path = path;
      part.halo = halo;
      part.ring = ring;
      part.num = num;
    });

    // ---- sizing / camera ----
    let width = 1;
    let height = 1;
    let camDistance = 6;

    const fitCamera = () => {
      const aspect = width / Math.max(height, 1);
      const narrow = aspect < 1.1;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const dV = (narrow ? 4.6 : 3.2) / (2 * Math.tan(vFov / 2));
      const dH = (narrow ? 6 : 8) / (2 * Math.tan(vFov / 2) * aspect);
      camDistance = Math.max(dV, dH) * (narrow ? 1.06 : 1.14);
    };

    const resize = () => {
      width = host.clientWidth || 1;
      height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fitCamera();
      needsLayout = true;
    };

    let needsLayout = true;

    const layoutCallouts = () => {
      if (!calloutLayer || !svg || !width || !height) return;
      const center = width / 2;
      const sides = { left: [], right: [] };
      const v = new THREE.Vector3();

      partDefs.forEach((part) => {
        v.copy(part.point);
        car.localToWorld(v);
        v.project(camera);
        const x = (v.x * 0.5 + 0.5) * width;
        const y = (-v.y * 0.5 + 0.5) * height;
        (x < center ? sides.left : sides.right).push({ part, x, y });
      });

      const gap = 31;
      const top = 24;
      const bottom = Math.max(top + gap, height - 24);

      ["left", "right"].forEach((side) => {
        const list = sides[side].sort((a, b) => a.y - b.y);
        list.forEach((item) => {
          item.part.labelY = Math.min(bottom, Math.max(top, item.y));
        });
        for (let i = 1; i < list.length; i += 1) {
          const prev = list[i - 1].part.labelY;
          if (list[i].part.labelY < prev + gap) list[i].part.labelY = prev + gap;
        }
        const overflow = list.length ? list[list.length - 1].part.labelY - bottom : 0;
        if (overflow > 0) list.forEach((item) => { item.part.labelY -= overflow; });
        if (list.length && list[0].part.labelY < top) {
          const shift = top - list[0].part.labelY;
          list.forEach((item) => { item.part.labelY += shift; });
        }
        list.forEach((item) => {
          const part = item.part;
          const isLeft = side === "left";
          part.side = side;
          part.callout.style.left = isLeft ? "12px" : `${width - 12}px`;
          part.callout.style.top = `${part.labelY.toFixed(1)}px`;
          part.callout.style.transform = isLeft ? "translate(0, -50%)" : "translate(-100%, -50%)";
          part.calloutWidth = part.callout.offsetWidth;
        });
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { needsLayout = true; });
    }

    resize();
    window.addEventListener("resize", resize);

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(host);
    }

    // ---- interaction ----
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener(
      "pointermove",
      (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    let smoothProgress = staticMode ? 1 : 0;
    const projected = new THREE.Vector3();
    const flowPoint = new THREE.Vector3();

    const updateScene = (value, time) => {
      smoothProgress += (value - smoothProgress) * 0.08;
      const p = reduceMotion ? 1 : smoothProgress;

      const narrow = width / Math.max(height, 1) < 1.1;
      const idle = Math.sin(time * 0.18) * 0.02;
      const azimuth = (narrow ? 0.72 : 0.85) - p * 0.05 + idle + mouseX * 0.035;
      const elevation = (narrow ? 0.92 : 0.55) - p * 0.06 - mouseY * 0.025;
      const distance = camDistance * (1.05 - p * 0.08);

      camera.position.set(
        Math.cos(azimuth) * Math.cos(elevation) * distance,
        Math.sin(elevation) * distance + 0.35,
        Math.sin(azimuth) * Math.cos(elevation) * distance
      );
      camera.lookAt(0, 0.72 - p * 0.06, 0);

      if (needsLayout) {
        layoutCallouts();
        needsLayout = false;
      }

      const stepIndex = Math.min(7, Math.floor(p * 9));

      partDefs.forEach((part, index) => {
        const local = clamp01((p - part.start) / part.duration);
        const reveal = clamp01((value - part.start) / part.duration);
        const eased = easeOut(local);
        part.arrived = local;
        part.group.visible = local > 0.001;
        part.group.position.y = part.base.y + (1 - eased) * 0.35;
        const bump = index === stepIndex ? 1.045 : 1;
        part.group.scale.setScalar((0.001 + eased * 0.999) * bump * part.scale);
        part.callout.classList.toggle("is-on", reveal > 0.55);
        part.leader.classList.toggle("is-on", reveal > 0.55);
      });

      pipes.forEach((pipe) => {
        const local = clamp01((p - pipe.start) / pipe.duration);
        pipe.geometry.setDrawRange(0, Math.floor(pipe.count * local));
        pipe.mesh.visible = local > 0.001;
      });

      const flowOn = p > 0.9;
      flowDot.visible = flowOn;
      flowGlow.visible = flowOn;

      if (flowOn) {
        flowCurve.getPointAt((time * 0.16) % 1, flowPoint);
        flowDot.position.copy(flowPoint);
        flowGlow.position.copy(flowPoint);
      }

      if (stepIndex < 8 && partDefs[stepIndex] && partDefs[stepIndex].arrived > 0.2) {
        partDefs[stepIndex].group.getWorldPosition(highlight.position);
        highlight.intensity = 0.9;
      } else {
        highlight.intensity = 0;
      }

      // callout leaders
      partDefs.forEach((part) => {
        if (!part.callout.classList.contains("is-on")) return;
        projected.copy(part.point);
        car.localToWorld(projected);
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const isLeft = part.side === "left";
        const startX = isLeft ? 12 + part.calloutWidth + 7 : width - 12 - part.calloutWidth - 7;
        const elbowX = isLeft ? startX + 18 : startX - 18;
        part.path.setAttribute(
          "d",
          `M ${startX.toFixed(1)} ${part.labelY.toFixed(1)} L ${elbowX.toFixed(1)} ${part.labelY.toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)}`
        );
        part.ring.setAttribute("cx", x.toFixed(1));
        part.ring.setAttribute("cy", y.toFixed(1));
        part.halo.setAttribute("cx", x.toFixed(1));
        part.halo.setAttribute("cy", y.toFixed(1));
        part.num.setAttribute("x", x.toFixed(1));
        part.num.setAttribute("y", y.toFixed(1));
      });
    };

    // ---- render loop ----
    let inView = true;
    if (!isMobileBP() && typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { threshold: 0 }
      ).observe(host);
    }

    const clock = new THREE.Clock();

    const frame = () => {
      requestAnimationFrame(frame);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      if (!inView) return;
      updateScene(staticMode ? 1 : progress, time + delta);
      renderer.render(scene, camera);
    };

    frame();
  }
})();
