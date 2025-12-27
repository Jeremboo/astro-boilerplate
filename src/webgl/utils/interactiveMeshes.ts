import type { Camera, Intersection, Mesh } from 'three';
import { Raycaster, Vector2 } from 'three';

export interface InteractiveMesh {
  mesh: Mesh;
  handleClick: (intersection: Intersection) => void;
}

// TODO 2025-09-29 jeremboo: Make it generic? Use a npm package ?
const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// TODO 2025-09-29 jeremboo: Add max interactive distance

export default class InteractiveMeshes<TIMesh extends InteractiveMesh> {
  camera: Camera;
  clickableSurface: HTMLElement;

  meshes: Mesh[] = [];
  interactiveMeshes: { [key in string]: TIMesh } = {};
  obstacles: { [key in string]: Mesh } = {};

  raycaster = new Raycaster();
  mouse = new Vector2();

  hoveredIntersect?: Intersection;

  props = {
    maxDistance: 8
  };

  constructor(clickableSurface: HTMLElement, camera: Camera) {
    this.camera = camera;
    this.clickableSurface = clickableSurface;

    this.clickableSurface.addEventListener('click', this.handleClick);
    if (!IS_TOUCH) {
      this.clickableSurface.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  dispose() {
    // TODO 2025-04-14 jeremboo:
  }

  add(...iMeshes: TIMesh[]) {
    iMeshes.forEach((iMesh) => {
      if (!this.interactiveMeshes[iMesh.mesh.uuid]) {
        this.interactiveMeshes[iMesh.mesh.uuid] = iMesh;
        this.meshes.push(iMesh.mesh);
      }
    });
  }

  addObstacle(...meshes: Mesh[]) {
    meshes.forEach((mesh) => {
      if (!this.obstacles[mesh.uuid]) {
        this.obstacles[mesh.uuid] = mesh;
        this.meshes.push(mesh);
      }
    });
  }

  remove() {
    // TODO 2025-04-14 jeremboo:
  }

  getIntersect(e: MouseEvent) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.far = this.props.maxDistance;
    const intersect = this.raycaster.intersectObjects(this.meshes)[0];
    return intersect && !this.obstacles[intersect.object.uuid] ? intersect : undefined;
  }

  /*
   * * *******************
   * * HANDLERS
   * * *******************
   */

  handleMouseMove = (e: MouseEvent) => {
    this.hoveredIntersect = this.getIntersect(e);
    this.clickableSurface.style.cursor = this.hoveredIntersect ? 'pointer' : 'auto';
  };

  handleClick = (e: MouseEvent) => {
    const intersect = IS_TOUCH ? this.getIntersect(e) : this.hoveredIntersect;
    if (intersect) {
      this.interactiveMeshes[intersect.object.uuid]?.handleClick(intersect);
    }
  };
}
