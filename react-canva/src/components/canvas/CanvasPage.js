import React, { useState, useEffect } from "react";
import EditableInputText from "../editableComponents/EditableInputText";
import { useDispatch, useSelector } from "react-redux"
import { updateCanva, fetchCanva } from "./canvaReducer"
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@material-ui/core"
import Canva from "./Canva"

const useStyles = makeStyles(theme => ({
    col:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginTop:30
    }
  }));
  

function CanvasPage(props) {


    const canva = useSelector(state => state.canva)
    const dispatch = useDispatch()
    const classes = useStyles();

    const id = props.match.params.id

    useEffect(() => {
        dispatch(fetchCanva(id))
    }, [])

    const updateCanvaTitle = (title) => {
        dispatch(updateCanva({ ...canva.data, title: title }))
    }

    const addNewWrapper = () => {
        dispatch(updateCanva({ ...canva.data, 
            components: [...canva.data.components, 
            { title: "Untitled Board"}] }))
    }

    const updateCanvaComponents = (components) =>{
        console.log(components)
        dispatch(updateCanva({...canva.data, components:components}))
    }

    return (
        <div className={classes.col}>
            <EditableInputText
                value={canva.data.title || ""}
                onSave={(e) => updateCanvaTitle(e)}
                fontSize={26} />

            <div style={{display:"bloack", marginLeft:"5%", marginRight:"5%", maxWidth:1600}}>
                <Canva 
                components={canva.data.components}
                onUpdate={(components)=>{
                    updateCanvaComponents(components)
                }}
                />
            </div>

            <Button
                color="primary"
                variant="contained"
                style={{ margin: 30 }}
                onClick={()=>addNewWrapper()}>
                Aggiungi board al canva
            </Button>
        </div>
    )
}

export default CanvasPage