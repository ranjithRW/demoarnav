import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './RoomPath.css';
import { FaTimes } from 'react-icons/fa';

function RoomPath({ room }) {
  const videoRef = useRef(null);
  const navigate = useNavigate(); 
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
        <button className="close-icon" onClick={() => navigate('/')}>
          <FaTimes />
        </button>
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
