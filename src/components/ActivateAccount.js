import React, { Component } from 'react';
import '../content/css/activateAccount.css';
import { ActivateRequestInfo } from '../api/ApiCalls';
import _ from 'lodash';

const initialState = {
    phoneError: '',
    codeError: '',
    error: '',
    loading: ''
}
class ActivateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            msisdn: '',
            code: ''
        }
        this.activate = this.activate.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    validate(msisdn, activationCode) {

        if (msisdn === "" || msisdn === null || msisdn === undefined) {
            this.setState({
                phoneError: "Phone is required"
            })

        }
        if (msisdn.length !== 8) {
            this.setState({
                phoneError: "Please enter your 8 digit phone number"
            })
            return false;
        }
        if (activationCode === "" || activationCode === null || activationCode === undefined) {
            this.setState({
                codeError: "Activation code is missing"
            })

        }
        if (activationCode.length !== 6) {
            this.setState({
                codeError: "Invalid pin"
            })
            return false;
        }

        return true;

    }
    activate() {
        let msisdn = this.state.msisdn;
        let activationCode = this.state.code;

        const isValid = this.validate(msisdn, activationCode);
        if (isValid) {
            this.setState(initialState);

            let ActivateRequestObject = {

                "msisdn": "973" + msisdn,
                "activation-code": activationCode,
            }
            this.setState({ loading: true })
            ActivateRequestInfo(ActivateRequestObject)
                .then((result) => {
                    this.setState({ loading: false })
                    if (result !== undefined) {
                     
                        let resultData = _.get(result.data, 'error-code');
                        let resultDataMessage = _.get(result.data, 'error-message');
                        if (resultData === 0) {
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
                                    case 108:
                                        this.setState({
                                            error: resultDataMessage
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
    handleChange(event) {
        if (event.target.name === 'phone') {
            this.setState({ msisdn: event.target.value });
        }
        else {
            this.setState({ code: event.target.value });
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
                                                    <input className="form-control1 input-text"
                                                        name='phone'
                                                        placeholder="30000004"
                                                        value={this.state.msisdn}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span className="input-disabled-text-without-modal">+973</span><i className="phone"></i>
                                                    <i id="numberLoading" className={this.state.loading ? "loading" : ""}></i>
                                                </div>
                                                {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}

                                                <div className="form-group">
                                                    <fieldset>
                                                        <input className="form-control1"
                                                            name='code'
                                                            placeholder="Activation Code"
                                                            type="text"
                                                            value={this.state.code}
                                                            onChange={this.handleChange}
                                                        /><i className="password"></i>
                                                    </fieldset>
                                                </div>
                                                {this.state.codeError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.codeError}</div> : null}

                                                <button className="green-btn btn-block btn-lg" type="button" onClick={this.activate}>ACTIVATE</button>
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
