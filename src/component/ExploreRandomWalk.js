// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './ExploreRandomWalk.css';
// import { FaTimes } from 'react-icons/fa';

// function ExploreRandomWalk() {
//   const videoRef = useRef(null);
//   const [activeButton, setActiveButton] = useState('All');
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

//   const sections = [
//     { id: 1, image: "anant.jpeg", content: "Anant cabin", category: "Executive" },
//     { id: 2, image: "ashish.jpeg", content: "Ashish cabin", category: "Executive" },
//     { id: 3, image: "chan.jpeg", content: "Chan cabin", category: "Executive" },
//     { id: 4, image: "prabhu.jpeg", content: "Prabhu cabin", category: "Executive" },
//     { id: 5, image: "designer.jpeg", content: "Designers Room", category: "Department" },
//     { id: 6, image: "developers.jpeg", content: "Developers Room", category: "Department" },
//     { id: 7, image: "conference.jpeg", content: "Conference", category: "Common Areas" },
//     { id: 8, image: "developers.jpeg", content: "Marketers Room", category: "Department" },
//     { id: 9, image: "server.jpeg", content: "Server Room", category: "Common Areas" },
//     { id: 10, image: "cafe.jpeg", content: "Cafeteria", category: "Common Areas" },
//     { id: 11, image: "meeting.jpeg", content: "Meeting Room", category: "Common Areas" },
//     { id: 12, image: "restroom.jpeg", content: "Rest Room", category: "Common Areas" },
//   ];

//   const filteredSections = activeButton === 'All'
//     ? sections
//     : sections.filter(section => section.category === activeButton);

//   const handleSectionClick = (room) => {
//     navigate('/roompath', { state: { room } });
//   };

//   const groupedSections = [];
//   for (let i = 0; i < filteredSections.length; i += 3) {
//     groupedSections.push(filteredSections.slice(i, i + 3));
//   }

//   return (
//     <div className="app">
//       <video ref={videoRef} className="video-background" autoPlay muted></video>

//       <div className="container">
//         <div className="header">
//           <div className="title-line">
//             <h2 className="title">Explore</h2>
//             <div className="close-icon">
//               <FaTimes />
//             </div>
//           </div>
//           <div className="subtitle">
//             <h2>RandomWalk</h2>
//           </div>
//           <div className="button-row">
//             <button             
//               className={`button ${activeButton === 'All' ? 'active' : ''}`}
//               onClick={() => setActiveButton('All')}
//             >
//               All
//             </button>
//             <button
//               className={`button ${activeButton === 'Executive' ? 'active' : ''}`}
//               onClick={() => setActiveButton('Executive')}
//             >
//               Executive
//             </button>
//             <button
//               className={`button ${activeButton === 'Department' ? 'active' : ''}`}
//               onClick={() => setActiveButton('Department')}
//             >
//               Department
//             </button>
//             <button
//               className={`button ${activeButton === 'Common Areas' ? 'active' : ''}`}
//               onClick={() => setActiveButton('Common Areas')}
//             >
//               Common Areas
//             </button>
//           </div>
//         </div>
//         <div className="sections-container">
//           {groupedSections.map((sectionRow, rowIndex) => (
//             <div className="section-row" key={rowIndex}>
//               {sectionRow.map(section => (
//                 <div className="section" key={section.id} onClick={() => handleSectionClick(section)}>
//                   <img src={section.image} alt={section.content} />
//                   <div className="section-content">
//                     {section.content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExploreRandomWalk;










// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ExploreRandomWalk.css';
// import { FaTimes } from 'react-icons/fa';

// function ExploreRandomWalk() {
//   const videoRef = useRef(null);
//   const [activeButton, setActiveButton] = useState('All');
//   const [showContainer, setShowContainer] = useState(true); // State to track container visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function startVideo() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: { exact: "environment" } }
//         });
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

//   const sections = [
//     { id: 1, image: "anant.jpeg", content: "Anant cabin", category: "Executive" },
//     { id: 2, image: "ashish.jpeg", content: "Ashish cabin", category: "Executive" },
//     { id: 3, image: "chan.jpeg", content: "Chan cabin", category: "Executive" },
//     { id: 4, image: "prabhu.jpeg", content: "Prabhu cabin", category: "Executive" },
//     { id: 5, image: "designer.jpeg", content: "Designers Room", category: "Department" },
//     { id: 6, image: "developers.jpeg", content: "Developers Room", category: "Department" },
//     { id: 7, image: "developers.jpeg", content: "Marketers Room", category: "Department" },
//     { id: 8, image: "conference.jpeg", content: "Conference", category: "Common Areas" },
//     { id: 9, image: "server.jpeg", content: "Server Room", category: "Common Areas" },
//     { id: 10, image: "cafe.jpeg", content: "Cafeteria", category: "Common Areas" },
//     { id: 11, image: "meeting.jpeg", content: "Meeting Room", category: "Common Areas" },
//     { id: 12, image: "restroom.jpeg", content: "Rest Room", category: "Common Areas" },
//     { id: 13, image: "server.jpeg", content: "PC Room", category: "Common Areas" },
//   ];

