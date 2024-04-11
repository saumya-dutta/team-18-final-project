import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Header from '../LandingPage/header.js';
import Landing from './landing.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function HomePage() {
  const [userQuestion, setUserQuestion] = React.useState('');

  const handleQuestionChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    console.log(userQuestion);
    setUserQuestion('');
    toast.success('Your question has been submitted. Thank you!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText("https://github.com/MSci-245-react/course-project-team-18")
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy the link.');
      });
  };

  const plans = [
    {
      title: 'Basic Plan',
      price: '$9.99/month',
      description: 'Supports tracking of food and activity.',
    },
    {
      title: 'Premium Plan',
      price: '$19.99/month',
      description:
        'Access to new features such as water intake, sleep, steps count, etc.',
    },
    {
      title: 'Ultimate Plan',
      price: '$29.99/month',
      description:
        'Real-time metrics of all features. Suggestions of workouts and recipes based on your past activity.',
    },
  ];

  const faqs = [
    {
      question: 'How do I sign up?',
      answer: 'You can sign up by clicking the "Sign Up" button on the top right corner of the page.',
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can change your plan at any time through your account settings.',
    },
    {
      question: 'What is included in the Ultimate Plan?',
      answer: 'The Ultimate Plan includes all features from the Basic and Premium plans, plus real-time metrics, workout and recipe suggestions.',
    }
  ];

  return (
    <div>
      <Header />
      <Landing />

      <Container>
        <Box my={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Choose Your Plan
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {plan.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {plan.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box my={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Food Tracking
                  </Typography>
                  <Typography variant="body2" component="p">
                    Log your meals and snacks to keep track of your nutrition
                    intake.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Activity Tracking
                  </Typography>
                  <Typography variant="body2" component="p">
                    Record your exercises and physical activities to monitor
                    your fitness progress.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Real-time Metrics
                  </Typography>
                  <Typography variant="body2" component="p">
                    Get instant feedback on your performance and health
                    statistics.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box my={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Frequently Asked Questions by Users! (FAQ)
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        </Container>
        <ToastContainer />
        <Container sx={{ my: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Have a Question for the Developers?
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmitQuestion}
          noValidate
          autoComplete="off"
        >
          <Input
            label="Your Question"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userQuestion}
            onChange={handleQuestionChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit Question
          </Button>
        </Box>
      </Container>
      <Container sx={{ my: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            bgcolor: 'orange',
            p: 2,
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div">
            Share this app with your friends!
          </Typography>
          <Button variant="outlined" color="neutral" onClick={handleShare}>
            Share
          </Button>
        </Box>
      </Container>
    </div>
  );
}
