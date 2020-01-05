import React, { Component, Fragment } from 'react';
import '../content/css/login.css';
import { LoginRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';
import { validateLogin } from '../components/common/common';
import { CardContent, FormControl } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';

const styles = {
    mainGrid: {
        margin:'auto',
        marginTop:'30px',
      },
      Card:{
          width:'85%',
          margin:'auto'
      },
      CardSegments: {
        padding:'10px'
      },
      CardSegmentSeparator: {
        borderBottom:'1px solid #ddd'
      },
      CardFields:{
          width:'90%'
      },
      LoginBtn: {
          margin: 'auto',
          backgroundColor: '#5E8C2A',
          width:'90%',
          fontSize:'medium'        
      },
      LinkText:{
        color:'#1961d7',
        fontSize: 'medium'
      }
}

const initialState = {
    error: '',
    phoneError: '',
    passwordError: '',
    loading: ''

}
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.state = {
            msisdn: '',
            password: '',
        }
        let isValid = validateLogin();
        if (isValid) {
            this.props.history.push("/");
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    validate(msisdn, password) {
      
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

        if (password === "" || password === null || password === undefined) {
            this.setState({
                passwordError: "password is required"
            })
            return false;
        }
        return true;
    }

    login() {
        
        let msisdn = this.state.msisdn;
        let password = this.state.password;   
        const isValid = this.validate(msisdn, password);

        if (isValid) {
            this.setState(initialState);
            let LoginRequestObject = {
                "msisdn": "973" + msisdn,
                "password": password,
                "locale": "en-US"
            }
            this.setState({ loading: true })

            LoginRequestInfo(LoginRequestObject)
                .then((result) => {
                    this.setState({ loading: false })
                    if (result !== undefined) {

                        let resultData = _.get(result.data, 'error-code');
                        let resultDataMessage = _.get(result.data, 'error-message');
                        console.log(resultDataMessage)
                        if (resultData === 0) {

                            let sessionId = _.get(result.data, 'session-id');
                            localStorage.setItem('sessionId', sessionId);
                            localStorage.setItem('sessionTime', Date());
                            let cartItemCount = localStorage.getItem('cartItemCount');
                            if (cartItemCount === null) {
                                this.props.getHeaderInfo(0, true);
                            }
                            else {
                                this.props.getHeaderInfo(cartItemCount, true);
                            }
                            let redirectLogin = localStorage.getItem('redirectTo');
                            if (redirectLogin !== null && redirectLogin !== undefined && redirectLogin !== "") {
                                this.props.history.push('/' + redirectLogin);
                            }
                            else {
                                this.props.history.push('/');
                            }
                        }
                        else {
                            if (resultData === null) {
                                this.setState({
                                    error: "Wrong Activation Code"
                                })
                            }
                            else {
                                switch (resultData) {
                                    case 100:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 101:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 103:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 109:
                                        this.setState({
                                            error: resultDataMessage
                                        })
                                        break;
                                    case 106:
                                        this.setState({
                                            error: "Invalid phone"
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

                    console.log("error login failed !!!");
                });
        }
    }
    handleChange(event) {
        if (event.target.name === 'phone') {
            this.setState({ msisdn: event.target.value });
        }
        else {
            this.setState({ password: event.target.value });
        }
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
                                        <Typography gutterBottom variant="h3" component="h2" style={{color:'#0061ae', fontWeight:'300'}}>LOGIN</Typography>
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
                                        <Fab variant="extended" color="primary" aria-label="add" style={styles.LoginBtn}  onClick={this.login}>Login</Fab>
                                    </Grid>

                                    <Grid item style={styles.CardSegments}>

                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                <Link href="/forgetPassword/"><Typography style={styles.LinkText}>Forget Password</Typography></Link>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                <Link href="/activateAccount/"><Typography style={styles.LinkText}>Activate Account</Typography></Link>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item style={styles.CardSegments}>
                                        <Typography style={styles.CardSegmentSeparator}></Typography>
                                    </Grid>

                                    <Grid item style={styles.CardSegments}>
                                        <Typography variant='h4'>Don’t have an account?<Link href="/signup/"><Typography style={styles.LinkText}>Sign Up For Free</Typography></Link></Typography>
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
const mapDispatchToProps = (dispatch) => {
    return {

        getHeaderInfo: (itemCartCount, isLoggedIn) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);

