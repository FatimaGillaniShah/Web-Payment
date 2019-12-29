import React, { Component } from 'react';
import '../content/css/signup.css';
import { RegisterRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import Recaptcha from 'react-recaptcha';

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

                    if (result != undefined) {
                        let message = "";
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
        if (event.target.name == 'phone') {
            this.setState({ msisdn: event.target.value });
        }
        else if (event.target.name == 'password') {
            this.setState({ password: event.target.value });
        }
        else if (event.target.name == 'email') {
            this.setState({ email: event.target.value });
        }
        else if (event.target.name == 'Repeat') {
            this.setState({ RepeatPassword: event.target.value });
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
                                                    <input className="form-control1 input-text"
                                                        name='phone'
                                                        placeholder="30000004"
                                                        id="phone"
                                                        value={this.state.msisdn}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                    <i id="numberLoading" className={this.state.loading ? "loading" : ""}></i>
                                                </div>
                                                {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}

                                                <div className="form-group">

                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control1"
                                                        name="email"
                                                        type="email"
                                                        required="required"
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                    /><i className="email"></i>

                                                </div>
                                                {this.state.emailError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.emailError}</div> : null}

                                                <div className="form-group">
                                                    <fieldset>
                                                        <input className="form-control1"

                                                            name="password"
                                                            placeholder="Password"
                                                            type="password"
                                                            value={this.state.password}
                                                            onChange={this.handleChange}
                                                        /><i className="password"></i>
                                                    </fieldset>
                                                </div>
                                                {this.state.passwordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.passwordError}</div> : null}

                                                <div className="form-group">
                                                    <fieldset>
                                                        <input className="form-control1"
                                                            name='Repeat'
                                                            placeholder="Repeat Password"
                                                            type="password"
                                                            value={this.state.RepeatPassword}
                                                            onChange={this.handleChange}
                                                        /><i className="password"></i>
                                                    </fieldset>
                                                    {this.state.RepeatPasswordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.RepeatPasswordError}</div> : null}

                                                </div>
                                                <div className="form-group clearfix">
                                                    <span className="pull-left">
                                                        <input className="checkbox" id="termsAcceptance" type="checkbox" value="true" />
                                                        <input type="hidden" value="false" /> <a href="https://sadadbahrain.com/app/tos.html" >I agree to the terms of use</a>
                                                    </span>
                                                </div>

                                                <Recaptcha
                                                    sitekey="6LeSJ8gUAAAAAOxhKgqZWPbksYIlYCXzi2Nbqn1Q"
                                                    render="explicit"
                                                    onloadCallback={this.captchaLoaded}
                                                    verifyCallback={this.verifyCallback}
                                                />

                                                <button className="green-btn btn-block btn-lg" type="button" onClick={this.signUp}>SIGN UP</button>

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