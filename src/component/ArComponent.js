import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/webxr/ARButton.js';

const ARComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer);
    containerRef.current.appendChild(arButton);

    // Adding cubes and tube to the scene
    const geometry1 = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube1 = new THREE.Mesh(geometry1, material1);
    cube1.position.set(0, -1.25, 0);
    scene.add(cube1);

    const geometry2 = new THREE.BoxGeometry();
    const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.set(-6, -1.25, 0);
    scene.add(cube2);

    const geometry3 = new THREE.BoxGeometry();
    const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube3 = new THREE.Mesh(geometry3, material3);
    cube3.position.set(-6, -1.25, 3);
    scene.add(cube3);

    const points = [];
    points.push(cube1.position);
    points.push(cube2.position);
    points.push(cube3.position);

    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = 'catmullrom';
    curve.tension = 0.5;

    const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.1, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00008b });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    function animate() {
      renderer.setAnimationLoop(render);
    }

    function render() {
      cube1.rotation.x += 0.01;
      cube1.rotation.y += 0.01;
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
      cube3.rotation.x += 0.01;
      cube3.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Corrected line
      renderer.dispose(); // Cleanup renderer
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}></div>
  );
};

export default ARComponent;