//   const filteredSections = activeButton === 'All'
//     ? sections
//     : sections.filter(section => section.category === activeButton);

//   const handleSectionClick = (room) => {
//     navigate('/roompath', { state: { room } });
//   };

//   const groupedSections = [];
//   for (let i = 0; i < filteredSections.length; i += 3) {
//     groupedSections.push(filteredSections.slice(i, i + 3));
//   }

//   const handleCloseClick = () => {
//     setShowContainer(false); 
//   };

//   return (
//     <div className="app">
//       <video ref={videoRef} className="video-background" autoPlay muted></video>
//       {showContainer && (
//         <div className="container">
//           <div className="header">
//             <div className="title-line">
//               <h2 className="title">Explore</h2>
//               <div className="close-icon" onClick={handleCloseClick}>
//                 <FaTimes />
//               </div>
//             </div>
//             <div className="subtitle">
//               <h2>RandomWalk</h2>
//             </div>
//             <div className="button-row">
//               <button
//                 className={`button ${activeButton === 'All' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('All')}
//               >
//                 All
//               </button>
//               <button
//                 className={`button ${activeButton === 'Executive' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Executive')}
//               >
//                 Executive
//               </button>
//               <button
//                 className={`button ${activeButton === 'Department' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Department')}
//               >
//                 Department
//               </button>
//               <button
//                 className={`button ${activeButton === 'Common Areas' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Common Areas')}
//               >
//                 Common Areas
//               </button>
//             </div>
//           </div>
//           <div className="sections-container">
//             {groupedSections.map((sectionRow, rowIndex) => (
//               <div className="section-row" key={rowIndex}>
//                 {sectionRow.map(section => (
//                   <div className="section" key={section.id} onClick={() => handleSectionClick(section)}>
//                     <img src={section.image} alt={section.content} />
//                     <div className="section-content">
//                       {section.content}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ExploreRandomWalk;








// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ExploreRandomWalk.css';
// import { FaTimes } from 'react-icons/fa';

// function ExploreRandomWalk() {
//   const videoRef = useRef(null);
//   const [activeButton, setActiveButton] = useState('All');
//   const [showContainer, setShowContainer] = useState(true); // State to track container visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function startVideo() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: { exact: "environment" } }
//         });
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

//   const sections = [
//     { id: 1, image: "anant.jpeg", content: "Anant cabin", category: "Executive" },
//     { id: 2, image: "ashish.jpeg", content: "Ashish cabin", category: "Executive" },
//     { id: 3, image: "chan.jpeg", content: "Chan cabin", category: "Executive" },
//     { id: 4, image: "prabhu.jpeg", content: "Prabhu cabin", category: "Executive" },
//     { id: 5, image: "designer.jpeg", content: "Designers Room", category: "Department" },
//     { id: 6, image: "developers.jpeg", content: "Developers Room", category: "Department" },
//     { id: 7, image: "developers.jpeg", content: "Marketers Room", category: "Department" },
//     { id: 8, image: "conference.jpeg", content: "Conference", category: "Common Areas" },
//     { id: 9, image: "server.jpeg", content: "Server Room", category: "Common Areas" },
//     { id: 10, image: "cafe.jpeg", content: "Cafeteria", category: "Common Areas" },
//     { id: 11, image: "meeting.jpeg", content: "Meeting Room", category: "Common Areas" },
//     { id: 12, image: "restroom.jpeg", content: "Rest Room", category: "Common Areas" },
//     { id: 13, image: "server.jpeg", content: "PC Room", category: "Common Areas" },
//   ];

//   const filteredSections = activeButton === 'All'
//     ? sections
//     : sections.filter(section => section.category === activeButton);

//   const handleSectionClick = (room) => {
//     navigate('/roompath', { state: { room } });
//   };

//   const groupedSections = [];
//   for (let i = 0; i < filteredSections.length; i += 3) {
//     groupedSections.push(filteredSections.slice(i, i + 3));
//   }

//   const handleCloseClick = () => {
//     navigate('/scanner'); 
//   };

//   return (
//     <div className="app">
//       <video ref={videoRef} className="video-background" autoPlay muted></video>
//       {showContainer && (
//         <div className="container">
//           <div className="header">
//             <div className="title-line">
//               <h2 className="title">Explore</h2>
//               <div className="close-icon" onClick={handleCloseClick}>
//                 <FaTimes />
//               </div>
//             </div>
//             <div className="subtitle">
//               <h2>RandomWalk</h2>
//             </div>
//             <div className="button-row">
//               <button
//                 className={`button ${activeButton === 'All' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('All')}
//               >
//                 All
//               </button>
//               <button
//                 className={`button ${activeButton === 'Executive' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Executive')}
//               >
//                 Executive
//               </button>
//               <button
//                 className={`button ${activeButton === 'Department' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Department')}
//               >
//                 Department
//               </button>
//               <button
//                 className={`button ${activeButton === 'Common Areas' ? 'active' : ''}`}
//                 onClick={() => setActiveButton('Common Areas')}
//               >
//                 Common Areas
//               </button>
//             </div>
//           </div>
//           <div className="sections-container">
//             {groupedSections.map((sectionRow, rowIndex) => (
//               <div className="section-row" key={rowIndex}>
//                 {sectionRow.map(section => (
//                   <div className="section" key={section.id} onClick={() => handleSectionClick(section)}>
//                     <img src={section.image} alt={section.content} />
//                     <div className="section-content">
//                       {section.content}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ExploreRandomWalk;




import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreRandomWalk.css';
import { FaTimes } from 'react-icons/fa';

function ExploreRandomWalk() {
  const videoRef = useRef(null);
  const [activeButton, setActiveButton] = useState('All');
  const [showContainer, setShowContainer] = useState(true); 
  const navigate = useNavigate();
  let stream = null; 

  useEffect(() => {
    async function startVideo() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
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
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const sections = [
    { id: 1, image: "anant.jpeg", content: "Anant cabin", category: "Executive" },
    { id: 2, image: "ashish.jpeg", content: "Ashish cabin", category: "Executive" },
    { id: 3, image: "chan.jpeg", content: "Chan cabin", category: "Executive" },
    { id: 4, image: "prabhu.jpeg", content: "Prabhu cabin", category: "Executive" },
    { id: 5, image: "designer.jpeg", content: "Designers Room", category: "Department" },
    { id: 6, image: "developers.jpeg", content: "Developers Room", category: "Department" },
    { id: 7, image: "developers.jpeg", content: "Marketers Room", category: "Department" },
    { id: 8, image: "conference.jpeg", content: "Conference", category: "Common Areas" },
    { id: 9, image: "server.jpeg", content: "Server Room", category: "Common Areas" },
    { id: 10, image: "cafe.jpeg", content: "Cafeteria", category: "Common Areas" },
    { id: 11, image: "meeting.jpeg", content: "Meeting Room", category: "Common Areas" },
    { id: 12, image: "restroom.jpeg", content: "Rest Room", category: "Common Areas" },
    { id: 13, image: "server.jpeg", content: "PC Room", category: "Common Areas" },
  ];

  const filteredSections = activeButton === 'All'
    ? sections
    : sections.filter(section => section.category === activeButton);

  const handleSectionClick = (room) => {
    navigate('/roompath', { state: { room } });
  };

  const groupedSections = [];
  for (let i = 0; i < filteredSections.length; i += 3) {
    groupedSections.push(filteredSections.slice(i, i + 3));
  }

  const handleCloseClick = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setShowContainer(false);
    const newTab = window.open('about:blank', '_self');
newTab.open();
  };

  return (
    <div className="app">
      <video ref={videoRef} className="video-background" autoPlay muted></video>
      {showContainer && (
        <div className="container">
          <div className="header">
            <div className="title-line">
              <h2 className="title">Explore</h2>
              <div className="close-icon" onClick={handleCloseClick}>
                <FaTimes />
              </div>
            </div>
            <div className="subtitle">
              <h2>RandomWalk</h2>
            </div>
            <div className="button-row">
              <button
                className={`button ${activeButton === 'All' ? 'active' : ''}`}
                onClick={() => setActiveButton('All')}
              >
                All
              </button>
              <button
                className={`button ${activeButton === 'Executive' ? 'active' : ''}`}
                onClick={() => setActiveButton('Executive')}
              >
                Executive
              </button>
              <button
                className={`button ${activeButton === 'Department' ? 'active' : ''}`}
                onClick={() => setActiveButton('Department')}
              >
                Department
              </button>
              <button
                className={`button ${activeButton === 'Common Areas' ? 'active' : ''}`}
                onClick={() => setActiveButton('Common Areas')}
              >
                Common Areas
              </button>
            </div>
          </div>
          <div className="sections-container">
            {groupedSections.map((sectionRow, rowIndex) => (
              <div className="section-row" key={rowIndex}>
                {sectionRow.map(section => (
                  <div className="section" key={section.id} onClick={() => handleSectionClick(section)}>
                    <img src={section.image} alt={section.content} />
                    <div className="section-content">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreRandomWalk;
