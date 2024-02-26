// Assuming you're setting up FirebaseContext.Provider here
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { FirebaseContext, auth } from './components/Firebase'; // Correct import

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ auth }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);