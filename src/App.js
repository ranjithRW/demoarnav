import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExploreRandomWalk from './component/ExploreRandomWalk';
import RoomPath from './component/RoomPath';
// import Scanner from './component/Scanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExploreRandomWalk />} />
        <Route path="/explore" element={<ExploreRandomWalk />} />
        <Route path="/roompath" element={<RoomPath />} />
        {/* <Route path='/scanner' element={<Scanner/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;



// import React from 'react';
// import Scanner from './component/Scanner';

// function App(){
//   return(
//     <>
//     <Scanner/>
//     </>
//   );
// }
// export default App;






















// import React from 'react'
// import Scanner from './component/Scanner'

// function App (){
//   return (
//     <div>
//       <Scanner/>
//     </div>
//   )
// }


// export default App;















//admin give static values in ffirebase

// import React from 'react';
// import AddPositionForm from './component/AddPositionForm'; // Adjust the import path as necessary

// function App() {
//   const handleOnSave = (positions) => {
//     console.log('Positions saved:', positions);
//     // Handle the saved positions as needed
//   };

//   return (
//     <div className="App">
//       <h1>Add Vector Positions</h1>
//       <AddPositionForm onSave={handleOnSave} />
//     </div>
//   );
// }

// export default App;
