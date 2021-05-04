import * as React from 'react';
import { Switch } from '@material-ui/core';
import StyledDarkThemeToggle from './DarkThemeToggle.style';

const DarkThemeToggle = ({ checked, onChange }) => (
  <StyledDarkThemeToggle>
    <Switch
      checked={checked}
      onChange={onChange}
      classes={{
        root: 'toggle-root',
      }}
    />
  </StyledDarkThemeToggle>
);

export default DarkThemeToggle;
