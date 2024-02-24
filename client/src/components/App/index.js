import React from 'react';
// import Review from './Review';
import Footer from '../Footer';
import SignIn from '../SignIn';
import Food from '../Food'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Lan } from '@mui/icons-material';


function App() {
  return (
    <div>
      {/* <SignIn></SignIn> */}
      

      <Router>
        <div>
          <Routes>

            <Route exact path="/" element={<Footer />} />
            <Route exact path="/Food" element={<Food />} />
            <Route exact path="/Activity" element={<Footer />} />
            <Route exact path="/Profile" element={<Footer />} />

          </Routes>
        </div>
        <Footer/>
      </Router>


    </div>
  );
}

export default App;
