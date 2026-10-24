import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as THREE from 'three';

const require = createRequire(import.meta.url);
// Exercise the TS modules with controlled loaders/hooks; no browser or GPU needed.
function load(file, mocks = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${code}\n })`, {
    setTimeout, clearTimeout, console, ...globals,
  })(id => id in mocks ? mocks[id] : id.endsWith('.css') ? {} : require(id), module, module.exports);
  return module.exports;
}

const disposal = load('src/components/Character/utils/disposeObject.ts', { three: THREE });

test('every monitor primitive and the light plane start hidden on all viewport modes', () => {
  const file = fs.readFileSync('public/models/character.glb');
  const model = JSON.parse(file.subarray(20, 20 + file.readUInt32LE(12)).toString());
  const monitorNode = model.nodes.find(node => node.name === 'Plane.004');
  const character = new THREE.Group();
  const monitor = new THREE.Group();
  monitor.name = 'Plane004';
  for (const primitive of model.meshes[monitorNode.mesh].primitives) {
    const material = new THREE.MeshStandardMaterial();
    material.name = model.materials[primitive.material].name;
    monitor.add(new THREE.Mesh(new THREE.PlaneGeometry(), material));
  }
  const light = new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshStandardMaterial());
  light.name = 'screenlight';
  character.add(monitor, light);
  let cleaned = false;
  const setup = load('src/utils/GsapScroll.ts', {
    gsap: { registerPlugin() {}, matchMedia: () => ({ add() {}, revert: () => { cleaned = true; } }) },
    'gsap/ScrollTrigger': { ScrollTrigger: {} },
  }).setCharTimeline;
  const cleanup = setup(character, new THREE.PerspectiveCamera());
  assert.equal(monitor.children.length, 2, 'Cover both actual GLB monitor materials');
  for (const mesh of [...monitor.children, light]) {
    assert.equal(mesh.material.opacity, 0, `${mesh.material.name} must not cover the hero`);
    assert.equal(mesh.material.transparent, true);
    assert.equal(mesh.material.depthWrite, false, 'Invisible panels must not occlude the character');
  }
  cleanup();
  assert(cleaned);
  disposal.disposeObject(character);
});

test('a character render failure dismisses the splash and hides only the 3D view', () => {
  let released = 0;
  const Boundary = load('src/components/Character/CharacterBoundary.tsx', {}, { console: { warn() {} } }).default;
  const boundary = new Boundary({ children: '3D view', onFailure: () => released++ });
  assert.equal(boundary.render(), '3D view');
  boundary.state = Boundary.getDerivedStateFromError(new Error('WebGL failed'));
  boundary.componentDidCatch(new Error('WebGL failed'), { componentStack: '' });
  assert.equal(released, 1);
  assert.equal(boundary.render(), null);
});

test('a stalled 3D load releases the splash screen after three seconds and unlocks scrolling', () => {
  let expire, delay, cleared = false, cleanup;
  const values = [];
  let stateIndex = 0;
  const document = { body: { style: {} } };
  const Provider = load('src/context/LoadingProvider.tsx', {
    react: { useState: initial => [initial, value => values.push(value)], useEffect: setup => { cleanup = setup(); } },
    '../components/ui/Loading': () => null,
    './loadingContext': { LoadingContext: { Provider: 'provider' } },
  }, { document, window: { setTimeout: (callback, ms) => { expire = callback; delay = ms; return 1; } }, clearTimeout: () => { cleared = true; } }).LoadingProvider;
  Provider({ children: null });
  assert.equal(delay, 3000);
  expire();
  assert.deepEqual(values, [100]);
  cleanup();
  assert(cleared);
  const Ready = load('src/context/LoadingProvider.tsx', {
    react: { useState: () => [stateIndex++ === 0 ? false : 100, () => {}], useEffect: setup => setup() },
    '../components/ui/Loading': () => null,
    './loadingContext': { LoadingContext: { Provider: 'provider' } },
  }, { document, window: {} }).LoadingProvider;
  Ready({ children: null });
  assert.equal(document.body.style.overflowY, 'auto');
});

test('shared GPU resources are disposed once, including maps shared by materials', () => {
  const texture = new THREE.Texture();
  const geometry = new THREE.SphereGeometry();
  const first = new THREE.MeshStandardMaterial({ map: texture, emissiveMap: texture });
  const second = new THREE.MeshStandardMaterial({ map: texture });
  const root = new THREE.Group();
  root.add(new THREE.Mesh(geometry, first), new THREE.Mesh(geometry, first), new THREE.Mesh(geometry, second));
  const counts = [texture, geometry, first, second].map(object => {
    const count = { value: 0 };
    object.addEventListener('dispose', () => count.value++);
    return count;
  });
  disposal.disposeObject(root);
  assert.deepEqual(counts.map(count => count.value), [1, 1, 1, 1]);
});

function controlledLoader() {
  let success, failure, decoderDisposals = 0;
  class GLTFLoader {
    setDRACOLoader() {}
    load(_url, onLoad, _progress, onError) { success = onLoad; failure = onError; }
  }
  class DRACOLoader {
    setDecoderPath() {}
    dispose() { decoderDisposals++; }
  }
  const setCharacter = load('src/components/Character/utils/character.ts', {
    'three-stdlib': { GLTFLoader, DRACOLoader }, './disposeObject': disposal,
  }).default;
  return { setCharacter, success: value => success(value), failure: error => failure(error), disposals: () => decoderDisposals };
}

test('a late model after cancellation is disposed and never returned to the scene', async () => {
  const loader = controlledLoader();
  const controller = new AbortController();
  const root = new THREE.Group();
  const geometry = new THREE.BoxGeometry();
  let disposed = 0;
  geometry.addEventListener('dispose', () => disposed++);
  root.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()));
  const promise = loader.setCharacter(controller.signal).loadCharacter();
  controller.abort();
  loader.success({ scene: root });
  assert.equal(await promise, null);
  assert.equal(disposed, 1);
  assert.equal(loader.disposals(), 1);
});

test('successful models retain setup; load failures reject and release the decoder', async () => {
  const loader = controlledLoader();
  const controller = new AbortController();
  const root = new THREE.Group();
  const foot = new THREE.Object3D();
  foot.name = 'footR';
  root.add(foot);
  const gltf = { scene: root };
  const promise = loader.setCharacter(controller.signal).loadCharacter();
  loader.success(gltf);
  assert.equal(await promise, gltf);
  assert.equal(foot.position.y, 3.36);
  const broken = controlledLoader();
  const failure = broken.setCharacter(controller.signal).loadCharacter();
  broken.failure(new Error('model unavailable'));
  await assert.rejects(failure, /model unavailable/);
  assert.equal(broken.disposals(), 1);
});

test('late HDR loads do not attach textures after the scene has been disposed', () => {
  let onLoad;
  class RGBELoader {
    setPath() { return this; }
    load(_url, callback) { onLoad = callback; }
  }
  const controller = new AbortController();
  const scene = new THREE.Scene();
  let ready = 0, disposed = 0;
  const setLighting = load('src/components/Character/utils/lighting.ts', { three: THREE, 'three-stdlib': { RGBELoader } }).default;
  const lighting = setLighting(scene, controller.signal, () => ready++);
  const texture = new THREE.Texture();
  texture.addEventListener('dispose', () => disposed++);
  controller.abort();
  lighting.dispose();
  onLoad(texture);
  assert.equal(scene.environment, null);
  assert.equal(disposed, 1);
  assert.equal(ready, 0);
});

test('resizing the canvas updates camera dimensions without killing other animations', () => {
  const resize = load('src/components/Character/utils/resizeUtils.ts').default;
  const calls = [];
  const camera = new THREE.PerspectiveCamera();
  resize({ setSize: (...args) => calls.push(args) }, camera, { clientWidth: 1200, clientHeight: 600 });
  assert.equal(camera.aspect, 2);
  assert.deepEqual(calls, [[1200, 600]]);
  resize({ setSize: () => assert.fail('zero-sized canvas must be skipped') }, camera, { clientWidth: 0, clientHeight: 0 });
});

test('project scroll recalculates after resizing and removes desktop classes on cleanup', () => {
  let callback, cleanup, options, query;
  const classes = new Set();
  const track = { scrollWidth: 2600 };
  const container = { clientWidth: 1000 };
  const section = {
    querySelector: name => name === '.work-flex' ? track : container,
    classList: { add: value => classes.add(value), remove: (...values) => values.forEach(value => classes.delete(value)), toggle: () => {} },
  };
  const media = { add: (condition, setup) => { query = condition; callback = setup; }, revert: () => cleanup?.() };
  const gsap = { registerPlugin() {}, matchMedia: () => media, to: (_target, settings) => { options = settings; } };
  let unmount;
  const Work = load('src/components/sections/Work.tsx', {
    react: { useRef: () => ({ current: section }), useLayoutEffect: setup => { unmount = setup(); } },
    gsap, 'gsap/ScrollTrigger': { ScrollTrigger: {} }, './WorkImage': () => null, '../../data/projects': { projects: [] },
  }, { getComputedStyle: () => ({ marginLeft: '-30px' }) }).default;
  Work();
  assert.match(query, /pointer: fine/);
  assert.match(query, /prefers-reduced-motion: no-preference/);
  cleanup = callback();
  assert.equal(options.x(), -1570);
  assert.equal(options.scrollTrigger.end(), '+=1570');
  container.clientWidth = 1200;
  track.scrollWidth = 3000;
  assert.equal(options.x(), -1770);
  assert.equal(options.scrollTrigger.end(), '+=1770');
  assert.equal(options.scrollTrigger.invalidateOnRefresh, true);
  unmount();
  assert.equal(classes.size, 0);
});

test('StrictMode blocks stale scenes; the live scene pauses offscreen and in hidden tabs', async () => {
  const pending = [];
  let cleanup, refIndex = 0, timelines = 0, loading = 0, disposed = 0;
  let observeVisibility, visibilityChanged, scheduledFrames = 0;
  const document = { hidden: false, addEventListener: (_event, callback) => { visibilityChanged = callback; }, removeEventListener() {} };
  const container = { clientWidth: 1000, clientHeight: 600, appendChild() {} };
  const preference = { matches: false, addEventListener() {}, removeEventListener() {} };
  class Renderer {
    domElement = { addEventListener() {}, removeEventListener() {}, remove() {} };
    setPixelRatio() {} setSize() {} render() {} dispose() {} forceContextLoss() {}
  }
  class Observer { constructor(callback) { observeVisibility = callback; } observe() {} disconnect() {} }
  const Scene = load('src/components/Character/Scene.tsx', {
    react: { useRef: () => ({ current: refIndex++ % 2 ? {} : container }), useEffect: setup => { cleanup = setup(); } },
    three: { ...THREE, WebGLRenderer: Renderer },
    './utils/character': () => ({ loadCharacter: () => new Promise(resolve => pending.push(resolve)) }),
    './utils/lighting': () => ({ setPointLight() {}, dispose() {} }),
    './utils/resizeUtils': load('src/components/Character/utils/resizeUtils.ts').default,
    './utils/mouseUtils': { handleMouseMove() {}, handleHeadRotation() {} },
    './utils/animationUtils': () => ({ mixer: { update() {} }, hover() {}, startIntro() {}, dispose() {} }),
    './utils/disposeObject': disposal,
    '../../utils/GsapScroll': { setCharTimeline: () => { timelines++; return () => {}; } },
    '../../context/loadingContext': { useLoading: () => ({ setLoading: () => loading++ }) },
  }, {
    AbortController, ResizeObserver: Observer, IntersectionObserver: Observer,
    document,
    window: { innerWidth: 1000, devicePixelRatio: 1, matchMedia: () => preference, addEventListener() {}, removeEventListener() {} },
    requestAnimationFrame: () => ++scheduledFrames, cancelAnimationFrame() {},
  }).default;
  Scene();
  cleanup();
  Scene();
  const geometry = new THREE.BoxGeometry();
  geometry.addEventListener('dispose', () => disposed++);
  const old = new THREE.Group();
  old.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()));
  pending[0]({ scene: old });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(disposed, 1);
  assert.equal(loading, 0);
  assert.equal(timelines, 0);
  pending[1]({ scene: new THREE.Group(), animations: [] });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(loading, 1);
  assert.equal(timelines, 1);
  const beforePause = scheduledFrames;
  document.hidden = true;
  visibilityChanged();
  assert.equal(scheduledFrames, beforePause);
  document.hidden = false;
  visibilityChanged();
  assert.equal(scheduledFrames, beforePause + 1);
  observeVisibility([{ isIntersecting: false }]);
  assert.equal(scheduledFrames, beforePause + 1);
  observeVisibility([{ isIntersecting: true }]);
  assert.equal(scheduledFrames, beforePause + 2);
  cleanup();
});
