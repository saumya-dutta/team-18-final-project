// // import * as React from 'react';
// import React, { useState } from 'react';
// import { withFirebase } from '../Firebase/context';
// import { Firebase } from '../Firebase';


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box';
// import Typography from "@mui/material/Typography";
// import Paper from '@mui/material/Paper';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
// import Grid from "@mui/material/Grid";

// //import BackgroundImage from "./backgroundImage.jpg"

// const serverURL = "";

// const opacityValue = 0.9;

// const lightTheme = createTheme({
//   palette: {
//     type: 'light',
//     background: {
//       default: "#ffffff"
//     },
//     primary: {
//       main: '#ef9a9a',
//       light: '#ffcccb',
//       dark: '#ba6b6c',
//       background: '#eeeeee'
//     },
//     secondary: {
//       main: "#b71c1c",
//       light: '#f05545',
//       dark: '#7f0000'
//     },
//   },
// });


// const SignIn = () => {

//   const firebase = new Firebase();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const [isSignIn, setIsSignIn] = useState(true);

//   const handleSignIn = async () => {
//     try {
//       await firebase.doSignInWithEmailAndPassword(email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       await firebase.doCreateUserWithEmailAndPassword(email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const toggleSignIn = () => {
//     setIsSignIn(!isSignIn);
//     setError(null); // Reset error message when toggling between sign-in and sign-up
//   };

//   return (
//     // <ThemeProvider theme={lightTheme}>
//     //   <Grid
//     //     container
//     //     spacing={0}
//     //     direction="column"
//     //     justify="flex-start"
//     //     alignItems="flex-start"
//     //     style={{ minHeight: '100vh' }}
//     //   >
//     //     <Grid item>

//     //       <Typography
//     //         variant={"h3"}
//     //         align="flex-start"
//     //       >


//     //           <React.Fragment>
//     //             Sign In page
//     //           </React.Fragment>

//     //       </Typography>

//     //     </Grid>
//     //   </Grid>
//     // </ThemeProvider>
//     <div style={{ margin: '25%' }}>
//       <Box component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//         <Card variant="outlined" sx={{ maxWidth: 600 }}>
//           <React.Fragment>
//             <CardContent>

//               <div style={{ width: '400px', textAlign: 'center' }}>
//                 <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   style={{ marginBottom: '10px' }}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   style={{ marginBottom: '10px' }}
//                 />
//                 {isSignIn ? (
//                   <>
//                     <button onClick={handleSignIn} style={{ marginRight: '5px' }}>Sign In</button>
//                     <h2>Haven't signed up yet?</h2>
//                     <button onClick={toggleSignIn}>Sign Up</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={handleSignUp} style={{ marginRight: '5px' }}>Sign Up</button>
//                     <h2>Already have an account?</h2>
//                     <button onClick={toggleSignIn}>Sign In</button>
//                   </>
//                 )}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//               </div>
  

//             </CardContent>


//             {/* <CardActions>
//             <Button size="small">Learn More</Button>
//           </CardActions> */}


//           </React.Fragment>
//         </Card>
//       </Box>
//     </div>


//   );
// }

// export default withFirebase(SignIn);

// export default SignIn;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { withFirebase } from '../Firebase/context'; // Adjust the path based on the actual location of your context file

function AuthForm({ firebase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true); // Initially, show sign-in form
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      // Optionally, you can perform additional actions after successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await firebase.doCreateUserWithEmailAndPassword(email, password);
      // Optionally, you can perform additional actions after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(prevState => !prevState); // Toggle between sign-in and sign-up
  };

  return (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardContent>
          <div style={{ width: '400px', textAlign: 'center' }}>
            <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            {isSignIn ? (
              <>
                <button onClick={handleSignIn} style={{ marginRight: '5px' }}>Sign In</button>
                <h2>Haven't signed up yet?</h2>
                <button onClick={toggleSignIn}>Sign Up</button>
              </>
            ) : (
              <>
                <button onClick={handleSignUp} style={{ marginRight: '5px' }}>Sign Up</button>
                <h2>Already have an account?</h2>
                <button onClick={toggleSignIn}>Sign In</button>
              </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default withFirebase(AuthForm);
