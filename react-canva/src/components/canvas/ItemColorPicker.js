import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { SketchPicker } from 'react-color';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"

function ItemColorPicker({
    open = false,
    onSave = (color) => console.log(color + " selected..."),
    onClose = () => { }
}) {

    const [color, setColor] = useState()  

    const preset = ["#ffebee","#e8eaf6","#e0f7fa","#e8f5e9","#fffde7", "#fbe9e7","#eceff1","#ffffff"]

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Scegli il colore di background"}</DialogTitle>
            <DialogContent>

            <SketchPicker 
            onChange={(col)=>setColor(col.hex)}
            color={color}
            presetColors={preset}
            />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Annulla
          </Button>
                <Button onClick={() => onSave(color)} color="primary" autoFocus>
                    Salva
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ItemColorPicker