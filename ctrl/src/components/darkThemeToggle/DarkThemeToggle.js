import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import StyledDarkThemeToggle from './DarkThemeToggle.style';

const DarkThemeToggle = ({ checked, onChange }) => {
    const theme = useTheme();

    return (
        <StyledDarkThemeToggle theme={theme}>
            <Switch
                checked={checked}
                onChange={onChange}
                classes={{
                    root: "toggle-root",
                }}
            />
        </StyledDarkThemeToggle>
    );
};

export default DarkThemeToggle;
