import React from "react";
import Dialog from '@material-ui/core/Dialog';

function MyDialog(props){
    return(
        <Dialog {...props}>
            {props.children}
        </Dialog>
    )
}

export default MyDialog