import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PublicIcon from '@material-ui/icons/Public';
import { ListItemIcon, Badge, Card, MenuItem, MenuList, Button, AppBar, Divider, Drawer, Hidden, IconButton, Toolbar, ListItemText, ListItem, List, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { validateLogin } from '../common/common';
import { LogoutRequestInfo } from '../../api/ApiCalls';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/actions'
import { connect } from 'react-redux';
import { compose } from 'redux';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import LockCloseIcon from '@material-ui/icons/LockOpen';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
    margin: {
        margin: theme.spacing(1),

    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    NavMenuButtons:
    {
        float: 'right',

    },
    text: {
        color: '#0061ae',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    AppDrawerHeading: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#0061ae',
        padding: '20px'
    },
    ListMenu: {

        float: 'right',
        color: 'black',
        flex: 'row',
        display: 'flex',
    },
    ListName: {
        fontSize: '15px',
        margin: '13px'

    },
    IconStyling: {
        color: '#0061ae',
        margin: '5px',
        fontSize: "large"
    }

}));

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
        props.history.push('/login');
        props.getHeaderInfo(0, false);

    }

    const drawer = (
        <Hidden only="sm">
           
           {props.isLoggedIn ? (
               <MenuList>
               <Typography className={classes.AppDrawerHeading} variant="h6">ONLINE EXPRESS PAYMENT</Typography>
                <MenuItem component={Link} to="/">
                    <IconButton color="black"><HomeIcon /></IconButton>
                    <p style={{ color: "black" }}>Home</p>
                </MenuItem>
               <MenuItem component={Link} to="/Account">
                    <IconButton aria-label="show 4 new mails" color="black"><AccountCircle /></IconButton>
                   <p style={{ color: "black" }}>ACCOUNT</p>
               </MenuItem>
               <MenuItem component={Link} to="/History">
                   <IconButton color="black">

                       <PublicIcon />

                   </IconButton>
                   <p style={{ color: "black" }}>HISTORY</p>
               </MenuItem>

               <MenuItem href="/https://sadadbahrain.com/app/help.html">
                   <IconButton color="black"><HelpIcon /></IconButton>
                   <p  style={{ color: "black" }}>HELP</p>
               </MenuItem>

               <MenuItem onClick={logout}>
               <IconButton color="black"><LockCloseIcon /></IconButton>
                   <p style={{ color: "black" }}>Logout</p>
               </MenuItem>

           </MenuList>
           ) : (

                <MenuList>
                <Typography className={classes.AppDrawerHeading} variant="h6">ONLINE EXPRESS PAYMENT</Typography>                    
                    <MenuItem component={Link} to="/login">
                   <p style={{ color: "black" }}>Login</p>
               </MenuItem>                                              
                    <MenuItem component={Link} to="/signup">
                   <p style={{ color: "black" }}>Sign Up</p>
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
        props.history.push('/activateAccount');
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
            <AppBar style={{ position: 'unset', background: '#0d61af' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link to={{ pathname: "/" }}>
                        <img src={require('../../content/img/logo.png')} alt="sadad" />
                    </Link>

                    < Hidden only="xs" >
                        <div style={{ flexGrow: 1 }}>
                            {props.isLoggedIn ? (
                                <div className={classes.NavMenuButtons}>
                                    <Button variant="contained" size="large" onClick={logout} className={classes.margin} style={{ backgroundColor: '#78a446', color: 'white' }} >LogOut</Button>
                                </div>

                            ) : (
                                    <div className={classes.NavMenuButtons}>
                                        <Button variant="contained" size="large" onClick={NavigateToLogin} className={classes.margin} style={{ backgroundColor: '#78a446', color: 'white' }} >Login</Button>
                                        <Button variant="contained" size="large" onClick={NavigateToSignUp} className={classes.margin} style={{ backgroundColor: '#78a446', color: 'white' }} >SignUp</Button>
                                    </div>

                                )}
                        </div>

                    </Hidden>

                </Toolbar>
            </AppBar>
            < Hidden only="xs" >
                <div className={props.isLoggedIn ? 'show' : 'hide'}>

                    <AppBar style={{ position: 'unset', background: 'white' }}>


                        <Toolbar>
                            <Typography className={classes.text}>
                                ONLINE EXPRESS PAYMENT
                    </Typography>

                            <div style={{ flexGrow: 1 }}>
                                <div className={classes.ListMenu}>

                                    <Typography className={classes.ListName} >
                                        <AccountCircle className={classes.IconStyling} />
                                        ACCOUNT
                    </Typography >


                                    <Typography className={classes.ListName}>
                                        <PublicIcon className={classes.IconStyling} />
                                        HISTORY
                    </Typography>


                                    <Typography className={classes.ListName} >
                                        <NotificationsIcon className={classes.IconStyling} />
                                        HELP
                    </Typography>

                                </div>

                            </div>

                        </Toolbar>

                    </AppBar>
                </div>
            </Hidden>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden only="lg" smUp implementation="css">
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

    return {
        cartItemCount: state.headerContent.cartItemCount,
        isLoggedIn: state.headerContent.isLoggin
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);
