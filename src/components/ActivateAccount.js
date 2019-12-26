import React, { Component } from 'react';
import '../content/css/activateAccount.css';
import {ActivateRequestInfo} from '../api/ApiCalls';
import _ from 'lodash';

const initialState = {
    phone: '',
    code: '',
    error:'',
    loading:''
}
class ActivateAccount extends Component {
    constructor(props)
    {
        super(props);
        this.state = initialState
        this.activate = this.activate.bind(this);
        
    }
    validate(msisdn,activationCode) {
       
        if(msisdn === "" || msisdn === null || msisdn === undefined)
        {
            this.setState({
                phone: "Phone is required"
            })
          
        }
        if (msisdn.length !== 8) {
            this.setState({
                phone: "Please enter your 8 digit phone number"
            })
            return false;
        }
        if(activationCode === "" || activationCode ===null || activationCode === undefined){
            this.setState({
                code: "Activation code is missing"
            })

        }
        if (activationCode.length !== 6) {
            this.setState({
                code: "Invalid pin"
            })
            return false;
        }
        
        return true;

    }
    activate(){
 
        let msisdn = this.refs.phone.value;
        let activationCode = this.refs.code.value;
        const isValid = this.validate(msisdn,activationCode);
        if (isValid) {
            this.setState(initialState);
       
        let ActivateRequestObject = {

            "msisdn": "973"+msisdn,
            "activation-code": activationCode,
        }
        this.setState({loading:true})
        ActivateRequestInfo(ActivateRequestObject)
        .then((result) => {
            this.setState({loading : false})
            if (result  != undefined) {
                let message = "";
                let resultData = _.get(result.data, 'error-code');
                let resultDataMessage = _.get(result.data, 'error-message');
                if(resultData === 0){
                   this.props.history.push('/');
                }
                else {
                    if (resultData === null) {
                        this.setState({
                            error: "Wrong Activation Code"
                        })
                    }
                    else {
                        switch (resultData) {
                            
                            case 104:
                                this.setState({
                                    error: resultDataMessage
                                })
                                break;
                            case 106:
                                this.setState({
                                    error: "Invalid Phone"
                                })
                                break;
                            
                            default:
                                break;
                        }

                    }
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
                                    <form>   
                                    {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}                                                         
                                         <div className="login-form">
                                        <div className="form-group">
                                        <input className="form-control1 input-text" name ='myphone' placeholder="30000004" id="phone" ref="phone"/>
                                            <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                            <i id="numberLoading" className={this.state.loading ? "loading":""}></i>
                                        </div>
                                        {this.state.phone ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phone}</div> : null}
                                        
                                        <div className="form-group">
                                                <fieldset>
                                                    <input autoComplete="off" ref='code' className="form-control1" placeholder="Activation Code" type="text" /><i className="password"></i>
                                                </fieldset>
                                            </div>
                                            {this.state.code ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.code}</div> : null}
                                       
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
