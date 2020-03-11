import React, { useState, useEffect } from "react";
import { Avatar, List, ListItem, Button, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    main: {
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));
function User({firstName="Test", lastName="User", email="test@test.com"}) {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Avatar className={classes.orange}>
                {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase() }
            </Avatar>
            <h3 style={{ marginBottom: 0 }}>{firstName + " " + lastName}</h3>
            <div>{email}</div>
        </div>
    )
}

export default User