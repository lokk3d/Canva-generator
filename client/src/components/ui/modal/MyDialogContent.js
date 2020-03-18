import React from "react";
import DialogContent from '@material-ui/core/DialogContent';

function MyDialogContent(props) {
    return (
        <DialogContent {...props}>
            {props.children}
        </DialogContent>
    )
}

export default MyDialogContent