import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledDividedGrid from './DividedGrid.style';

const DividedGrid = ({ firstChoice, secondChoice, isLoading }) => {
    const theme = useTheme();
    return (
        <StyledDividedGrid theme={theme}>
            <Paper className="divided-grid-segment">
                <Grid container justify="center">
                    <Grid item>
                        {firstChoice}
                    </Grid>
                    <Divider variant="middle" />
                    <Grid item>
                        {secondChoice}
                    </Grid>
                </Grid>
                {isLoading ? <CircularProgress className="grid-divider-loader" /> : null}
            </Paper>
        </StyledDividedGrid>
    )
};

export default DividedGrid;