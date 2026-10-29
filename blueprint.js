(() => {
  const host = document.querySelector("#blueprint-canvas");
  if (!host) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js")
    .then((THREE) => initBlueprint3D(THREE, host))
    .catch(() => {
      host.innerHTML =
        '<img src="images/zavoli/full-kit.jpg" alt="The full Zavoli kit" style="width:100%;max-width:520px;border-radius:3px;display:block;margin-inline:auto;">';
    });

  function initBlueprint3D(THREE, host) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    camera.position.set(0, 1.4, 10.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    let width = 1;
    let height = 1;

    const resize = () => {
      width = host.clientWidth || 1;
      height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(5, 7, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x3b82e8, 0.9);
    rim.position.set(-6, 2, -5);
    scene.add(rim);

    const world = new THREE.Group();
    scene.add(world);

    const materials = {
      metal: new THREE.MeshStandardMaterial({ color: 0x2e6cbd, roughness: 0.32, metalness: 0.6 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x16202e, roughness: 0.5, metalness: 0.4 }),
      green: new THREE.MeshStandardMaterial({ color: 0x2fb774, roughness: 0.4, metalness: 0.45 }),
      line: new THREE.LineBasicMaterial({ color: 0x9fc3f0, transparent: true, opacity: 0.55 }),
    };

    function sketch(geometry, material, parent) {
      const mesh = new THREE.Mesh(geometry, material);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), materials.line);
      const group = new THREE.Group();
      group.add(mesh, edges);
      parent.add(group);
      return group;
    }

    const parts = [];

    function addPart(name, from, to, rotFrom, rotTo, build) {
      const group = build(world);
      group.position.copy(from);
      group.rotation.set(rotFrom.x, rotFrom.y, rotFrom.z);
      parts.push({
        name,
        group,
        from: from.clone(),
        to: to.clone(),
        rotFrom: rotFrom.clone(),
        rotTo: rotTo.clone(),
        labelEl: null,
      });
      return group;
    }

    // 01 Tank — toroidal, lies flat in the boot area
    addPart(
      "Tank",
      new THREE.Vector3(-4.2, 2.4, -1.8),
      new THREE.Vector3(-2.45, -1.2, 0),
      new THREE.Euler(0.7, 0.4, 1.2),
      new THREE.Euler(Math.PI / 2, 0, 0),
      (parent) => sketch(new THREE.TorusGeometry(1.2, 0.45, 20, 60), materials.green, parent)
    );

    // 02 Multivalve — sits on top of the tank
    addPart(
      "Multivalve",
      new THREE.Vector3(-4.6, 3.2, -0.6),
      new THREE.Vector3(-1.75, -0.38, 0),
      new THREE.Euler(0.5, 0.9, 0.3),
      new THREE.Euler(0, 0, 0),
      (parent) => {
        const group = new THREE.Group();
        sketch(new THREE.CylinderGeometry(0.22, 0.22, 0.42, 24), materials.metal, group);
        const stem = sketch(new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16), materials.dark, group);
        stem.position.y = 0.36;
        parent.add(group);
        return group;
      }
    );

    // 03 Vaporizer / reducer
    addPart(
      "Vaporizer",
      new THREE.Vector3(-5.2, 1.2, 0.8),
      new THREE.Vector3(0.7, 0.72, 0),
      new THREE.Euler(0.4, 1.3, 0.5),
      new THREE.Euler(Math.PI / 2, 0, 0),
      (parent) => {
        const group = new THREE.Group();
        sketch(new THREE.CylinderGeometry(0.32, 0.32, 0.95, 28), materials.metal, group);
        const a = sketch(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 12), materials.dark, group);
        a.position.set(0.18, 0, 0);
        const b = sketch(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 12), materials.dark, group);
        b.position.set(-0.18, 0, 0.1);
        parent.add(group);
        return group;
      }
    );

    // 04 Vapor phase filter
    addPart(
      "Filter",
      new THREE.Vector3(-5.6, 0.6, 1.6),
      new THREE.Vector3(1.75, 1.02, 0),
      new THREE.Euler(1.0, 0.2, 0.7),
      new THREE.Euler(0, 0, Math.PI / 2),
      (parent) => sketch(new THREE.CylinderGeometry(0.17, 0.17, 0.55, 20), materials.dark, parent)
    );

    // 05 Injector rail + four injectors
    addPart(
      "Injector rail",
      new THREE.Vector3(-5.4, 3.4, 2.2),
      new THREE.Vector3(2.65, 1.32, 0),
      new THREE.Euler(0.3, 0.6, 1.4),
      new THREE.Euler(0, 0, 0),
      (parent) => {
        const group = new THREE.Group();
        sketch(new THREE.BoxGeometry(1.75, 0.14, 0.16), materials.metal, group);
        [-0.62, -0.2, 0.2, 0.62].forEach((x) => {
          const injector = sketch(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 14), materials.dark, group);
          injector.position.set(x, -0.2, 0);
        });
        parent.add(group);
        return group;
      }
    );

    // 06 Intake manifold — four ports under the injectors
    addPart(
      "Manifold",
      new THREE.Vector3(-5.8, 2.8, 2.8),
      new THREE.Vector3(2.65, 0.62, 0),
      new THREE.Euler(0.9, 0.8, 0.4),
      new THREE.Euler(0, 0, 0),
      (parent) => {
        const group = new THREE.Group();
        sketch(new THREE.BoxGeometry(1.9, 0.2, 0.3), materials.metal, group);
        [-0.62, -0.2, 0.2, 0.62].forEach((x) => {
          const port = sketch(new THREE.CylinderGeometry(0.1, 0.1, 0.42, 16), materials.dark, group);
          port.position.set(x, 0.26, 0);
        });
        parent.add(group);
        return group;
      }
    );

    // 07 ECU
    addPart(
      "ECU",
      new THREE.Vector3(-4.4, 3.8, -2.6),
      new THREE.Vector3(-0.55, 1.6, -0.75),
      new THREE.Euler(0.2, 1.6, 0.5),
      new THREE.Euler(0, 0, 0),
      (parent) => sketch(new THREE.BoxGeometry(0.78, 0.5, 0.3), materials.metal, parent)
    );

    // 08 Door-type filling unit
    addPart(
      "Filling unit",
      new THREE.Vector3(-3.2, 4.0, -2.2),
      new THREE.Vector3(-2.05, -0.18, -0.95),
      new THREE.Euler(0.8, 0.3, 1.0),
      new THREE.Euler(0, 0, 0),
      (parent) => {
        const group = new THREE.Group();
        sketch(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 28), materials.metal, group);
        const stem = sketch(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 14), materials.dark, group);
        stem.position.y = -0.28;
        parent.add(group);
        return group;
      }
    );

    // Connection tubes (drawn progressively)
    function tube(points, radius, material) {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 64, radius, 10, false);
      const mesh = new THREE.Mesh(geometry, material);
      world.add(mesh);
      return mesh;
    }

    const tubes = [
      tube(
        [new THREE.Vector3(-2.45, -0.95, 0), new THREE.Vector3(-1.75, -0.55, 0), new THREE.Vector3(-0.4, 0.3, 0), new THREE.Vector3(0.7, 0.72, 0)],
        0.05, materials.green
      ),
      tube(
        [new THREE.Vector3(0.7, 0.72, 0), new THREE.Vector3(1.3, 0.95, 0), new THREE.Vector3(1.75, 1.02, 0), new THREE.Vector3(2.65, 1.32, 0)],
        0.04, materials.metal
      ),
      tube(
        [new THREE.Vector3(-0.55, 1.6, -0.75), new THREE.Vector3(0.9, 1.85, 0.4), new THREE.Vector3(2.65, 1.45, 0)],
        0.035, materials.dark
      ),
      tube(
        [new THREE.Vector3(-2.45, -0.95, 0), new THREE.Vector3(-2.05, -0.35, -0.95)],
        0.04, materials.green
      ),
    ];

    // Floating labels
    const labels = parts.map((part) => {
      const el = document.createElement("div");
      el.className = "bp-label";
      el.textContent = part.name;
      host.appendChild(el);
      part.labelEl = el;
      return part;
    });

    const projectVector = new THREE.Vector3();

    const updateLabels = () => {
      labels.forEach((part) => {
        part.group.getWorldPosition(projectVector);
        projectVector.project(camera);
        const x = (projectVector.x * 0.5 + 0.5) * width;
        const y = (-projectVector.y * 0.5 + 0.5) * height;
        part.labelEl.style.transform = `translate(-50%, -160%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    };

    // Scroll progress (mirrors the steps list in script.js)
    const track = document.querySelector(".blueprint-track");
    let progress = 1;

    const onScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setProgress = (value) => {
      parts.forEach((part, index) => {
        const start = index * 0.1;
        const end = Math.min(1, start + 0.35);
        const local = Math.min(1, Math.max(0, (value - start) / (end - start)));
        const eased = 1 - Math.pow(1 - local, 3);
        part.group.position.lerpVectors(part.from, part.to, eased);
        part.group.rotation.x = part.rotFrom.x + (part.rotTo.x - part.rotFrom.x) * eased;
        part.group.rotation.y = part.rotFrom.y + (part.rotTo.y - part.rotFrom.y) * eased;
        part.group.rotation.z = part.rotFrom.z + (part.rotTo.z - part.rotFrom.z) * eased;
        part.labelEl.classList.toggle("is-on", local > 0.6);
      });

      tubes.forEach((mesh, index) => {
        const local = Math.min(1, Math.max(0, (value - 0.15 - index * 0.08) / 0.3));
        mesh.material.opacity = local * 0.85;
        mesh.visible = local > 0;
      });
    };

    // Mouse parallax
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

    const clock = new THREE.Clock();

    const loop = () => {
      requestAnimationFrame(loop);
      const delta = Math.min(clock.getDelta(), 0.1);

      if (!reduceMotion) {
        world.rotation.y += delta * 0.2;
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
        camera.position.y += (1.4 - mouseY * 0.5 - camera.position.y) * 0.04;
      }

      camera.lookAt(0, 0.1, 0);
      setProgress(reduceMotion ? 1 : progress);
      updateLabels();
      renderer.render(scene, camera);
    };

    loop();
  }
})();
