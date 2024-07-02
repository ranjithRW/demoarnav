import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon from react-icons library
import'./ExploreRandomWalk.css';
function Executive() {
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
            {/* Live Camera Feed */}
            <video ref={videoRef} className="video-background" autoPlay muted></video>

            <div className="container">
                <div className="header">
                    <div className="title-line">
                        <h2 className="title">Explore</h2>
                        <div className="close-icon">
                            <FaTimes />
                        </div>
                    </div>
                    <div className="subtitle">
                        <h2>RandomWalk</h2>
                    </div>
                    <div className="button-row">
                        <button className="button">All</button>
                        <button className="button">Executive</button>
                        <button className="button">Department</button>
                        <button className="button">Common Areas</button>
                    </div>
                </div>
                <div className="sections-container">
                    <div className="section-row">
                        <div className="section">
                            <img src="anant.jpeg" alt="Image 1" />
                            <div className="section-content">
                                Anant Room
                            </div>
                        </div>
                        <div className="section">
                            <img src="ashish.jpeg" alt="Image 2" />
                            <div className="section-content">
                                Ashish Room
                            </div>
                        </div>
                        <div className="section">
                            <img src="chan.jpeg" alt="Image 3" />
                            <div className="section-content">
                                Chan Room
                            </div>
                        </div>
                    </div>
                    <div className="section-row">
                      
                       
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Executive;
