import React, { Component } from 'react';
import {AccountRequestInfo} from '../api/ApiCalls';
import {SubmitRequestInfo} from '../api/ApiCalls';
import { validateLogin } from '../components/common/common';
import _ from 'lodash';

const initialState = {
    message: '',
    emailError: '',
    CPRError: '',
    loading: '',
    error:''
}
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state = {
            email: '',
            CPR: '',
        }
        let isValid = validateLogin();
        if (!isValid) {
    
          this.props.history.push("/login");
        }

       this.saveAccount = this.saveAccount.bind(this);
       this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount(){
        let sessionId = localStorage.getItem('sessionId');
        let AccountRequestObject = {
            "session-id": sessionId
        }
 
        AccountRequestInfo(AccountRequestObject)
        .then((result) => {
           
       
        if (result !== undefined) {
            
            this.setState({email : _.get(result.data, 'emails')})      
            this.setState({CPR : _.get(result.data, 'cpr')})     
        }

        console.log(result)
    })
    .catch((err) => {

        console.log("error login failed !!!");
    })
        
    }
      
    validate(email, CPR) {
       
        if (email === "" || email === null || email === undefined) {
            this.setState({
                emailError: "Email required"
            })
            return false;
        }
        //   if (!email.includes('@')) {
        //     this.setState({
        //         emailError: "Invalid email"
        //     })
        //     return false;
        // }
      
        if (CPR === "" || CPR === null || CPR === undefined) {
            this.setState({
                CPRError: "CPR required"
            })
            return false;
        }

        if (CPR.length !== 9) {
            this.setState({
                CPRError: "Please enter your 9 digit CPR number"
            })
            return false;
        }
        return true;
    }
 
       
    saveAccount(){
        let email = this.state.email;
        let cpr = this.state.CPR;
        const isValid = this.validate(email, cpr) 
        if (isValid) {
            this.setState(initialState);
        let sessionId = localStorage.getItem('sessionId');
        let SubmitRequestObject = {
            "session-id": sessionId,
            "emails":email,
            "cpr":cpr
        }        
        this.setState({ loading: true })
        SubmitRequestInfo(SubmitRequestObject)
        .then((result) => {
            
            this.setState({ loading: false })
            if (result !== undefined) {
                let resultData = _.get(result.data, 'error-code');
                if(resultData === 0){
                    this.setState({
                        message: "Your provided information is saved successfully."

                    })
                }
                 
            }

               console.log(result)
        })

     }
    }
    handleChange(event) {
        
        if (event.target.name == 'email') {
            this.setState({ email: event.target.value });
        }
        else {
            this.setState({ CPR: event.target.value });
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
                                    <h3>ACCOUNT</h3>
                                </div>
                                
                                <div className="content-area">
                             
                                    <form >
                                        
                                        {this.state.message ? <div className='alert alert-success' style={{ fontSize: '15px' }}>{this.state.message}</div> : null}
                                        <div className="login-form">
                                            <div className="form-group">
                                                <input
                                                    className="form-control1"
                                                    name='email'
                                                    placeholder="Email"
                                                    value={this.state.email}  
                                                    onChange={this.handleChange}

                                                />
                                               
                                                <i id="numberLoading" className={this.state.loading ? "loading" : ""}></i>
                                            </div>
                                            {this.state.emailError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.emailError}</div> : null}

                                            <div className="form-group">

                                                <input
                                                  
                                                    className="form-control1"
                                                    name= 'cpr'
                                                    placeholder="CPR"
                                                    value={this.state.CPR}
                                                    onChange={this.handleChange}

                                                />
              

                                            </div>
                                            {this.state.CPRError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.CPRError}</div> : null}
                                                
                                            <button className="green-btn btn-block btn-lg" type="button" onClick={this.saveAccount}>SAVE</button>
                                           
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

export default Account;