import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Button } from "@material-ui/core";

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
                () => {
                    onClose();
                    setValue("")
                }
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Titolo della Canvas"}</DialogTitle>
            <DialogContent>
                <div class="input-group mb-3">
                 
                    <input
                        type="text" class="form-control"
                        placeholder="Titolo" aria-label="Titolo"
                        aria-describedby="basic-addon1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                </div>
              
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    () => {
                        onClose();
                        setValue("")
                    }
                } color="primary">
                    Annulla
                </Button>
                <Button onClick={() => {
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