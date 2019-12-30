import React, { Component } from 'react';
import '../content/css/forgetPassword.css';
import {ForgetRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';
class ForgetPassword extends Component {
    constructor(props)
    {
        super(props);
        this.forgetPassword = this.forgetPassword.bind(this);
    }
    forgetPassword(){
    
        let msisdn = this.refs.phone.value;
        let password = this.refs.password.value;
        let repeatPassword = this.refs.repeatPassword.value;
        
        if(msisdn === "" || msisdn === null || msisdn === undefined)
          {
             alert("Phone number missing");
             
          }
          else if(password === "" || password === null || password === undefined)
          {
              alert("Password missing");
          
          }
         else if(password !== repeatPassword){
              alert("Password don't match");
              
          }
          else{
        let forgetRequestObject = {
            "msisdn": "973"+msisdn,
            "password": password,
           

        }
        ForgetRequestInfo(forgetRequestObject)
        .then((result) => {
            if (result  !== undefined) {
              
                let resultData = _.get(result.data, 'error-code');
                let resultDataMessage = _.get(result.data, 'error-message');
                if(resultData === 0){
                   
                    this.props.history.push('/login');
                }
                else{     
                  
                     alert(resultDataMessage);
                    
                }
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
            <div className="SLogin">
            <div className="header-content1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="login-wrap">
                                <div className="header">
                                    <h3>FORGOT YOUR PASSWORD</h3>
                                </div>
                                <div className="content-area">
                                    <form >                               
                                         <div className="login-form">
                                        <div className="form-group">
                                        <input className="form-control1 input-text" name ='myphone' placeholder="30000004" id="phone" ref="phone"/>
                                            <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                        </div>
                                        <div className="form-group">
                                        
                                        </div>
                                        <div className="form-group">
                                            <fieldset>
                                                <input autoComplete="off"  className="form-control1" id="password" ref="password" name="password" placeholder="Password" type="password" /><i className="password"></i>
                                            </fieldset>
                                        </div>

                                        <div className="form-group">
                                            <fieldset>
                                                <input autoComplete="off"  className="form-control1" id="password" ref="repeatPassword" name="password" placeholder="Repeat Password" type="password" /><i className="password"></i>
                                            </fieldset>
                                        </div>

                                        <button className="green-btn btn-block btn-lg" type="button"  onClick={this.forgetPassword}>SUBMIT</button>
                                        <div className="form-group clearfix">


                                </div>
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

export default ForgetPassword;
