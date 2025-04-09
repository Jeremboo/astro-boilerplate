import { Object3D, PerspectiveCamera, WebGLRenderer } from 'three';

function setAllCulled(obj: Object3D, overrideCulled: boolean) {
  if (overrideCulled === false) {
    obj.userData.wasFrustumCulled = obj.frustumCulled;
    obj.userData.wasVisible = obj.visible;
    obj.visible = true;
    obj.frustumCulled = false;
  } else {
    obj.visible = obj.userData.wasVisible;
    obj.frustumCulled = obj.userData.wasFrustumCulled;
    delete obj.userData.wasVisible;
    delete obj.userData.wasFrustumCulled;
  }
  obj.children.forEach(child => setAllCulled(child, overrideCulled));
}

// https://medium.com/@hellomondaycom/how-we-built-the-google-cloud-infrastructure-webgl-experience-dec3ce7cd209
export default function preloadGpu(
  renderer: WebGLRenderer,
  scene: Object3D,
  camera: PerspectiveCamera
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // const cachedCameraAspect = camera.aspect;
      // camera.aspect = 1;
      // camera.updateProjectionMatrix();
      setAllCulled(scene, false);

      // NOTE 2025-04-09 jeremboo: If the device crashes at this point, just create chunks of object to render one after each other
      renderer.render(scene, camera);
      // Reset
      // camera.aspect = cachedCameraAspect;
      // camera.updateProjectionMatrix();
      setAllCulled(scene, true);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}