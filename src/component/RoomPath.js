// //siva+mine:

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './RoomPath.css';
// import { FaTimes } from 'react-icons/fa';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
// function RoomPath() {
//     const videoRef = useRef(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { room } = location.state;
//     const [coordinate1, setCoordinate1] = useState({ x: 0, z: 0 });
//     const [coordinate2, setCoordinate2] = useState({ x: 0, z: 0 });
//     const [floor, setLoading] = useState(true);
//     const [goDis, setDis] = useState(false);
//     const [messageBack, setMessage] = useState();
 
//     useEffect(() => {
//         async function startVideo() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({          
//                     video: {facingMode: {exact:"environment"} }
//                  });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             } catch (err) {
//                 console.error("Error accessing the camera: ", err);
//             }
//         }
 
//         startVideo();
 
//         return () => {
//             if (videoRef.current && videoRef.current.srcObject) {
//                 videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, []);
 
//     useEffect(() => {
//         async function fetchNavigationDocument() {
//             try {
//                 const docRef = doc(db, 'navigations', room.name);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     if (data && data.first && data.second) {
//                         const { x: x1, z: z1 } = data.first;
//                         const { x: x2, z: z2 } = data.second;
//                         coordinate1.x = x1;
//                         coordinate1.z = z1;
//                         coordinate2.x = x2;
//                         coordinate2.z = z2;
//                         setDis(true);
//                         console.log(`First point: x=${coordinate1.x}, z=${coordinate1.z}`);
//                         console.log(`Second point: x=${coordinate2.x}, z=${coordinate2.z}`);
//                     } else {
//                         setLoading(false);
//                         const data = docSnap.data();
//                         const {message : msg} = data;
//                         setMessage(msg);
//                         console.log('message :',msg);
//                     }
//                 } else {
//                     console.log("No such document!");
//                 }
//             } catch (err) {
//                 console.error("Error fetching navigation document: ", err);
//             }
//         }
 
//         fetchNavigationDocument();
//     }, []);
 
//     useEffect(() => {
//         const checkXRSupport = async () => {
//             if ('xr' in navigator) {
//                 try {
//                     return await navigator.xr.isSessionSupported('immersive-ar');
//                 } catch (e) {
//                     console.error('Error checking XR support:', e);
//                     return false;
//                 }
//             }
//             console.error('XR not available in navigator');
//             return false;
//         };
 
//         const startAR = async () => {
//             const supported = await checkXRSupport();
//             if (!supported) {
//                 console.error('WebXR AR is not supported in this browser.');
//                 return;
//             }
 
//             const enterARButton = document.getElementById('enter-ar');
//             if (!enterARButton) {
//                 console.error('No element with ID "enter-ar" found.');
//                 return;
//             }
 
//             enterARButton.addEventListener('click', async () => {
//                 try {
//                     const session = await navigator.xr.requestSession('immersive-ar', {
//                         requiredFeatures: ['local-floor'],
//                         optionalFeatures: ['local']
//                     });
//                     console.log('session :', session);
//                     initializeARScene(session);
//                 } catch (e) {
//                     alert('arsession creation error')
//                     console.error('Error starting AR session:', e);
//                 }
//             });
//         };
 
//         const initializeARScene = (session) => {
//             console.log('done');
//             const scene = new THREE.Scene();
//             const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
       
//             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//             scene.add(ambientLight);
       
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//             directionalLight.position.set(0, 1, 1).normalize();
//             scene.add(directionalLight);
       
//             const geometry = new THREE.BoxGeometry();
//             const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
//             const cube = new THREE.Mesh(geometry, material);
//             cube.scale.set(0.5, 0.5, 0.5);
//             cube.position.set(0, 0.02, 0);
//             scene.add(cube);
       
//             const cube2 = new THREE.Mesh(geometry, material);
//             cube2.scale.set(0.5, 0.5, 0.5);
//             cube2.position.set(coordinate1.x, 0.02, coordinate1.z);
//             scene.add(cube2);
       
//             const loader = new GLTFLoader();
//             loader.load('map_pointer_3d_icon.glb', (gltf) => {
//                 const model = gltf.scene;
//                 model.scale.set(0.1,0.1,0.1);
//                 model.position.set(coordinate2.x, 0.4, coordinate2.z);
               
//                 const clock = new THREE.Clock();
//                 const rotateSpeed = 1;
//                 const animateModel = () => {
//                     const delta = clock.getDelta();
//                     model.rotateY(delta * rotateSpeed);
//                 };
//                 scene.add(model);
//                 const animate = () => {
//                     requestAnimationFrame(animate);
//                     animateModel();
//                     renderer.render(scene, camera);
//                 };
//                 animate();
//                 scene.add(model);
 
