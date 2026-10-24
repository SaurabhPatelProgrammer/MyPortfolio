import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { disposeObject } from "./disposeObject";

const setCharacter = (signal: AbortSignal) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => new Promise<GLTF | null>((resolve, reject) => {
    loader.load("/models/character.glb", gltf => {
      dracoLoader.dispose();
      if (signal.aborted) {
        disposeObject(gltf.scene);
        resolve(null);
        return;
      }
      gltf.scene.traverse(child => {
        // The renderer does not use shadow maps; avoid enabling unused shadows.
        if ("isMesh" in child && child.isMesh) child.frustumCulled = true;
      });
      for (const name of ["footR", "footL"]) {
        const foot = gltf.scene.getObjectByName(name);
        if (foot) foot.position.y = 3.36;
      }
      resolve(gltf);
    }, undefined, error => {
      dracoLoader.dispose();
      if (signal.aborted) resolve(null);
      else reject(error);
    });
  });
  return { loadCharacter };
};
export default setCharacter;
