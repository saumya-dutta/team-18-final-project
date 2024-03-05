import React, { useState } from 'react';
import { Container, ButtonGroup, Button, TextField, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function WaterInput() {
  const [count, setCount] = useState(0);

  const handleChange = (event) => {
    setCount(Math.max(Number(event.target.value), 0));
  };

  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Water Intake
        </Typography>
        <Container>
          <ButtonGroup>
            <Button
              onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
              disabled={count === 0}
              variant="contained"
              color="primary"
              sx={{ minWidth: '40px' }}
            >
              <RemoveIcon />
            </Button>
            <TextField
              size="small"
              onChange={handleChange}
              value={count}
              type="number"
              InputProps={{
                inputProps: { 
                  min: 0, 
                  style: { textAlign: 'center' } 
                }
              }}
              sx={{ '& .MuiInputBase-input': { width: '50px' } }}
            />
            <Button
              onClick={() => setCount((prev) => prev + 1)}
              variant="contained"
              color="primary"
              sx={{ minWidth: '40px' }}
            >
              <AddIcon />
            </Button>
          </ButtonGroup>
          <Button onClick={() => setCount(0)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
            Clear
          </Button>
        </Container>
      </CardContent>
    </Card>
  );
}