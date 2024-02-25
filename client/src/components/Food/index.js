import * as React from 'react';
import FoodTable from './FoodPage';
import WaterInput from './WaterInput';
import Stack from '@mui/material/Stack';

export default function Food(){
    return (
        <div>
            <FoodTable/>
            <WaterInput/>
        </div>
    )
}
