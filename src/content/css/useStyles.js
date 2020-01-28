import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  NavMenuButtons: {
    float: "right",
    marginTop: "12px",
    cursor: "pointer",
    display: "block"
  },

  text: {
    color: "#0061ae",
    fontSize: "18px",
    fontWeight: "bold"
  },
  AppDrawerHeading: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#0061ae",
    padding: "20px"
  },
  ListMenu: {
    float: "right",
    color: "#7b7a7b",
    flex: "row",
    display: "flex"
  },
  ListName: {
    fontSize: "15px",
    margin: "13px",
    cursor: "pointer"
  },
  IconStyling: {
    color: "#0061ae",
    margin: "5px",
    fontSize: "large",
    position:"relative",
    top:"9px"
  },
  IconStylingSmallScreen: {
    color: "#0061ae",
    margin: "5px",
    fontSize: "large",
    position:"relative",
    bottom:"4px"
  },
  Cart: {
    fontSize: "30px",
    color: "#0061ae"
  },
  logoutbtn: {
    backgroundColor: "#78a446",
    fontSize: "14px",
    fontWeight: "bold",
    // margin: '0px 70px',
    color: "white"
  },
  loginbtn: {
    margin: "0px 2px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  language: {
    color: "white",
    margin: "0px 26px",
    fontSize: "20px",
    "&:hover": {
      color: "white"
    }

    //  borderRight: '5px solid grey'
  },

  homeIcon: {
    fontSize: "30px",
    margin: "0px 16px",
    cursor: "pointer",
    "&:hover": {
      color: "white"
    }
  }
}));

export default useStyles;
