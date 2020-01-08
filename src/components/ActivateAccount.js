import React, { Component } from 'react';
import '../content/css/activateAccount.css';
import { ActivateRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import { CardContent, FormControl } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import styles from '../content/css/styles';


const initialState = {
    phoneError: '',
    codeError: '',
    error: '',
    loading: ''
}
class ActivateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            msisdn: '',
            code: ''
        }
        this.activate = this.activate.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    validate(msisdn, activationCode) {

        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            this.setState({
                phoneError: "Phone is required"
            })

        }
        if (msisdn.length !== 8) {
            this.setState({
                phoneError: "Please enter your 8 digit phone number"
            })
            return false;
        }
        if (activationCode === "" || activationCode === null || activationCode === undefined) {
            this.setState({
                codeError: "Activation code is missing"
            })

        }
        if (activationCode.length !== 6) {
            this.setState({
                codeError: "Invalid pin"
            })
            return false;
        }

        return true;

    }
    activate() {
        let msisdn = this.state.msisdn;
        let activationCode = this.state.code;

        const isValid = this.validate(msisdn, activationCode);
        if (isValid) {
            this.setState(initialState);

            let ActivateRequestObject = {

                "msisdn": "973" + msisdn,
                "activation-code": activationCode,
            }
            this.setState({ loading: true })
            ActivateRequestInfo(ActivateRequestObject)
                .then((result) => {
                    this.setState({ loading: false })
                    if (result !== undefined) {
                        let resultData = _.get(result.data, 'error-code');
                        let resultDataMessage = _.get(result.data, 'error-message');
                        if (resultData === 0) {
                            this.props.history.push('/');
                        }
                        else {
                            if (resultData === null) {
                                this.setState({
                                    error: "Wrong Activation Code"
                                })
                            }
                            else {
                                switch (resultData) {

                                    case 104:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 106:
                                        this.setState({
                                            error: "Invalid Phone"
                                        })
                                        break;
                                    case 108:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;

                                    default:
                                        break;
                                }

                            }
                        }

                        console.log(result)
                    }


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
        else {
            this.setState({ code: event.target.value });
        }
    }
    NavigateToSignup = () => {
        this.props.history.push('/signup');

    }
    render() {
        return (
            <Container xl={12}>
            <Grid container spacing={10}>
                <Grid item xs={11} sm={11} md={8} lg={6} xl={6} style={styles.mainGrid}>                    
                    <Card elevation={16} style={styles.Card}>                           
                        <CardContent>
                            <Grid>
                                <Grid item style={styles.CardSegments}>
                                    <Typography gutterBottom variant="h3" component="h2" style={{color:'#0061ae', fontWeight:'300'}}>ACTIVATE</Typography>
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
                                    <TextField
                                        label="Phone Number"
                                        variant="outlined"
                                        type="text"
                                        InputProps={{startAdornment: <InputAdornment position="start">+973</InputAdornment>}}
                                        name='phone'
                                        value={this.state.msisdn}
                                        onChange={this.handleChange}
                                        style={styles.CardFields}
                                    />
                                    {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <TextField
                                        label="Activation Code"
                                        variant="outlined"
                                        type="text"
                                        name='code'
                                        value={this.state.code}
                                        onChange={this.handleChange} 
                                        style={styles.CardFields}
                                    />
                                {this.state.codeError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.codeError}</div> : null}
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <Fab variant="extended" color="primary" aria-label="add" style={styles.LoginBtn}  onClick={this.activate}>ACTIVATE</Fab>
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                <Typography style={styles.ActivateText}>
                                   To resend activation code, please login.

                                </Typography>
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <Typography style={styles.CardSegmentSeparator}></Typography>
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <Typography variant='h4'>Don’t have an account?<Link onClick={this.NavigateToSignup}><Typography style={styles.LinkText}>Sign Up For Free</Typography></Link></Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
           
        );
    }
}
export default ActivateAccount;
