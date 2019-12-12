import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout,validateLogin } from '../common/common';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItemCount: 0,
            isLoggedIn: false,           
        }
    }

    logout = () =>{
        this.setState({isLoggedIn:false});
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionTime");
    }

    NavigateToLogin = () => {
        this.props.history.push('/login');
    }

    NavigateToCart = () => {
        this.props.history.push('/ShoppingCart');
    }

    NavigateToHome = () => {
        this.props.history.push('/');
    }

    NavigateToAccount = () => {
        this.props.history.push('/activateAccount');
    }

    NavigateToSignUp = () => {
        this.props.history.push('/signup');
    }

    NavigateToHistory = () =>{
        this.props.history.push('/History');
    }

    componentDidMount()
    {
      let isLogin = validateLogin();
      if(isLogin){
        this.setState({isLoggedIn:true});
      }
      else{
          this.logout();
      }
    }

    render() {
            this.state.cartItemCount = localStorage.getItem('cartItemCount');
        return (

            <div className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header basecolor pt-10 " style={{ height: '75px' }}>

                        <div className="hidden-xs float-right navbar-brand  ">
                            <ul className="languageBox">
                                {/* <li>
                                    <a className="page-scroll active _accountBalance fs-15" href="/"> </a>
                                </li> */}
                                <li >
                                    <div className='row'>
                                     <div> 
                                     { this.state.isLoggedIn? (
                                     <div className = "col-lg-4">
                                     <button className="btnn btn-green btnTopNavLogout" type="button" onClick={()=> this.logout()}><Link to="/login" style={{color:'white'}}> Logout</Link></button>
                                 </div>

                                    ) : (
                                        <div className = "col-lg-4">
                                       <button className="btnn btn-green btnTopNavLogin " type="button"  onClick={this.NavigateToLogin} style={{marginRight: '13px'}}>Login</button>
                                       <button className="btnn btn-green btnTopNavSignup" type="button"  onClick={this.NavigateToSignUp}>Sign Up</button> 
                                    </div>

                                   
                                    )}
                                    </div>

                                    </div>
                                </li>
                                <li><a href="/Home/ChangeCulture?lang=ar-BH&amp;returnUrl=%2F" id="change-lang" style={{fontSize:'21px'}}>عربي</a></li>
                                <li><a className="main-home" href="https://sadadbahrain.com"> </a></li>

                            </ul>
                        </div>
                        <a className="navbar-brand float-left" onClick={this.NavigateToHome} >
                            <img src={require('../../content/img/logo.png')} alt="sadad" className="pt-unset" />
                        </a>
                    </div>
                    <div className={this.state.isLoggedIn ? "navbar-collapse show" : "navbar-collapse hide"} style={{ backgroundColor: 'white' }}>
                        <div className="customNav">
                            <ul className="nav navbar-nav leftMenuItems">
                                <li style={{ padding: '19px 17px 11px 51px', borderRight: 'solid 1px #ddd' }}><a onClick={this.NavigateToHome} className="qp-home hidden-xs"> </a></li>
                                <li className="pl-18"><h3 className="font-weight-bold text-uppercase" style={{ color: "#0061ae", marginTop: '9px' }}>Online Express Payment</h3></li>
                            </ul>
                            <ul className="nav navbar-nav rightMenuItems">
                                <li style={{ borderRight: "solid 1px #ddd" }}><a onClick={this.NavigateToAccount}><i><span className="glyphicon glyphicon-user"></span></i><span>Account</span></a></li>
                                <li><a onClick={this.NavigateToHistory} style={{ borderRight: "solid 1px #ddd" }}><i><span className="glyphicon glyphicon-globe"></span></i><span>History</span></a></li>
                                <li><a href="https://sadadbahrain.com/app/help.html" target="_blank"><i><span className="glyphicon glyphicon-headphones"></span></i><span>Help</span></a></li>
                                <li>
                                    <a onClick={this.NavigateToCart} className="main-cart-icon" style={{ padding: "10px 25px 13px 20px", backgroundColor: "#0061AE", borderTop: "solid 1px #ac63c0" }}>
                                        <i className="fs-30 cartIcon cartIconCount" data-count={this.state.cartItemCount}>
                                            <span className="glyphicon glyphicon-shopping-cart cartIcon"></span>
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Header);