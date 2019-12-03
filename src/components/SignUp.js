import React, { Component } from 'react';
import '../content/css/signup.css';

class SignUp extends Component {
    render() {
        return (
            <div className="SignUp">

                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="login-wrap">
                                    <div className="header">
                                        <h3>Sign Up</h3>
                                    </div>
                                    <div className="content-area">
                                        <form action="/User/Signup" autocomplete="off" method="post" novalidate="novalidate">
                                            <div className="login-form">
                                                <div className="form-group">
                                                    <input className="form-control1 input-text valid"   placeholder="Phone Number" />
                                                    <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                </div>
                                                <span className="field-validation-error" data-valmsg-for="phoneNumber" data-valmsg-replace="true">
                                                    <span for="phoneNumber" className="">Please enter your 8 digit phone number</span>
                                                </span>

                                                {/* <span className="field-validation-valid" data-valmsg-for="phoneNumber" data-valmsg-replace="true"></span> */}
                                                <div className="form-group">
                                                    <input className="form-control1" type="email" required="required" placeholder="Email" data-error="Please enter a valid email." /><i class="email"></i>

                                                </div>
                                                <span className="field-validation-valid" data-valmsg-for="email" data-valmsg-replace="true"></span>
                                                <div className="form-group">
                                                    <input className="form-control1" data-val="true" data-val-regex="Your password should contain at least 8 characters, including at least 1 capital letter and at least 1 number." data-val-regex-pattern="((?=.*\d)(?=.*[A-Z]).{8,})" data-val-required="Enter Your Password" id="password" name="password" placeholder="Password" type="password" /><i class="password"></i>
                                                </div>
                                                <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                                                <div className="form-group">
                                                    <input className="form-control1" data-val="true" data-val-equalto="Passwords don't match" data-val-equalto-other="*.password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" type="password" /><i class="password"></i>
                                                </div>
                                                <span className="field-validation-valid" data-valmsg-for="repeatPassword" data-valmsg-replace="true"></span>
                                                <div className="form-group clearfix">
                                                    <span className="pull-left">
                                                        <input className="checkbox" data-val="true" data-val-required="The termsAcceptance field is required." id="termsAcceptance" name="termsAcceptance" type="checkbox" value="true" /><input name="termsAcceptance" type="hidden" value="false" /> <a href="https://sadadbahrain.com/app/tos.html" >I agree to the terms of use</a>
                                                    </span>
                                                </div>
                                                <span className="field-validation-valid" data-valmsg-for="termsAcceptance" data-valmsg-replace="true"></span>



                                                <button className="green-btn btn-block btn-lg" type="submit">Sign Up</button>
                                                <a href="/activateAccount" className="pull-right">Activate Account</a>
                                            </div>
                                        </form>                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


    // <script>

    // </script>
   
export default SignUp;
