import React, { Component } from 'react';
import '../content/css/signup.css';
import {RegisterRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';
import Recaptcha from 'react-recaptcha';

class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isVerified : false,
            Recaptchatoken:''
        }
       
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
        
    signUp(){
  
        let msisdn = this.refs.phone.value;
        let password = this.refs.password.value;
        let RepeatPassword =  this.refs.RepeatPassword.value;
        let Recaptchatoken = this.state.Recaptchatoken;
    
        if(msisdn === "" || msisdn === null || msisdn === undefined)
          {
             alert("Phone number missing");
       
          }
          else if(password === "" || password === null || password === undefined)
          {
              alert("Password missing");
            
          }
         else if(password !== RepeatPassword){

              alert("Password don't match");       
          }
        else if (this.state.isVerified === false){
            alert("Captcha answer cannot be empty")

          }
        else{
          
        let RegisterRequestObject = {
            "msisdn": "973"+msisdn,
            "password": password,
            "g-response-recaptcha": Recaptchatoken
        }
        RegisterRequestInfo(RegisterRequestObject)
        .then((result) => {
            if (result  != undefined) {
                let message = "";
                let resultData = _.get(result.data, 'error-code');
                let resultDataMessage = _.get(result.data, 'error-message');
                if(resultData === 0){
                    this.props.history.push('/login');
                }
                else{                       
                     alert(resultDataMessage);                    
                }

            }
        })
        .catch((err) => {
            console.log("error login failed !!!")
            });       
         
    }}
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
                                             <div className="login-form">
                                            <div className="form-group">
                                            <input className="form-control1 input-text" name ='myphone'  placeholder="30000004" id="phone" ref="phone"/>
                                                <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                            </div>
                                            
                                            <span  style={{display:'none'}}  className="">Phone number is required</span>
                                            
                                            <div className="form-group">
                                            
                                            </div>
                                            <div className="form-group">
                                                    <input className="form-control1" type="email" ref="email"  required="required" placeholder="Email"  /><i className="email"></i>

                                                </div>
                                                
                                            <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off"  className="form-control1" id="password" ref="password" name="password" placeholder="Password" type="password" /><i className="password"></i>
                                                </fieldset>
                                            </div>
                                            <span  style={{display:'none' }} className="">Password is required</span>

                                            <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off"  className="form-control1" ref="RepeatPassword" name = 'mypassword' id="password"  placeholder="Repeat Password" type="password" /><i className="password"></i>
                                                </fieldset>
                                                <span style={{display:'none'}} className="">Password don't match</span>

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