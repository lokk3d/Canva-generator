import React, { useState, useEffect } from "react";
import EditableInputText from "../editableComponents/EditableInputText";
import { useDispatch, useSelector } from "react-redux"
import { updateCanva, fetchCanva } from "./canvaReducer"
import { makeStyles } from '@material-ui/core/styles';
import Canva from "./Canva"
import TemplateDialogList from "../canvasTemplate/TemplateDialogList"
import {fetchTemplates} from "../canvasTemplate/templateReducer"
import domtoimage from 'dom-to-image';


const useStyles = makeStyles(theme => ({
    col:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    }
  }));
  

function CanvasPage(props) {

    const canvasId = "canvasId"
    const canva = useSelector(state => state.canva)

    const templates = useSelector(state => state.templates)
    const [templatesOpen, setTemplatesOpen] = useState(false)

    const dispatch = useDispatch()
    const classes = useStyles();

    const id = props.match.params.id

    useEffect(() => {
        dispatch(fetchCanva(id))
        dispatch(fetchTemplates())

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


    const downloadImage = ()=>{
        var node = document.getElementById(canvasId);
        domtoimage.toJpeg(node,{bgcolor:"#ededed"})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'canvas.jpeg';
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    const copyright = "Built with Canvas Generator"

    return (
        <div className={classes.col} style={{marginTop:30}}>

            <div 
                className={classes.col} 
                id={canvasId}
                style={{paddingBottom:20}}
            >
                <EditableInputText
                    value={canva.data.title || ""}
                    onSave={(e) => updateCanvaTitle(e)}
                    fontSize={26} />

                <div style={{display:"block", marginLeft:"5%", marginRight:"5%", maxWidth:1600}} >
                    <Canva 
                    components={canva.data.components}
                    onUpdate={(components)=>{
                        updateCanvaComponents(components)
                    }}
                    />
                    <div style={{width:"100%", textAlign:"center"}}>{copyright}</div>
                    
                </div>
            </div>

            <button
                type="button" class="btn btn-primary"
                style={{ marginTop: 30 }}
                onClick={()=>addNewWrapper()}>
                Aggiungi board alla canva
            </button>

            <button
                type="button" class="btn btn-link"
                onClick={()=>setTemplatesOpen(true)}>
                Carica schema template
            </button>


            <button
                style={{marginTop:30}}
                type="button" class="btn btn-dark"
                onClick={downloadImage}>
                Esporta immagine
            </button>

            <TemplateDialogList 
                templates={templates}
                onClose={()=>setTemplatesOpen(false)}
                open={templatesOpen}
                onSave={(template)=>{
                    setTemplatesOpen(false)
                    updateCanvaComponents(template)
                }}
            />

        </div>
    )
}

export default CanvasPage