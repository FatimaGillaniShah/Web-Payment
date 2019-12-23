import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validateLogin } from '../common/common';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/actions'
import { connect } from 'react-redux';
import { compose } from 'redux';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    logout = () => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionTime");
        localStorage.removeItem("redirectTo");
        this.props.getHeaderInfo(0, false);
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

    NavigateToHistory = () => {
        this.props.history.push('/History');
    }

    componentDidMount() {
        let isLogin = validateLogin();

        if (!isLogin) {
            this.logout();
        }
        else {
            let cartItemCount = localStorage.getItem('cartItemCount');
            if (cartItemCount === null) {
                this.props.getHeaderInfo(0, true);
            }
            else {
                this.props.getHeaderInfo(cartItemCount, true);
            }
        }

    }

    render() {

        return (
                <div className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">

                        <div className="navbar-header basecolor pt-10 " style={{ height: '75px' }}>
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="hidden-xs float-right navbar-brand  ">
                                <ul className="languageBox">
                                    <li >
                                        <div className='row'>
                                            <div>
                                                {this.props.isLoggedIn ? (
                                                    <div className="col-lg-4">
                                                        <button className="btnn btn-green btnTopNavLogout" type="button" onClick={() => this.logout()}><Link to="/login" style={{ color: 'white' }}> Logout</Link></button>
                                                    </div>

                                                ) : (
                                                        <div className="col-lg-4">
                                                            <button className="btnn btn-green btnTopNavLogin " type="button" onClick={this.NavigateToLogin} style={{ marginRight: '13px' }}>Login</button>
                                                            <button className="btnn btn-green btnTopNavSignup" type="button" onClick={this.NavigateToSignUp}>Sign Up</button>
                                                        </div>


                                                    )}
                                            </div>

                                        </div>
                                    </li>
                                    <li><a href="/Home/ChangeCulture?lang=ar-BH&amp;returnUrl=%2F" id="change-lang" style={{ fontSize: '21px' }}>عربي</a></li>
                                    <li><a className="main-home" href="https://sadadbahrain.com"> </a></li>
                                </ul>
                            </div>
                            <a className="navbar-brand float-left" onClick={this.NavigateToHome} >
                                <img src={require('../../content/img/logo.png')} alt="sadad" className="pt-unset" />
                            </a>
                        </div>

                        <div className="navbar-collapse collapse">
                            <div className={this.props.isLoggedIn ? 'customNav show' : 'customNav hide'}>

                                <ul className="nav navbar-nav leftMenuItems">
                                    <li style={{ padding: '13px 0px 12px 22px', borderRight: 'solid 1px #ddd' }}><a href="/Merchant" className="qp-home hidden-xs"></a></li>
                                    <li className="pl-18"><h3 className="p-unset fs-18 font-weight-bold text-uppercase" style={{ color: '#0061ae' }}>OnlineExpressPayment</h3></li>
                                </ul>

                                <ul className="nav navbar-nav rightMenuItems">
                                    
                                    <li style={{ borderRight: 'solid 1px #ddd !important' }}><a href="/User/Account"><i><span className="glyphicon glyphicon-user"></span></i><span>Account</span></a></li>
                                    <li><a href="/User/History" style={{ borderRight: 'solid 1px #ddd !important' }}><i><span className="glyphicon glyphicon-globe"></span></i><span>History</span></a></li>
                                    <li><a href="https://sadadbahrain.com/app/help.html" target="_blank"><i><span className="glyphicon glyphicon-headphones"></span></i><span>Help</span></a></li>
                                    <li><a href="/User/ShoppingCart" className="main-cart-icon"><i className="fs-30"><span className="glyphicon glyphicon-shopping-cart" style={{ Color: 'white !important' }}></span></i></a></li>
                                    <li className="btn-group clearfix hidden-md hidden-lg hidden-sm">
                                        {this.props.isLoggedIn ? '<button className="btn btn-green btnTopNavMerchantLogout" type="button">Logout</button>' : '<button className="btn btn-green btnTopNavMerchantLogin" type="button">Login</button>'}
                                    </li>
                                </ul>
                            </div>
                        </div>











                        {/* <div className={this.props.isLoggedIn ? "navbar-collapse show" : "navbar-collapse hide"} style={{ backgroundColor: 'white' }}>
                            <div className="customNav">
                                <ul className="nav navbar-nav leftMenuItems">
                                    <li style={{ padding: '19px 17px 11px 51px', borderRight: 'solid 1px #ddd' }}><a onClick={this.NavigateToHome} className="qp-home hidden-xs"> </a></li>
                                    <li className="pl-18"><h3 className="font-weight-bold text-uppercase" style={{ color: "#0061ae", marginTop: '9px' }}>Online Express Payment</h3></li>
                                </ul>
                                <ul className="nav navbar-nav rightMenuItems">
                                    <li style={{ borderRight: "solid 1px #ddd" }}><a onClick={this.NavigateToAccount}><i><span className="glyphicon glyphicon-user"></span></i><span>Account</span></a></li>
                                    <li><a onClick={this.NavigateToHistory} style={{ borderRight: "solid 1px #ddd" }}><i><span className="glyphicon glyphicon-globe"></span></i><span>History</span></a></li>
                                    <li><a href="https://sadadbahrain.com/app/help.html" target="_blank" rel="noopener noreferrer"><i><span className="glyphicon glyphicon-headphones"></span></i><span>Help</span></a></li>
                                    <li>
                                        <a onClick={this.NavigateToCart} className="main-cart-icon" style={{ padding: "10px 25px 13px 20px", backgroundColor: "#0061AE", borderTop: "solid 1px #ac63c0" }}>
                                            <i className="fs-30 cartIcon cartIconCount" data-count={this.props.cartItemCount}>
                                                <span className="glyphicon glyphicon-shopping-cart cartIcon"></span>
                                            </i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}


                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHeaderInfo: (itemCartCount, isLoggedIn) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};
const mapStateToProps = state => {
    console.log(state.headerContent);
    return {
        cartItemCount: state.headerContent.cartItemCount,
        isLoggedIn: state.headerContent.isLoggin
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);
