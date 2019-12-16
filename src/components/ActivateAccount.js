import React, { Component } from 'react';
import '../content/css/activateAccount.css';
import {ActivateRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';

class ActivateAccount extends Component {
    constructor(props)
    {
        super(props);
        this.activate = this.activate.bind(this);
    }
    activate(){
  
        let msisdn = this.refs.phone.value;
        let activationCode = this.refs.code.value;
        if(msisdn === "" || msisdn === null || msisdn === undefined)
        {
           alert("Phone number missing");
          
        }
        else if(activationCode === "" || activationCode ===null || activationCode === undefined){
            alert("Activation code is missing");

        }
        else{
        let ActivateRequestObject = {

            "msisdn": "973"+msisdn,
            "activationCode": activationCode,

        }
        ActivateRequestInfo(ActivateRequestObject)
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
                                    <h3>ACTIVATE</h3>
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
                                        <div class="form-group">
                                                <fieldset>
                                                    <input autocomplete="off" ref='code' class="form-control1" placeholder="Activation Code" type="text" /><i class="password"></i>
                                                </fieldset>
                                            </div>
                                       
                                        <button className="green-btn btn-block btn-lg" type="button"  onClick={this.activate}>ACTIVATE</button>
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
export default ActivateAccount;
