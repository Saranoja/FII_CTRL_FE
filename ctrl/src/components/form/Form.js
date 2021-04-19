import React, { Component } from 'react';
import { FormControl, Button, InputLabel, FilledInput, TextField } from '@material-ui/core';
import Validator from 'validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import StyledForm from './Form.style';

class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: ''
            },
            loading: false,
            errors: {
                email: '',
                password: ''
            },
            showPassword: false,
        }
    }

    checkForErrorsAndSubmit = (errors) => {
        if (!errors.email && !errors.password)
            this.props.submit(this.state.data);
    }

    handleChange = (prop) => (event) => {
        this.setState({ ...this.state.data, [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState((previousState) => ({ showPassword: !previousState.showPassword }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email))
            errors.email = "Email is not valid"
        else
            errors.email = ""
        if (!data.password)
            errors.password = "Can't be blank";
        else
            errors.password = ""
        return errors;
    }

    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        this.checkForErrorsAndSubmit(errors);
    }

    render() {
        const { errors } = this.state;

        return (
            <StyledForm onSubmit={this.onSubmit}>
                <FormControl
                    variant="filled"
                    color="primary"
                    className="form-input"
                >
                    <TextField
                        id="filled-secondary"
                        label="Email"
                        variant="filled"
                        color="primary"
                        onChange={this.onChange}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                        name='email'
                        autoComplete='off'
                    />
                </FormControl>
                <FormControl
                    variant="filled"
                    color="primary"
                    className="form-input"
                >
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        label="Password"
                        variant="filled"
                        color="primary"
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.onChange}
                        error={errors.password ? true : false}
                        name='password'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        autoComplete='off'
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className="form-submit-button"
                    type="submit"
                >
                    Login
                </Button>
            </StyledForm>
        );
    }
}

export default CustomForm;