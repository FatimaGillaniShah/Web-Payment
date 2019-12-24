import React, { Component } from 'react';

class Account extends Component {

    render() {
        return (

            <div class="header-content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="login-wrap">
                                <div class="header" style={{ textAlign: "center" }}>
                                    <h3>Account</h3>
                                </div>
                                <div class="content-area">
                                    <div id="numberCheckError" class="alert alert-danger" style={{ display: "none" }}></div>

                                    <form action="/User/Account" method="post" novalidate="novalidate">                               
                                     <div class="login-form">
                                        <div class="form-group">

                                            <fieldset>
                                                <input autocomplete="off" class="form-control" data-val="true" data-val-email="Please enter a correct email address." id="Email" name="Email" placeholder="Email" type="text"  />
                                            </fieldset>
                                        </div>
                                        <span class="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true"></span>
                                        <div class="form-group">
                                            <fieldset>
                                                <input autocomplete="off" class="form-control" data-val="true" data-val-length="Please enter your 9 digit CPR number" data-val-length-max="9" data-val-length-min="9" data-val-regex="CPR must be numbers only" data-val-regex-pattern="([1-9][0-9]*)" id="Cpr" name="Cpr" placeholder="CPR" type="text" />
                                            </fieldset>
                                        </div>
                                        <span class="field-validation-valid" data-valmsg-for="Cpr" data-valmsg-replace="true"></span>
                                        <button class="btn btn-success btn-block btn-lg" type="submit">Save</button>
                                    </div>
                                    </form>                       
                                     </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Account;