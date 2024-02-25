// import React from 'react';
// // import Review from './Review';
// import Footer from '../Footer';
// import AuthForm from '../SignIn';
// import Food from '../Food'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// //import { Lan } from '@mui/icons-material';
// import FitnessGoals from '../Activity'



// function App() {
//   return (
//     <div>
//       {/* <AuthForm></AuthForm> */}
      
      

//       <Router>
//         <div>
//           <Routes>

//             <Route exact path="/" element={<Footer />} />
//             <Route exact path="/Food" element={<Food />} />
//             <Route exact path="/Activity" element={<Footer />} />
//             <Route exact path="/Profile" element={<Footer />} />
//             <Route exact path="/Activity" element={<FitnessGoals />} />

//           </Routes>
//         </div>
//         <Footer/>
//       </Router>


//     </div>
//   );
// }


// export default App;



import React from 'react';
import Footer from '../Footer';
import AuthForm from '../SignIn';
import Food from '../Food';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FitnessGoals from '../Activity';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route exact path="/" element={<div>Main Page Content Here</div>} /> 
          <Route path="/Food" element={<Food />} />
          <Route path="/Activity" element={<FitnessGoals />} />
          <Route path="/Profile" element={<div>Profile Page Content Here</div>} /> 
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
