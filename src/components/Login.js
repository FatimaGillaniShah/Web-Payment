import React, { Component } from 'react';
import '../content/css/login.css';
import { LoginRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

    }

    login() {
        
        let msisdn = this.refs.phone.value;
        let password = this.refs.password.value;

        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            alert("Phone number missing");
            return;
        }
        if (password === "" || password === null || password === undefined) {
            alert("Password missing");
            return;
        }
      

        let LoginRequestObject = {
            "msisdn": "973" + msisdn,
            "password": password,
            "locale": "en-US"
        }

        LoginRequestInfo(LoginRequestObject)
            .then((result) => {
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
                            alert("Wrong Activation Code");
                            message = "Wrong Activation Code";
                        }
                        else {
                            switch (resultData) {
                                case 100:
                                    message = "This Number is locked";
                                    break;
                                case 101:
                                    message = "Incorrect password";
                                    break;
                                case 103:
                                    message = "Activate User";
                                    break;
                                case 109:
                                    message = resultDataMessage;
                                    break;
                                case 106:
                                    message = "Something went wrong";
                                    break;
                                default:
                                    break;
                            }
                            alert(message);
                        }
                    }


                }
                console.log(result)
            })
            .catch((err) => {
                console.log("error login failed !!!");
            });
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
                                                    <input
                                                        className="form-control1 input-text"
                                                        name='myphone'
                                                        placeholder="30000004"
                                                        id="phone"
                                                        ref="phone"
                                                        required
                                                    />
                                                    <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                </div>
                                                <div className="form-group">

                                                </div>
                                                <div className="form-group">

                                                    <input
                                                        autoComplete="off"
                                                        className="form-control1"
                                                        ref="password"
                                                        placeholder="Password"
                                                        type="password"
                                                        required 
                                                        />
                                                    <i className="password"></i>

                                                </div>

                                                <button className="green-btn btn-block btn-lg" type="button" onClick={this.login}>LOGIN</button>
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
const mapDispatchToProps = (dispatch) => {
    return {

        getHeaderInfo: (itemCartCount,isLoggedIn,msisdn,password) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};
const actionCreators = {
    // getUsers: userActions.getAll,
    // deleteUser: userActions.delete
}
export default connect(null, mapDispatchToProps,actionCreators)(Login);

