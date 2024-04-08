import * as React from 'react';
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
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import MenuItem from '@mui/joy/MenuItem';

export default function Plan(props) {
    const [userPlan, setUserPlan] = React.useState('');

    React.useEffect(() => {
        loadUserPlan({ email: 'okay@okay.com' });
    }, [])


    const serverURL = ""

    const callApiGetUserPlan = async (serverURL, email) => {
        const url = serverURL + "/api/user/plan";

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
            console.log("User plan: ", body);
            return body;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            throw new Error('Failed to parse server response');
        }
    }




    const loadUserPlan = ({ email }) => {
        callApiGetUserPlan(serverURL, email)
            .then(res => {
                console.log("callApiGetUserPlan returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetUserPlan parsed: ", parsed);
                setUserPlan(parsed[0].plan);
                console.log(userPlan);
            });
    }



    return (
        <div>
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">This is your current plan!</Typography>
                    {/* <Typography level="body-sm">
                        Upgrade your plan here
                    </Typography> */}
                </Box>
                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                    <img
                        src="https://images.pexels.com/photos/949131/pexels-photo-949131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        // srcSet="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-orange-512.png"
                        loading="lazy"
                        alt=""
                    />
                    <Typography
                        variant="soft"
                        color="warning"
                        startDecorator="🚨"
                        fontSize="sm"
                        level="h2"
                        sx={{ '--Typography-gap': '0.5rem', p: 1 }}
                    >
                        {userPlan || 'Loading...'}
                    </Typography>
                    {/* <Typography variant="body1" level="h2">
                        {userPlan || 'Loading...'}
                    </Typography> */}
                    <Divider />
                    <Typography variant="body2" color="textSecondary">
                        Upgrade your plan to access more features and benefits.
                    </Typography>


                </Stack>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>

                        <Button size="sm" variant="solid"
                        // onClick={handleSave}
                        >
                            Save
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </div>
    )
}