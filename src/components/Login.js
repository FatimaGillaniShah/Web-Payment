import React, { Component } from 'react';
import '../content/css/login.css';
import {login, logoutHTML} from '../components/common/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Login extends Component {

    constructor(props)
    {
        super(props);    
    }

    componentDidMount()
    {
        logoutHTML();
        let sessionId = localStorage.getItem('sessionId');
        if(sessionId === "" || sessionId === null || sessionId === undefined) {            
            document.getElementsByClassName("btnTopNavLogin")[0].style.display = "block";
            document.getElementsByClassName("btnTopNavLogout")[0].style.display = "none";
        }
        else {            
            document.getElementsByClassName("btnTopNavLogout")[0].style.display = "block";
            document.getElementsByClassName("btnTopNavLogin")[0].style.display = "none"; 
            
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
                                        <h3>Login</h3>
                                    </div>
                                    <div className="content-area">
                                        <form >                               
                                             <div className="login-form">
                                            <div className="form-group">
                                            <input className="form-control1 input-text" placeholder="30000004" id="phone" ref="phone"/>
                                                <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                            </div>
                                            <div className="form-group">
                                                {/* <span className="text-danger field-validation-error" data-valmsg-for="phoneNumber" data-valmsg-replace="true"><span for="phoneNumber" className="">Please enter your 8 digit phone number</span></span> */}
                                            </div>
                                            <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off" className="form-control1" data-val="true" data-val-required="Enter Your Password" id="password" ref="password" name="password" placeholder="Password" type="password" /><i className="password"></i>
                                                </fieldset>
                                            </div>

                                            <button className="green-btn btn-block btn-lg" type="button" onClick={login}>LOGIN</button>
                                            <div className="form-group clearfix">

                                        <div className="pull col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <a href="/forgetPassword">Forgot your password</a>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <a href="/activateAccount">Activate Account</a>
                                        </div>

                                    </div>
                                        </div>
                                        </form>                 
                                    </div>
                                    <div className="footer">Don’t have an account? <a href="/signup">Sign Up For Free</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

  export default Login;
  