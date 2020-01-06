import React, { Component , Fragment} from 'react';
import {AccountRequestInfo,SubmitRequestInfo} from '../api/ApiCalls';
import { validateLogin } from '../components/common/common';
import _ from 'lodash';
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
    message: '',
    emailError: '',
    CPRError: '',
    loading: '',
    error: ''
}
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state = {
            email: '',
            CPR: '',
        }
        let isValid = validateLogin();
        if (!isValid) {

            this.props.history.push("/login");
        }

        this.saveAccount = this.saveAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        let sessionId = localStorage.getItem('sessionId');
        let AccountRequestObject = {
            "session-id": sessionId
        }

        AccountRequestInfo(AccountRequestObject)
            .then((result) => {


                if (result !== undefined) {

                    this.setState({ email: _.get(result.data, 'emails') })
                    this.setState({ CPR: _.get(result.data, 'cpr') })
                }

                console.log(result)
            })
            .catch((err) => {

                console.log("error login failed !!!");
            })

    }

    validate(email, CPR) {
        this.setState(initialState);

        if (email === "" || email === null || email === undefined) {
            this.setState({
                emailError: "Email required"
            })
            return false;
        }
        //   if (!email.includes('@')) {
        //     this.setState({
        //         emailError: "Invalid email"
        //     })
        //     return false;
        // }

        if (CPR === "" || CPR === null || CPR === undefined) {
            this.setState({
                CPRError: "CPR required"
            })
            return false;
        }

        if (CPR.length !== 9) {
            this.setState({
                CPRError: "Please enter your 9 digit CPR number"
            })
            return false;
        }
        return true;
    }


    saveAccount() {
        let email = this.state.email;
        let cpr = this.state.CPR;
        const isValid = this.validate(email, cpr)
        if (isValid) {
            this.setState(initialState);
            let sessionId = localStorage.getItem('sessionId');
            let SubmitRequestObject = {
                "session-id": sessionId,
                "emails": email,
                "cpr": cpr
            }
            this.setState({ loading: true })
            SubmitRequestInfo(SubmitRequestObject)
                .then((result) => {

                    this.setState({ loading: false })
                    if (result !== undefined) {
                        let resultData = _.get(result.data, 'error-code');
                        if (resultData === 0) {
                            this.setState({
                                message: "Your provided information is saved successfully."

                            })
                        }

                    }

                    console.log(result)
                })

        }
    }
    handleChange(event) {
       

        if (event.target.name === 'email') {
            this.setState({ email: event.target.value });
        }
        else {
            this.setState({ CPR: event.target.value });
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
                                    <Typography gutterBottom variant="h3" component="h2" style={{color:'#0061ae', fontWeight:'300'}}>ACCOUNT</Typography>
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
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
                                        label="CPR"
                                        variant="outlined"
                                       
                                        name='cpr'
                                        value={this.state.CPR}
                                        onChange={this.handleChange} 
                                        style={styles.CardFields}
                                    />
                                {this.state.CPRError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.CPRError}</div> : null}
                                </Grid>

                                <Grid item style={styles.CardSegments}>
                                    <Fab variant="extended" color="primary" aria-label="add" style={styles.LoginBtn}  onClick={this.saveAccount}>SAVE</Fab>
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

export default Account;