//             }, undefined, (error) => {
//                 console.error('An error happened', error);
//             });
       
//             createTubePath([
//                 new THREE.Vector3(0, 0, 0),
//                 new THREE.Vector3(coordinate1.x, 0, coordinate1.z)
//             ]);
       
//             createTubePath([
//                 new THREE.Vector3(coordinate1.x, 0, coordinate1.z),
//                 new THREE.Vector3(coordinate2.x, 0, coordinate2.z)
//             ]);
       
//             function createTubePath(points) {
//                 const curve = new THREE.CatmullRomCurve3(points);
//                 const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.02, 8, false);
//                 const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//                 const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
//                 scene.add(tubeMesh);
//             }
       
//             const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             renderer.xr.enabled = true;
//             document.body.appendChild(renderer.domElement);
       
//             renderer.xr.setSession(session);
       
//             window.addEventListener('resize', () => {
//                 camera.aspect = window.innerWidth / window.innerHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(window.innerWidth, window.innerHeight);
//             });
       
//             const setReferenceSpace = async () => {
//                 try {
//                     await session.requestReferenceSpace('local-floor');
//                     renderer.xr.setReferenceSpaceType('local-floor');
//                 } catch {
//                     try {
//                         await session.requestReferenceSpace('local');
//                         renderer.xr.setReferenceSpaceType('local');
//                     } catch (e) {
//                         console.error('Error setting reference space:', e);
//                     }
//                 }
//             };
       
//             const animate = () => {
//                 renderer.setAnimationLoop(() => renderer.render(scene, camera));
//             };
       
//             setReferenceSpace();
//             animate();
//         };
       
//         startAR();
//     }, []);
 
//     return (
//         <div className="app">
//             <video ref={videoRef} className="video-background" autoPlay muted></video>
//             <div className="bottom-section">
//                 <div className="close-icon" onClick={() => navigate('/explore')}>
//                     <FaTimes />
//                 </div>
//                 <div className="bottom-content">
//                     <img src={room.image} alt={room.content} className="profile-picture" />
//                     {floor ? (
//                         <div className="text">
//                           <h4>{room.content}</h4>
//                           <p>5 m &bull; 2 min</p>
//                     </div>
//                     ):
//                     <div className="text">
//                         <h4>{room.content}</h4>
//                         <p>{messageBack}</p>
//                     </div>
//                     }
//                 </div>
//                 {floor ? (
//                     <button className="go-button" id='enter-ar' disabled = {!goDis}>Go</button>
//                 ): null  
//                 }
//             </div>
//         </div>
//     );
// }
 
// export default RoomPath;








