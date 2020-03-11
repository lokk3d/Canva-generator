import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"

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

function NoLoggedNavBar(props){

    const classes = useStyles();

    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Canvas Generator
              </Typography>
              <Link to="/login" style={{color:"white", margin:10, textDecoration:"none"}}>Accedi</Link>
              <Link to="/signup" style={{color:"white", margin:10, textDecoration:"none"}}>Registrati</Link>

            </Toolbar>
          </AppBar>
        </div>
      );
}

export default NoLoggedNavBar