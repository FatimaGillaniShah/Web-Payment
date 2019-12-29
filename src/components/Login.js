import React, { Component } from 'react';
import '../content/css/login.css';
import { LoginRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';

const initialState = {
    error: '',
    phoneError: '',
    passwordError: '',
    msisdn:'',
    password: '',    
    loading:''

}
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    validate(msisdn, password) {

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
            this.setState({loading:true})

            LoginRequestInfo(LoginRequestObject)
                .then((result) => {
                    this.setState({loading : false})
                    if (result !== undefined) {
                        let message = "";
                        let resultData = _.get(result.data, 'error-code');
                        let resultDataMessage = _.get(result.data, 'error-message');
                        if (resultData === 0) {
                            message = "Success";
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
                                            error: resultDataMessage
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
        if(event.target.name == 'phone')
        {
            this.setState({msisdn: event.target.value});
        }
        else
        {
            this.setState({password: event.target.value});
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
                                            {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
                                            <div className="login-form">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control1 input-text"
                                                        name='phone'
                                                        placeholder="30000004"
                                                        id="phone"
                                                        value = {this.state.msisdn}
                                                        onChange={this.handleChange}

                                                    />
                                                    <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                    <i id="numberLoading" className={this.state.loading ? "loading":""}></i>
                                                </div>
                                                {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}

                                                <div className="form-group">

                                                    <input
                                                        autoComplete="off"
                                                        className="form-control1"
                                                        placeholder="Password"
                                                        type="password"
                                                        value = {this.state.password}
                                                        onChange={this.handleChange}

                                                    />
                                                    <i className="password"></i>

                                                </div>
                                                {this.state.passwordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.passwordError}</div> : null}

                                                <button className="green-btn btn-block btn-lg" type="button" onClick={this.login}>LOGIN</button>
                                                <div className="form-group clearfix">

                                                    <div className="pull col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <a href="/forgetPassword"  style={{ fontSize: '15px' }}>Forgot your password</a>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <a href="/activateAccount"  style={{ fontSize: '15px' }}>Activate Account</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="footer" >Don’t have an account? <a href="/signup">Sign Up For Free</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getHeaderInfo: (itemCartCount, isLoggedIn, msisdn, password) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);

