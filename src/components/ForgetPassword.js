import React, { Component } from 'react';

 import '../content/css/forgetPassword.css';

class ForgetPassword extends Component {
    render() {
        return (
           <div className="ForgetPassword">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="login-wrap">
                                    <div class="header">
                                        <h3>FORGOT YOUR PASSWORD</h3>
                                    </div>
                                    <div class="content-area">


                                        <form >                               
                                             <div class="login-form">
                                            <div class="form-group">
                                            <input className="form-control1 input-text" placeholder="30000004"/>
                                                <span class="input-disabled-text-without-modal">+973</span><i class="phone"></i>
                                            </div>
                                            <div class="form-group">
                                                {/* <span class="text-danger field-validation-error" data-valmsg-for="phoneNumber" data-valmsg-replace="true"><span for="phoneNumber" class="">Please enter your 8 digit phone number</span></span> */}
                                            </div>
                                            <div class="form-group">
                                                <fieldset>
                                                    <input autocomplete="off" class="form-control1" data-val="true" data-val-required="Enter Your Password" id="password" name="password" placeholder="Password" type="password" /><i class="password"></i>
                                                </fieldset>
                                            </div>
                                            <div class="form-group">
                                                <fieldset>
                                                    <input autocomplete="off" class="form-control1" data-val="true" data-val-required="Enter Your Password" id="password" name="password" placeholder="Repeat Password" type="password" /><i class="password"></i>
                                                </fieldset>
                                            </div>



                                            <button className="green-btn btn-block btn-lg" type="submit">SUBMIT</button>
                                           
                                        </div>
                                        </form>                 
                                    </div>
                                    <div class="footer">Don’t have an account? <a href="/signup">Sign Up For Free</a></div>
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
