import React, { Component } from 'react';
import '../content/css/signup.css';
import {RegisterRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';
import Recaptcha from 'react-recaptcha';

const initialState = {
    phone: '',
    email:'',
    password: '',
    RepeatPassword:'',
    error: '',
    loading:''
}
class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = initialState
        this.signUp = this.signUp.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }
    captchaLoaded(){
      
        console.log("successfully loaded");

    }
  
    verifyCallback(response){
      
        this.setState({
            Recaptchatoken : response
        })
        if(response){
            this.setState({
                isVerified : true

            })
        }
    }
    validate(msisdn, email ,password, RepeatPassword, Recaptchatoken) {
     
        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            this.setState({
                phone: "Phone is required"
            })
            return false;
        }
        if (msisdn.length < 8) {
            this.setState({
                phone: "Please enter your 8 digit phone number"
            })
            return false;
        }
        
        if (email === "" || email === null || email === undefined) {
            this.setState({
                email: "Your email address is required"
            })
            return false;
        }
        if (!email.includes('@')) {
            this.setState({
                email: "Invalid email"
            })
            return false;
        }

        if (password === "" || password === null || password === undefined) {
            this.setState({
                password: "password is required"
            })
            return false;
        }
       
        if (password !== RepeatPassword) {
         
            this.setState({
                RepeatPassword: "Passwords don't match"
            })
            return false;
        }
        if (!this.state.isVerified === true){

            this.setState({
                error: "Captcha answer cannot be empty"
            })
            return false;
           

          }
        return true;
    }
        
    signUp(){
  
        let msisdn = this.refs.phone.value;
        let password = this.refs.password.value;
        let email = this.refs.email.value;
        let RepeatPassword =  this.refs.RepeatPassword.value;
        let Recaptchatoken = this.state.Recaptchatoken;
        const isValid = this.validate(msisdn,email, password,RepeatPassword,Recaptchatoken);
        if (isValid) {
            this.setState(initialState);
        let RegisterRequestObject = {
            "msisdn": "973"+msisdn,
            "password": password,
            "g-response-recaptcha": Recaptchatoken
        }
        this.setState({loading:true})
        RegisterRequestInfo(RegisterRequestObject)
        .then((result) => {
            this.setState({loading : false})
            
            if (result  != undefined) {
                let message = "";
                let resultData = _.get(result.data, 'error-code');
                let resultDataMessage = _.get(result.data, 'error-message');
                if(resultData === 0){
                    this.props.history.push('/login');
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
    render() {
        return (
            <div className="SLogin">
                <div className="header-content1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="login-wrap">
                                    <div className="header">
                                        <h3>SIGN UP</h3>
                                    </div>
                                    <div className="content-area">
                                        <form >  
                                        {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}                             
                                             <div className="login-form">
                                            <div className="form-group">
                                            <input className="form-control1 input-text" name ='myphone'  placeholder="30000004" value='10101010' id="phone" ref="phone"/>
                                                <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                <i id="numberLoading" className={this.state.loading ? "loading":""}></i>
                                            </div>
                                            {this.state.phone ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phone}</div> : null}
                                            
                                            <div className="form-group">
                                            
                                            </div>
                                            <div className="form-group">
                                                    <input className="form-control1" type="email" ref="email" value='ytu@gmail.com' required="required" placeholder="Email"  /><i className="email"></i>

                                                </div>
                                                {this.state.email ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.email}</div> : null}
                                                
                                            <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off"  className="form-control1"  id="password" ref="password" name="password" placeholder="Password" type="password" /><i className="password"></i>
                                                </fieldset>
                                            </div>
                                            {this.state.password ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.password}</div> : null}
                                          
                                            <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off"  className="form-control1" ref="RepeatPassword" name = 'mypassword' id="password"  placeholder="Repeat Password" type="password" /><i className="password"></i>
                                                </fieldset>
                                                {this.state.RepeatPassword ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.RepeatPassword}</div> : null}

                                            </div>
                                            <div className="form-group clearfix">
                                                    <span className="pull-left">
                                                        <input className="checkbox" id="termsAcceptance"  type="checkbox" value="true" />
                                                        <input  type="hidden" value="false" /> <a href="https://sadadbahrain.com/app/tos.html" >I agree to the terms of use</a>
                                                    </span>
                                             </div>
                                             
                                        <Recaptcha
                                                sitekey="6LeSJ8gUAAAAAOxhKgqZWPbksYIlYCXzi2Nbqn1Q"
                                                render="explicit"
                                                onloadCallback={this.captchaLoaded}
                                                verifyCallback={this.verifyCallback}
                                        />   

                                            <button className="green-btn btn-block btn-lg" type="button"  onClick={this.signUp}>SIGN UP</button>
                                            
                                        </div>
                                        </form>  
     
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               

            </div>
        );
    }
}

export default SignUp;