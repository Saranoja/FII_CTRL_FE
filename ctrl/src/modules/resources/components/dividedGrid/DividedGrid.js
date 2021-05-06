import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledDividedGrid from './DividedGrid.style';

const DividedGrid = ({ firstChoice, secondChoice, isLoading }) => (
  <StyledDividedGrid>
    <Paper className="divided-grid-segment" elevation={3}>
      <Grid
        container
        classes={{
          container: 'divided-grid-container',
        }}
      >
        <Grid
          item
          classes={{
            item: 'divided-grid-item',
          }}
        >
          {firstChoice}
        </Grid>
        <Grid
          item
          classes={{
            item: 'divided-grid-item',
          }}
        >
          {secondChoice}
        </Grid>
      </Grid>
    </Paper>
    {isLoading ? <CircularProgress className="grid-divider-loader" /> : null}
  </StyledDividedGrid>
);

export default DividedGrid;
