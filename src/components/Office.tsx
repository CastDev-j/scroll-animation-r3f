import * as THREE from "three";
import gsap from "gsap";
import { useGLTF, useScroll } from "@react-three/drei";
import { useRef, type JSX } from "react";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    ["01_office"]: THREE.Mesh;
    ["02_library"]: THREE.Mesh;
    ["03_attic"]: THREE.Mesh;
  };
  materials: {
    ["01"]: THREE.MeshStandardMaterial;
    ["02"]: THREE.MeshStandardMaterial;
    ["03"]: THREE.MeshStandardMaterial;
  };
};

gsap.registerPlugin(useGSAP);

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export const Office = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF(
    "/models/WawaOffice.glb"
  ) as unknown as GLTFResult;

  const officeRef = useRef<THREE.Group>(null!);
  const timeLine = useRef<gsap.core.Timeline>(null!);
  const libraryRef = useRef<THREE.Group>(null!);
  const atticRef = useRef<THREE.Group>(null!);

  const scroll = useScroll();

  useFrame(() => {
    timeLine.current.progress(scroll.offset);
  });

  useGSAP(
    () => {
      timeLine.current = gsap.timeline();

      // VERTICAL ANIMATION
      timeLine.current.to(
        officeRef.current.position,
        {
          duration: 2,
          y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
        },
        0
      );

      // OFFICE ROTATION
      timeLine.current.to(
        officeRef.current.rotation,
        {
          duration: 1,
          x: 0,
          y: Math.PI / 6,
          z: 0,
        },
        0
      );
      timeLine.current.to(
        officeRef.current.rotation,
        {
          duration: 1,
          x: 0,
          y: -Math.PI / 6,
          z: 0,
        },
        1
      );

      // OFFICE MOVEMENT
      timeLine.current.to(
        officeRef.current.position,
        {
          duration: 1,
          x: -1,
          z: 2,
        },
        0
      );
      timeLine.current.to(
        officeRef.current.position,
        {
          duration: 1,
          x: 1,
          z: 2,
        },
        1
      );

      // LIBRARY FLOOR
      timeLine.current.from(
        libraryRef.current.position,
        {
          duration: 0.5,
          x: -2,
        },
        0.5
      );
      timeLine.current.from(
        libraryRef.current.rotation,
        {
          duration: 0.5,
          y: -Math.PI / 2,
        },
        0.0
      );

      // ATTIC FLOOR
      timeLine.current.from(
        atticRef.current.position,
        {
          duration: 1.5,
          y: 2,
        },
        0
      );
      timeLine.current.from(
        atticRef.current.position,
        {
          duration: 0.5,
          z: -2,
        },
        1.5
      );

      timeLine.current.from(
        atticRef.current.rotation,
        {
          duration: 0.5,
          y: Math.PI / 2,
        },
        1
      );
    },
    { scope: officeRef }
  );

  return (
    <group
      ref={officeRef}
      {...props}
      dispose={null}
      position={[0.5, -1, -1]}
      rotation={[0, -Math.PI / 3, 0]}
    >
      <mesh geometry={nodes["01_office"].geometry} material={materials["01"]} />
      <group position={[0, 2.114, -2.23]}>
        <group ref={libraryRef}>
          <mesh
            geometry={nodes["02_library"].geometry}
            material={materials["02"]}
          />
        </group>
      </group>
      <group position={[-1.97, 4.227, -2.199]}>
        <group ref={atticRef}>
          <mesh
            geometry={nodes["03_attic"].geometry}
            material={materials["03"]}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/WawaOffice.glb");
