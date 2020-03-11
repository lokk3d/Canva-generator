import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button } from "@material-ui/core";

function NewCanva({
    onSave,
    open,
    onClose
}) {

    const [value, setValue] = useState("")

    return (

        <Dialog
            open={open}
            onClose={
                ()=> {onClose();
                setValue("")}
                }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Titolo del Canva"}</DialogTitle>
            <DialogContent>
               <TextField
                value = {value}
                onChange= {(e)=>setValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    ()=> {onClose();
                    setValue("")}
                    } color="primary">
                    Annulla
                </Button>
                <Button onClick={()=>{
                    onSave(value)
                    setValue("")
                    onClose()
                }} 
                color="primary">
                    Salva
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewCanva