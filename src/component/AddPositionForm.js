// src/components/AddPositionForm.js
import React, { useState } from 'react';
import { firestore } from '../firebaseConfig'; // Adjust the import path as necessary
import { collection, doc, setDoc } from "firebase/firestore";

const AddPositionForm = ({ onSave }) => {
  const [positions, setPositions] = useState([{ x: '', y: '', z: '' }]);
  const [selectedRoom, setSelectedRoom] = useState('Server');

  const handleInputChange = (index, e) => {
    const values = [...positions];
    values[index][e.target.name] = e.target.value;
    setPositions(values);
  };

  const handleAddPosition = () => {
    setPositions([...positions, { x: '', y: '', z: '' }]);
  };

  const handleSave = async () => {
    try {
      const positionsData = positions.map((pos, index) => ({
      ...pos,
        id: index,
      }));

      const roomsRef = collection(firestore, 'rooms');
      const roomDocRef = doc(roomsRef, selectedRoom);

      await setDoc(roomDocRef, { markers: positionsData }, { merge: true });

      onSave(positions); // Notify parent component to clear positions
    } catch (error) {
      console.error("Failed to save positions:", error);
      // Optionally, handle the error further, e.g., display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSave}>
      {positions.map((position, index) => (
        <div key={index}>
          <input
            name="x"
            placeholder="X"
            value={position.x}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            name="y"
            placeholder="Y"
            value={position.y}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            name="z"
            placeholder="Z"
            value={position.z}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleAddPosition}>Add Another Position</button>
      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
        <option value="Server">Server</option>
        <option value="Conference">Conference</option>
        <option value="Product Designer">Product Designer</option>
        <option value="Designer">Designer</option>
        <option value="Restroom">Restroom</option>
      </select>
      <button type="button" onClick={(e) => { e.preventDefault(); handleSave(); }}>Save</button>
      </form>
  );
};

export default AddPositionForm;
