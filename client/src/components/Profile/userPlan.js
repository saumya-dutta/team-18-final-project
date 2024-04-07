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
    // the on changes for the input fields dont work - fix this!!!
    const { userGoal, userGoalDesc, userID } = props;
    const [selectedGoal, setSelectedGoal] = React.useState(userGoal);
    const [goalDescription, setGoalDescription] = React.useState(userGoalDesc);
    const [isModified, setIsModified] = React.useState(false);


    React.useEffect(() => {
        if (userGoal) {
            setSelectedGoal(userGoal);
            console.log(userGoal);
        } else {
            setSelectedGoal("None");
        }
    }, [userGoal]);

    const handleSave = () => {
        // Check if the data has been modified
        if (!isModified) {
            console.log('No changes to save.');
            return;
        }

        // Prepare the data to be sent in the request body
        const data = {
            userID: userID,
            goal: selectedGoal,
            description: goalDescription,
        };

        // Send a PUT request to update the goals
        fetch('/api/user/goals/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('User goals updated successfully');
                    // Optionally, you can perform additional actions here after the goals are updated
                    setIsModified(false); // Reset the modified state
                } else {
                    console.error('Failed to update user goals');
                }
            })
            .catch((error) => {
                console.error('Error updating user goals:', error);
            });
    };

    const handleGoalChange = (event) => {
        setSelectedGoal(event.target.value);
        setIsModified(true);
    };

    const handleDescriptionChange = (event) => {
        setGoalDescription(event.target.value);
        setIsModified(true);
    };

    return (
        <div>
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">This is your current plan!</Typography>
                    <Typography level="body-sm">
                        Upgrade your plan here
                    </Typography>
                </Box>
                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>

                    {/* <FormControl size="sm">
                        <FormLabel>Choose your goal</FormLabel>
                        <Select
                            value={selectedGoal}
                            onChange={(e) => setSelectedGoal(e.target.value)}
                        >
                            <Option value="None">None</Option>
                            <Option value="Weight Loss">Weight Loss</Option>
                            <Option value="Muscle Gain">Muscle Gain</Option>
                            <Option value="Endurance Training">Endurance Training</Option>
                            <Option value="Stretch more">Stretch more</Option>
                            <Option value="Run a 5K">Run a 5K</Option>
                            <Option value="Mobility">Mobility</Option>
                        </Select>
                    </FormControl> */}
                    <Textarea
                        size="sm"
                        minRows={2}
                        sx={{ mt: 1.5 }}
                        // defaultValue="Details"
                        value={userGoalDesc}
                        // onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                    <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                        275 characters left
                    </FormHelperText>
                </Stack>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>

                        <Button size="sm" variant="solid" onClick={handleSave}>
                            Save
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </div>
    )
}