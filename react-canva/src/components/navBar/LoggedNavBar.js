import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import {logout} from "../authPage/authReducer"

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function LoggedNavBar(props){

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              onClick={()=>{history.push("/app")}}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Canvas Generator - Benvenuto
              </Typography>

              <Button
              onClick={()=>dispatch(logout())}
              style={{color:"#fff"}}
              >
                Logout</Button>
              

            </Toolbar>
          </AppBar>
        </div>
      );
}

export default LoggedNavBar