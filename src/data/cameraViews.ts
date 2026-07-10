import * as THREE from "three";

export type CameraView =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "resume"
  | "contact";

export const cameraViews = {
  hero: {
    position: new THREE.Vector3(12, 8, 18),
    target: new THREE.Vector3(0, 1.2, 0),
  },

  about: {
    position: new THREE.Vector3(-6, 5.5, 8),
    target: new THREE.Vector3(0, 1.2, 0),
},
skills: {
  position: new THREE.Vector3(
    0,
    7,
    -18
  ),

  target: new THREE.Vector3(
    0,
    1,
    -32
  ),
},

  projects: {
    position: new THREE.Vector3(46, 7, 0),
    target: new THREE.Vector3(60, 3, 0),
  },

  resume: {
    position: new THREE.Vector3(-46, 10, 0),
    target: new THREE.Vector3(-60, 6, 0),
  },

  contact: {
    position: new THREE.Vector3(0, 4, -30),
    target: new THREE.Vector3(0, 4, -52),
  },
};