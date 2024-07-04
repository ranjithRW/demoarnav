// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// import './RoomPath.css';
// import { FaTimes } from 'react-icons/fa';

// function RoomPath({ room }) {
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function startVideo() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing the camera: ", err);
//       }
//     }

//     startVideo();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   // Function to handle navigation back to ExploreRandomWalk
//   const handleGoBack = () => {
//     navigate('/main'); // Navigate back to ExploreRandomWalk component
//   };

//   return (
//     <div className="app">
//       <video ref={videoRef} className="video-background" autoPlay muted></video>
//       <div className="bottom-section">
//         <div className="close-icon">
//           <FaTimes />
//         </div>
//         <div className="bottom-content">
//           <img
//             src={room.image}
//             alt={room.content}
//             className="profile-picture"
//           />
//           <div className="text">
//             <h4>{room.content}</h4>
//             <p>5 m &bull; 2 min</p>
//           </div>
//         </div>
//         <button className="go-button" onClick={handleGoBack}>Go</button>
//       </div>
//     </div>
//   );
// }

// export default RoomPath;


import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RoomPath.css';
import { FaTimes } from 'react-icons/fa';
import ExploreRandomWalk from './ExploreRandomWalk';

function RoomPath({ room }) {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  return (
    <div className="app">
      <video ref={videoRef} className="video-background" autoPlay muted></video>
      <div className="bottom-section">
        <Link to={"/"} className="close-icon">
        
          <FaTimes />
        </Link>
        <div className="bottom-content">
          <img
            src={room.image}
            alt={room.content}
            className="profile-picture"
          />
          <div className="text">
            <h4>{room.content}</h4>
            <p>5 m &bull; 2 min</p>
          </div>
        </div>
        <button className="go-button">Go</button>
      </div>
    </div>
  );
}

export default RoomPath;
