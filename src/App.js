// import React from 'react';
// import ExploreRandomWalk from './component/ExploreRandomWalk';
// import Executive from './component/Executive';
// import RoomPath from './component/RoomPath';
// import Department from './component/Department';

// function App() {
//   return (
//     <div className="App">
//       <ExploreRandomWalk/>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import AddPositionForm from './component/AddPositionForm'; // Adjust the import path as necessary

function App() {
  const handleOnSave = (positions) => {
    console.log('Positions saved:', positions);
    // Handle the saved positions as needed
  };

  return (
    <div className="App">
      <h1>Add Vector Positions</h1>
      <AddPositionForm onSave={handleOnSave} />
    </div>
  );
}

export default App;
