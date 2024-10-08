import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from './TwoSidedLayout.js';
import SignIn from '../SignInAndSignUp/index';
import Drawer from '@mui/material/Drawer';
export default function Landing() {
  const [openLogin, setOpenLogin] = React.useState(false);

  const toggleDrawer = newOpen => () => {
    setOpenLogin(newOpen);
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', 
    });
  };

  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Welcome to Fit-ify! Strength Training and Healthy eating all in one
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
      Trim down or bulk up, run faster, or bike farther—however you work out, these top-rated workout apps help you keep your commitment to physical fitness.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          my: 2,
          '& > *': {flex: 'auto'},
        }}
      >
        <Button
          size="lg"
          variant="outlined"
          color="neutral"
          onClick={scrollToBottom}
        >
          Learn More
        </Button>
        <Button
          size="lg"
          onClick={toggleDrawer(true)}
          endDecorator={<ArrowForward fontSize="xl" />}
        >
          Get Started
        </Button>
        <Drawer open={openLogin} onClose={toggleDrawer(false)} anchor="right">
          <SignIn />
        </Drawer>
      </Box>
      <Box
        sx={theme => ({
          display: 'flex',
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: 'center',
          alignSelf: 'stretch',
          '& > *': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              alignItems: 'initial',
            },
          },
        })}
      >
        <div>
          <Typography
            fontSize="xl4"
            fontWeight="lg"
            endDecorator={<Star fontSize="xl4" sx={{color: 'warning.300'}} />}
          >
            4.9
          </Typography>
          <Typography textColor="text.secondary">
            Rated by <b>5k</b> people on App Store and Google Play
          </Typography>
        </div>
        <div>
          <Typography fontSize="xl4" fontWeight="lg">
            9.5k+
          </Typography>
          <Typography textColor="text.secondary">
            Active users from the 70+ countries
          </Typography>
        </div>
      </Box>
    </TwoSidedLayout>
  );
}
