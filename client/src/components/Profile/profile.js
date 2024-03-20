import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'; import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MenuItem from '@mui/joy/MenuItem';

// import DropZone from './DropZone';
// import FileUpload from './FileUpload';
import CountrySelector from './CountrySelector';
// import EditorToolbar from './EditorToolbar';
// import callApiLoadUserSettings from './utils/callApiLoadUserSettings';
const serverURL = ""


export default function Profile() {
  const [selectedGoal, setSelectedGoal] = React.useState("");
  const [userData, setUserData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    weight: '',
    height: '',
    country: '',
    age: ''
  });

  React.useEffect(() => {
    loadUserSettings({ email: 'okay@okay.com' });
  }, [])

  //to do: api returning 403 forbidden error - fix this
  const serverURL = ""

  const callApiLoadUserSettings = async (serverURL, email) => {
    const url = serverURL + "/api/user/email";

    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      })
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to fetch user settings');
    }

    try {
      const body = await response.json();
      console.log("User settings: ", body);
      return body;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Failed to parse server response');
    }
  }


  const loadUserSettings = ({ email }) => {
    callApiLoadUserSettings(serverURL, email)
      .then(res => {
        console.log("callApiLoadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadUserSettings parsed: ", parsed);
        setUserData(parsed[0]);
        // console.log(userData);
      });
  }

  const mapAgeToOption = (age) => {
    if (age >= 0 && age <= 19) {
      return '1'; // Corresponds to 'Youth'
    } else if (age >= 17 && age <= 30) {
      return '2'; // Corresponds to 'Young Adult'
    } else if (age >= 31 && age <= 45) {
      return '3'; // Corresponds to 'Middle Aged Adults'
    } else {
      return '4'; // Corresponds to 'Old Adults'
    }
  };

  return (
    <Stack
      spacing={4}
      sx={{
        display: 'flex',
        maxWidth: '800px',
        mx: 'auto',
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Personal info</Typography>
          <Typography level="body-sm">
            Customize how your profile here!
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
            <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
            >
              
              <img
                src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-orange-512.png"
                srcSet="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-orange-512.png"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            {/* <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: 'background.body',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                left: 100,
                top: 170,
                boxShadow: 'sm',
              }}
            > */}
              {/* <EditRoundedIcon /> */}
            {/* </IconButton> */}
          </Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input size="sm" placeholder="First name" value={userData.first_name} />
                <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} value={userData.last_name} />
              </FormControl>
            </Stack>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                value={userData.email}
                // defaultValue="okay@okay.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <FormLabel>Weight</FormLabel>
                <Input size="sm"
                  value={userData.weight}
                />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Height</FormLabel>
                <Input
                  size="sm"
                  // startDecorator={<EmailRoundedIcon />}
                  // placeholder="email"
                  // defaultValue="48"
                  value={userData.height}
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            <div>
              <CountrySelector />
            </div>
            <div>
              <FormControl sx={{ display: { sm: 'contents' } }}>
                <FormLabel>Age</FormLabel>
                <Select
                  size="sm"
                  startDecorator={<PersonSearchIcon />}
                  value={mapAgeToOption(userData.age)}
                >
                  <Option value="1">
                    Youth{' '}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      - (0 - 19)
                    </Typography>
                  </Option>
                  <Option value="2">
                    Young Adult{' '}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — (17 - 30)
                    </Typography>
                  </Option>
                  <Option value="3">
                    Middle Aged Adults{' '}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — (31 - 45)
                    </Typography>
                  </Option>
                  <Option value="4">
                    Old Adults{' '}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — Above 45
                    </Typography>
                  </Option>
                </Select>
              </FormControl>
            </div>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
        >


        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>

      {/* GOALS CARD */}
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Edit your Goals!</Typography>
          <Typography level="body-sm">
            Change or add your goals
          </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>

          <FormControl size="sm">
            <FormLabel>Choose your goal</FormLabel>
            <Select
              // value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Weight Loss">Weight Loss</MenuItem>
              <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
              <MenuItem value="Endurance Training">Endurance Training</MenuItem>
              <MenuItem value="Stretch more">Stretch more</MenuItem>
              <MenuItem value="Run a 5K">Run a 5K</MenuItem>
              <MenuItem value="Mobility">Mobility</MenuItem>
            </Select>
          </FormControl>
          <Textarea
            size="sm"
            minRows={2}
            sx={{ mt: 1.5 }}
            defaultValue="Details"
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
            275 characters left
          </FormHelperText>
        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>

    </Stack>

  )
}
