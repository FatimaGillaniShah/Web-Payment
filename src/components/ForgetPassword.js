import React, { Component } from 'react';
import '../content/css/forgetPassword.css';
import {ForgetRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import styles from '../content/css/styles';

const initialState = {
    error: '',
    phoneError: '', 
    newPasswordError:'',
    RepeatPasswordError:'',
    loading: ''

}
class ForgetPassword extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            msisdn: '',
            newPassword: '',
            RepeatPassword:''
        }
        this.forgetPassword = this.forgetPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      
        if (event.target.name === 'phone') {
            this.setState({ msisdn: event.target.value });
        }
        else if (event.target.name === 'NewPassword') {
            this.setState({ newPassword: event.target.value });
        }
        else if (event.target.name === 'RepeatPassword') {
            this.setState({ RepeatPassword: event.target.value });
        }
       
    }
    validate(msisdn, newpassword, RepeatPassword) {
        this.setState(initialState);


        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            this.setState({
                phoneError: "Phone is required"
            })
            return false;
        }
        else if (msisdn.length !== 8) {
            this.setState({
                phoneError: "Please enter your 8 digit phone number"
            })
            return false;
        }

      
        else if (newpassword === "" || newpassword === null || newpassword === undefined) {
            this.setState({
                newPasswordError: "password is required"
            })
            return false;
        }

        else if (newpassword !== RepeatPassword) {

            this.setState({
                RepeatPasswordError: "Passwords don't match"
            })
            return false;
        }
       
        return true;
    }

    forgetPassword(){
      
        let msisdn = this.state.msisdn;
        let newpassword = this.state.newPassword;
        let RepeatPassword = this.state.RepeatPassword;
       
        const isValid = this.validate(msisdn, newpassword, RepeatPassword);
        if (isValid) {
            this.setState(initialState);
            let forgetRequestObject = {
                "msisdn": "973"+msisdn,
                "password": newpassword,
           
        }
        ForgetRequestInfo(forgetRequestObject)
        .then((result) => {
            if (result  !== undefined) {
              
                // let resultData = _.get(result.data, 'error-code');
                // let resultDataMessage = _.get(result.data, 'error-message');
                // if(resultData === 0){
                   
                //     this.props.history.push('/login');
                // }
                // else{     
                  
                //      alert(resultDataMessage);
                    
                // }
                console.log(result)

            }
        })
        .catch((err) => {
            console.log("error login failed !!!")
            });
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
                                    <Typography gutterBottom variant="h3" component="h2" style={{color:'#0061ae', fontWeight:'300'}}>FORGOT YOUR PASSWORD</Typography>
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
                                        label="New Password"
                                        variant="outlined"
                                        type="password"
                                        name='NewPassword'
                                        value={this.state.newPassword}
                                        onChange={this.handleChange} 
                                        style={styles.CardFields}
                                    />
                                {this.state.newPasswordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.newPasswordError}</div> : null}
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <TextField
                                        label="Repeat Password"
                                        variant="outlined"
                                        type="password"
                                        name='RepeatPassword'
                                        value={this.state.RepeatPassword}
                                        onChange={this.handleChange} 
                                        style={styles.CardFields}
                                    />
                                {this.state.RepeatPasswordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.RepeatPasswordError}</div> : null}
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <Fab variant="extended" color="primary" aria-label="add" style={styles.LoginBtn} onClick={this.forgetPassword}>SUBMIT</Fab>
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

export default ForgetPassword;