//sai+mine+siva
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RoomPath.css';
import { FaTimes } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
function RoomPath() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state;
    const [coordinate1, setCoordinate1] = useState({ x: 0, z: 0 });
    const [coordinate2, setCoordinate2] = useState({ x: 0, z: 0 });
    const [floor, setLoading] = useState(true);
    const [messageBack, setMessage] = useState();
 
    useEffect(() => {
        async function startVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({          
                    video: { facingMode: { exact: "environment" } }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing the camera: ", err);
            }
        }
 
        startVideo();
 
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);
 
    useEffect(() => {
        async function fetchNavigationDocument() {
            try {
                const docRef = doc(db, 'navigations', room.name);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.first && data.second) {
                        const { x: x1, z: z1 } = data.first;
                        const { x: x2, z: z2 } = data.second;
                        coordinate1.x = x1;
                        coordinate1.z = z1;
                        coordinate2.x = x2;
                        coordinate2.z = z2;
                        console.log(`First point: x=${coordinate1.x}, z=${coordinate1.z}`);
                        console.log(`Second point: x=${coordinate2.x}, z=${coordinate2.z}`);
                    } else {
                        setLoading(false);
                        const data = docSnap.data();
                        const { message: msg } = data;
                        setMessage(msg);
                        console.log('message :', msg);
                    }
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.error("Error fetching navigation document: ", err);
            }
        }
 
        fetchNavigationDocument();
    }, []);
 
    useEffect(() => {
        const checkXRSupport = async () => {
            if ('xr' in navigator) {
                try {
                    return await navigator.xr.isSessionSupported('immersive-ar');
                } catch (e) {
                    console.error('Error checking XR support:', e);
                    return false;
                }
            }
            console.error('XR not available in navigator');
            return false;
        };
 
        const startAR = async () => {
            const supported = await checkXRSupport();
            if (!supported) {
                console.error('WebXR AR is not supported in this browser.');
                return;
            }
 
            const enterARButton = document.getElementById('enter-ar');
            if (!enterARButton) {
                console.error('No element with ID "enter-ar" found.');
                return;
            }
 
            enterARButton.addEventListener('click', async () => {
                try {
                    const session = await navigator.xr.requestSession('immersive-ar', {
                        requiredFeatures: ['local-floor'],
                        optionalFeatures: ['local']
                    });
                    console.log('session :', session);
                    initializeARScene(session);
                } catch (e) {
                    console.error('Error starting AR session:', e);
                }
            });
        };
 
        const initializeARScene = (session) => {
            console.log('done');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
       
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
       
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 1, 1).normalize();
            scene.add(directionalLight);
       
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.scale.set(0.5, 0.5, 0.5);
            cube.position.set(0, 0.02, 0);
            scene.add(cube);
       
            const cube2 = new THREE.Mesh(geometry, material);
            cube2.scale.set(0.5, 0.5, 0.5);
            cube2.position.set(coordinate1.x, 0.02, coordinate1.z);
            scene.add(cube2);
       
            const loader = new GLTFLoader();
            loader.load('map_pointer_3d_icon.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.2, 0.2, 0.2);
                model.position.set(coordinate2.x, 0.4, coordinate2.z);
               
                const clock = new THREE.Clock();
                const rotateSpeed = 1;
                const animateModel = () => {
                    const delta = clock.getDelta();
                    model.rotateY(delta * rotateSpeed);
                };
                scene.add(model);
                const animate = () => {
                    requestAnimationFrame(animate);
                    animateModel();
                    renderer.render(scene, camera);
                };
                animate();
                scene.add(model);
            }, undefined, (error) => {
 
                console.error('An error happened', error);
            });
       
            createArrowPath([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(coordinate1.x, 0, coordinate1.z)
            ]);
       
            createArrowPath([
                new THREE.Vector3(coordinate1.x, 0, coordinate1.z),
                new THREE.Vector3(coordinate2.x, 0, coordinate2.z)
            ]);
       
            function createArrowPath(points) {
                const loader = new GLTFLoader();
                loader.load('carArrow.glb', (gltf) => {
                    const arrowModel = gltf.scene;
                   
                    const distance = points[0].distanceTo(points[1]);
                    const arrowSpacing = 0.5;
                    const numArrows = Math.ceil(distance / arrowSpacing);
           
                    for (let i = 0; i < numArrows; i++) {
                        const t = i / (numArrows - 1);
                        const position = new THREE.Vector3().lerpVectors(points[0], points[1], t);
                        const arrow = arrowModel.clone();
                        arrow.position.copy(position);
                        arrow.scale.set(0.1, 0.1, 0.1);
                       
                        const direction = new THREE.Vector3().subVectors(points[1], points[0]).normalize();
                        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
                        arrow.setRotationFromQuaternion(quaternion);
                        arrow.rotateY(Math.PI);
                       
                        scene.add(arrow);
                    }
                }, undefined, (error) => {
                    console.error('An error happened', error);
                });
            }
           
           
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.xr.enabled = true;
            document.body.appendChild(renderer.domElement);
       
            renderer.xr.setSession(session);
       
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
       
            const setReferenceSpace = async () => {
                try {
                    await session.requestReferenceSpace('local-floor');
                    renderer.xr.setReferenceSpaceType('local-floor');
                } catch {
                    try {
                        await session.requestReferenceSpace('local');
                        renderer.xr.setReferenceSpaceType('local');
                    } catch (e) {
                        console.error('Error setting reference space:', e);
                    }
                }
            };
       
            const animate = () => {
                renderer.setAnimationLoop(() => renderer.render(scene, camera));
            };
       
            setReferenceSpace();
            animate();
        };
       
        startAR();
    }, []);
 
    return (
        <div className="app">
            <video ref={videoRef} className="video-background" autoPlay muted></video>
            <div className="bottom-section">
                <div className="close-icon" onClick={() => navigate('/explore')}>
                    <FaTimes />
                </div>
                <div className="bottom-content">
                    <img src={room.image} alt={room.content} className="profile-picture" />
                    {floor ? (
                        <div className="text">
                          <h4>{room.content}</h4>
                          <p>5 m &bull; 2 min</p>
                    </div>
                    ) : (
                    <div className="text">
                        <h4>{room.content}</h4>
                        <p>{messageBack}</p>
                    </div>
                    )}
                </div>
                {floor ? (
                    <button className="go-button" id="enter-ar">Go</button>
                ) : null}
            </div>
        </div>
    );
}
 
export default RoomPath;


