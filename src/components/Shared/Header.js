import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PublicIcon from '@material-ui/icons/Public';
import { MenuItem, MenuList, Fab, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { validateLogin } from '../common/common';
import { LogoutRequestInfo } from '../../api/ApiCalls';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/actions'
import { connect } from 'react-redux';
import { compose } from 'redux';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import LockCloseIcon from '@material-ui/icons/LockOpen';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import useStyles from '../../content/css/useStyles';

function Header(props) {

    const { container } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClose = () => {
        setMobileOpen(false);

    };
    const logout = () => {

        let sessionId = localStorage.getItem('sessionId');
        let LogoutRequestObject = {
            "session-id": sessionId
        }
        LogoutRequestInfo(LogoutRequestObject)
            .then((result) => {

                console.log(result)
            })
            .catch((err) => {

                console.log("error login failed !!!");
            });

        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionTime");
        localStorage.removeItem("redirectTo");
        props.history.push('/');
        props.getHeaderInfo(0, false);

    }
    const drawer = (
        <Hidden only="sm"  >
            {props.isLoggedIn ? (
                <MenuList>
                    <Typography className={classes.AppDrawerHeading} variant="h6">ONLINE EXPRESS PAYMENT</Typography>
                    <MenuItem onClick={handleDrawerClose} component={Link} to="/">

                        <IconButton><HomeIcon /></IconButton>
                        <p >Home</p>
                    </MenuItem>
                    <MenuItem onClick={handleDrawerClose} component={Link} to="/Account">
                        <IconButton aria-label="show 4 new mails" ><AccountCircle /></IconButton>
                        <p >ACCOUNT</p>
                    </MenuItem>
                    <MenuItem onClick={handleDrawerClose} component={Link} to="/History">
                        <IconButton >

                            <PublicIcon />

                        </IconButton>
                        <p >HISTORY</p>
                    </MenuItem>

                    <MenuItem onClick={handleDrawerClose} href="/https://sadadbahrain.com/app/help.html">
                        <IconButton ><HelpIcon /></IconButton>
                        <p >HELP</p>
                    </MenuItem>

                    <MenuItem onClick={handleDrawerClose} component={Link} to="/">
                        <IconButton ><LockCloseIcon /></IconButton>
                        <p >Logout</p>
                    </MenuItem>

                </MenuList>

            ) : (

                    <MenuList>
                        <Typography className={classes.AppDrawerHeading} variant="h6">ONLINE EXPRESS PAYMENT</Typography>
                        <MenuItem onClick={handleDrawerClose} component={Link} to="/login">
                            <p style={{}}>Login</p>
                        </MenuItem>
                        <MenuItem onClick={handleDrawerClose} component={Link} to="/signup">
                            <p >Sign Up</p>
                        </MenuItem>
                    </MenuList>

                )}

        </Hidden>
    );


    const NavigateToLogin = () => {
        props.history.push('/login');
    }

    const NavigateToCart = () => {
        props.history.push('/ShoppingCart');
    }

    const NavigateToHome = () => {
        props.history.push('/');
    }

    const NavigateToAccount = () => {
        props.history.push('/Account');
    }

    const NavigateToSignUp = () => {
        props.history.push('/signup');
    }

    const NavigateToHistory = () => {
        props.history.push('/History');
    }
    React.useEffect(() => {
        let isLogin = validateLogin();
        console.log(isLogin)

        if (!isLogin) {
            logout();
        }
        else {
            let cartItemCount = localStorage.getItem('cartItemCount');
            if (cartItemCount === null) {
                props.getHeaderInfo(0, true);
            }
            else {
                props.getHeaderInfo(cartItemCount, true);
            }
        }
    }, []);

    return (

        <div >
            <AppBar style={{ position: 'unset', background: '#0d61af', height: '80px' }}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Link to={{ pathname: "/" }}>
                        <img style={{ marginTop: '12px' }} src={require('../../content/img/logo.png')} alt="sadad" />
                    </Link>

                    < Hidden only="xs" >
                        <div style={{ flexGrow: 1 }}>
                            {props.isLoggedIn ? (
                                <div className={classes.NavMenuButtons} onClick={logout}>
                                    <Fab variant="extended" size="medium"  className={classes.logoutbtn} style={{ backgroundColor: '#78a446', color: 'white' }} >LogOut</Fab>

                                </div>

                            ) : (
                                <div>
                                     <div className={classes.NavMenuButtons} onClick={NavigateToSignUp}>
                                        <Fab variant="extended" size="medium" className={classes.loginbtn} style={{ padding: '0px 22px', backgroundColor: '#78a446', color: 'white' }} >SignUp</Fab>
                                    </div>
                                    <div className={classes.NavMenuButtons}  onClick={NavigateToLogin} >
                                        <Fab variant="extended" size="medium" className={classes.loginbtn} style={{ padding: '0px 22px', backgroundColor: '#78a446', color: 'white' }} >Login</Fab>
                                    </div>
                                   
                                    </div>

                                )}

                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Link href="#" className={classes.language}>
                                عربي
                                 </Link>
                            {/* <Link href="https://sadadbahrain.com/">
                                   <HomeIcon className={classes.homeIcon}/>
                                </Link>  */}
                        </div>

                    </Hidden>

                </Toolbar>
            </AppBar>

            {props.isLoggedIn ? (
                < Hidden only="xs" >
                    <AppBar style={{ position: 'unset', background: 'white', height: '65px' }}>

                        <Toolbar>
                            <div style={{ padding: '0px 33px' }}>
                                <WidgetsIcon onClick={NavigateToHome} style={{ color: '#1cc1f7', fontSize: '30px', cursor: 'pointer' }}></WidgetsIcon>
                            </div>
                            <Typography className={classes.text}>
                                ONLINE EXPRESS PAYMENT
                             </Typography>

                            <div style={{ flexGrow: 1 }}>
                                <div className={classes.ListMenu}>

                                    <Typography onClick={NavigateToAccount} className={classes.ListName} >
                                        <AccountCircle className={classes.IconStyling} />
                                        ACCOUNT
                                     </Typography >


                                    <Typography onClick={NavigateToHistory} className={classes.ListName}>
                                        <PublicIcon className={classes.IconStyling} />
                                        HISTORY
                                     </Typography>


                                    <Typography className={classes.ListName} >
                                        <NotificationsIcon className={classes.IconStyling} />
                                        HELP
                                  </Typography>
                                    <Typography className={classes.ListName} >
                                        <ShoppingCartIcon onClick={NavigateToCart} className={classes.Cart}></ShoppingCartIcon>
                                    </Typography>

                                </div>
                            </div>

                        </Toolbar>

                    </AppBar>

                </Hidden>
            ) : (
                    <div></div>
                )}


            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >

                        {drawer}

                    </Drawer>

                </Hidden>

            </nav>

        </div>
    );
}
const mapDispatchToProps = (dispatch) => {

    return {
        getHeaderInfo: (itemCartCount, isLoggedIn) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};
const mapStateToProps = state => {
    console.log(state)

    return {
        cartItemCount: state.headerContent.cartItemCount,
        isLoggedIn: state.headerContent.isLoggin
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);