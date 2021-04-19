import React, { useState } from 'react';
import * as R from 'ramda';
import { Select, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const CustomDropdown = ({ options, placeholder, actionOnChange, className }) => {
    const [currentValue, setCurrentValue] = useState('');

    const handleOnChange = (e) => {
        setCurrentValue(e.target.value);
        actionOnChange(e.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            <Select onChange={handleOnChange} className={className} value={currentValue}>
                {R.map((element) => <MenuItem key={element.key} value={element.value}>{element.text}</MenuItem>, options)}
            </Select>
        </FormControl>
    )
};

export default CustomDropdown;