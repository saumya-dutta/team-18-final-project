import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

export default function SleepPage() {
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [logs, setLogs] = React.useState([]);

    const handleSave = () => {
        if (startTime && endTime) {
            const hoursSlept = calculateHoursSlept(startTime, endTime);
            const log = {
                startTime: startTime,
                endTime: endTime,
                hoursSlept: hoursSlept
            };
            setLogs([...logs, log]);
            setStartTime('');
            setEndTime('');
        } else {
            alert('Please enter valid start and end times.');
        }
    };

    const calculateHoursSlept = (start, end) => {
        const startHour = parseInt(start.split(':')[0]);
        const startMinute = parseInt(start.split(':')[1]);
        const endHour = parseInt(end.split(':')[0]);
        const endMinute = parseInt(end.split(':')[1]);

        let hours = endHour - startHour;
        let minutes = endMinute - startMinute;

        if (minutes < 0) {
            hours--;
            minutes += 60;
        }

        return hours + (minutes / 60);
    };

    return (
        <Card>
            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Sleep</Typography>
                <Typography level="body-sm">
                    Add your sleep logs!
                </Typography>
            </Box>
            <Divider />
            {logs.map((log, index) => (
                <Box key={index} sx={{ my: 1 }}>
                    <Typography>{`Day ${index + 1}: Start Time - ${log.startTime}, End Time - ${log.endTime}, Hours Slept - ${log.hoursSlept.toFixed(2)}`}</Typography>
                </Box>
            ))}

            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack spacing={2} sx={{ my: 1 }}>
                    <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            type="time"
                            inputProps={{ step: 300 }} // 5 minutes interval
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            type="time"
                            inputProps={{ step: 300 }} // 5 minutes interval
                        />
                    </FormControl>
                </Stack>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                        Cancel
                    </Button>
                    <Button size="sm" variant="solid" onClick={handleSave}>
                        Save
                    </Button>
                </CardActions>
            </CardOverflow>

        </Card>
    )
}

