import React, { Component } from 'react';
import '../content/css/signup.css';
import { RegisterRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import Recaptcha from 'react-recaptcha';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, Container, Typography, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../content/css/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Spring, animated } from "react-spring/renderprops";

const initialState = {
    error: '',
    phoneError: '',
    passwordError: '',
    emailError: '',
    RepeatPasswordError: '',
    loading: ''
}
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.state = {
            msisdn: '',
            password: '',
            email: '',
            RepeatPassword: '',

        }
        this.signUp = this.signUp.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    captchaLoaded() {

        console.log("successfully loaded");

    }

    verifyCallback(response) {

        this.setState({
            Recaptchatoken: response
        })
        if (response) {
            this.setState({
                isVerified: true

            })
        }
    }
    validate(msisdn, email, password, RepeatPassword) {
        this.setState(initialState);


        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            this.setState({
                phoneError: "Phone is required"
            })
            return false;
        }
        if (msisdn.length !== 8) {
            this.setState({
                phoneError: "Please enter your 8 digit phone number"
            })
            return false;
        }

        if (email === "" || email === null || email === undefined) {
            this.setState({
                emailError: "Your email address is required"
            })
            return false;
        }
        if (!email.includes('@')) {
            this.setState({
                emailError: "Invalid email"
            })
            return false;
        }

        if (password === "" || password === null || password === undefined) {
            this.setState({
                passwordError: "password is required"
            })
            return false;
        }

        if (password !== RepeatPassword) {

            this.setState({
                RepeatPasswordError: "Passwords don't match"
            })
            return false;
        }
        if (!this.state.isVerified === true) {

            this.setState({
                error: "Captcha answer cannot be empty"
            })
            return false;


        }
        return true;
    }

    signUp() {
        let msisdn = this.state.msisdn;
        let password = this.state.password;
        let email = this.state.email;
        let RepeatPassword = this.state.RepeatPassword;
        let Recaptchatoken = this.state.Recaptchatoken;
        const isValid = this.validate(msisdn, email, password, RepeatPassword, Recaptchatoken);
        if (isValid) {
            this.setState(initialState);
            let RegisterRequestObject = {
                "msisdn": "973" + msisdn,
                "password": password,
                "g-response-recaptcha": Recaptchatoken
            }
            this.setState({ loading: true })
            RegisterRequestInfo(RegisterRequestObject)
                .then((result) => {
                    this.setState({ loading: false })

                    if (result !== undefined) {

                        let resultData = _.get(result.data, 'error-code');
                        let resultDataMessage = _.get(result.data, 'error-message');
                        if (resultData === 0) {
                            this.props.history.push('/activateAccount');
                        }
                        else {
                            if (resultData === null) {
                                this.setState({
                                    error: "Wrong Activation Code"
                                })
                            }
                            else {
                                switch (resultData) {
                                    case 500:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 1:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 103:
                                        this.setState({
                                            error: "Activate User"
                                        })
                                        break;
                                    case 109:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 106:
                                        this.setState({
                                            error: "Something went wrong"
                                        })
                                        break;
                                    default:
                                        break;
                                }

                            }
                        }

                    }
                    console.log(result)
                })
                .catch((err) => {
                    console.log("error login failed !!!")
                });

        }
    }
    handleChange(event) {

        if (event.target.name === 'phone') {
            this.setState({ msisdn: event.target.value });
        }
        else if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
        else if (event.target.name === 'email') {
            this.setState({ email: event.target.value });
        }
        else if (event.target.name === 'Repeat') {
            this.setState({ RepeatPassword: event.target.value });
        }
    }
    render() {
        return (
            <Spring
                native
                from={{ o: 0, xyz: [0, 500, 0] }}
                to={{ o: 1, xyz: [0, 0, 0] }}
            >
                {({ o, xyz }) => (
                    <animated.div style={{
                        transform: xyz.interpolate(
                            (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
                        )
                    }}>
                        <Container xl={12}>
                            <Grid container spacing={10}>

                                <Grid item xs={11} sm={11} md={8} lg={6} xl={6} style={styles.mainGrid}>
                                    <Card elevation={16} style={styles.Card}>
                                        {this.state.loading ? <LinearProgress /> : ""}
                                        <CardContent>
                                            <Grid>
                                                <Grid item style={styles.CardSegments}>
                                                    <Typography gutterBottom variant="h3" component="h2" style={{ color: '#0061ae', fontWeight: '300' }}>SIGN UP</Typography>
                                                </Grid>
                                                <Grid item style={styles.CardSegments}>
                                                    {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}

                                                    <TextField
                                                        label="Phone Number"
                                                        variant="outlined"
                                                        type="text"
                                                        InputProps={{ startAdornment: <InputAdornment position="start">+973</InputAdornment> }}
                                                        name='phone'
                                                        value={this.state.msisdn}
                                                        onChange={this.handleChange}
                                                        style={styles.CardFields}
                                                    />

                                                    {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}
                                                </Grid>

                                                <Grid item style={styles.CardSegments}>

                                                    <TextField
                                                        label="Email"
                                                        variant="outlined"
                                                        type="text"
                                                        name='email'
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        style={styles.CardFields}
                                                    />
                                                    {this.state.emailError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.emailError}</div> : null}
                                                </Grid>
                                                <Grid item style={styles.CardSegments}>
                                                    <TextField
                                                        label="Password"
                                                        variant="outlined"
                                                        type="password"
                                                        name='password'
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                        style={styles.CardFields}
                                                    />
                                                    {this.state.passwordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.passwordError}</div> : null}
                                                </Grid>
                                                <Grid item style={styles.CardSegments}>

                                                    <TextField
                                                        variant="outlined"
                                                        label="Repeat Password"
                                                        name='Repeat'
                                                        type="password"
                                                        value={this.state.RepeatPassword}
                                                        onChange={this.handleChange}
                                                        style={styles.CardFields}


                                                    />
                                                    {this.state.RepeatPasswordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.RepeatPasswordError}</div> : null}
                                                </Grid>


                                                <Grid item style={styles.AgreeTerms}>
                                                    <FormControlLabel style={{ fontSize: '15px' }}
                                                        control={
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="I agree to the terms of use"
                                                    />
                                                </Grid>

                                                <Grid item style={styles.AgreeTerms}>

                                                    <Recaptcha
                                                        sitekey="6LeSJ8gUAAAAAOxhKgqZWPbksYIlYCXzi2Nbqn1Q"
                                                        render="explicit"
                                                        onloadCallback={this.captchaLoaded}
                                                        verifyCallback={this.verifyCallback}
                                                    />
                                                </Grid>

                                                <Grid item style={styles.CardSegments}>
                                                    <Fab variant="extended" color="primary" aria-label="add" style={styles.LoginBtn} onClick={this.signUp}>SIGN UP</Fab>
                                                </Grid>
                                            </Grid>


                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>

                    </animated.div>
                )}
            </Spring>
        );
    }
}

export default SignUp;