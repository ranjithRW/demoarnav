import React, { useEffect, useRef } from 'react';
import './RoomPath.css';
import { FaTimes } from 'react-icons/fa'; 
function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
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
      <div className="close-icon">
            <FaTimes />
          </div>
        <div className="bottom-content">
          <img 
            src="chan.jpeg" 
            alt="Profile" 
            className="profile-picture" 
          />
          <div className="text">
            <h4>Chan's Cabin</h4>
            <p>5 m &bull; 2 min</p>
          </div>
        </div>
        <button className="go-button">Go</button>
      </div>
    </div>
  );
}

export default App;
