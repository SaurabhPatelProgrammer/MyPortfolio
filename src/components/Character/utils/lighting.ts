import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const setLighting = (scene: THREE.Scene, signal: AbortSignal, onReady: () => void) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 1);
  directionalLight.position.set(-0.47, -0.32, -1);
  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  scene.add(directionalLight, pointLight);
  scene.environmentIntensity = 0.64;
  let environment: THREE.Texture | undefined;

  new RGBELoader().setPath("/models/").load("char_enviorment.hdr", texture => {
    if (signal.aborted) { texture.dispose(); return; }
    texture.mapping = THREE.EquirectangularReflectionMapping;
    environment = texture;
    scene.environment = texture;
    scene.environmentRotation.set(5.76, 85.85, 1);
    onReady();
  }, undefined, () => {
    // The directional light keeps the model usable if the HDR cannot load.
  });

  function setPointLight(screenLight: THREE.Mesh) {
    const material = screenLight.material as THREE.MeshStandardMaterial;
    pointLight.intensity = material.opacity > 0.9 ? material.emissiveIntensity * 20 : 0;
  }
  const dispose = () => {
    scene.environment = null;
    environment?.dispose();
    directionalLight.dispose();
    pointLight.dispose();
  };
  return { setPointLight, dispose };
};
export default setLighting;
