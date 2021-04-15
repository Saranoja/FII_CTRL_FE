import React from 'react';
import * as R from 'ramda';
import { Select, FormControl, FormHelperText } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


const CustomDropdown = ({ options, placeholder, actionOnChange, className }) => {
    const handleOnChange = (e, { value }) => {
        actionOnChange(value);
    };

    return (
        <FormControl>
            <Select onChange={handleOnChange} className={className} >
                {R.map((element) => <MenuItem key={element.key} value={element.value}>{element.text}</MenuItem>, options)}
            </Select>
            <FormHelperText>{placeholder}</FormHelperText>
        </FormControl>
    )
};

export default CustomDropdown;