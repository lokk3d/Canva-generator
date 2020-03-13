import React, { useState, useEffect } from "react";
import EditableInputText from "../editableComponents/EditableInputText";
import { useDispatch, useSelector } from "react-redux"
import { updateCanvas, fetchCanvas } from "./canvasReducer"
import { makeStyles } from '@material-ui/core/styles';
import Canvas from "./Canvas"
import TemplateDialogList from "../canvasTemplate/TemplateDialogList"
import {fetchTemplates} from "../canvasTemplate/templateReducer"
import domtoimage from 'dom-to-image';
import PanoramaIcon from '@material-ui/icons/Panorama';

const useStyles = makeStyles(theme => ({
    col:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    }
  }));
  

function CanvasPage(props) {

    const canvasId = "canvasId"
    const canvas = useSelector(state => state.canvas)

    const templates = useSelector(state => state.templates)
    const [templatesOpen, setTemplatesOpen] = useState(false)

    const dispatch = useDispatch()
    const classes = useStyles();

    const id = props.match.params.id

    useEffect(() => {
        dispatch(fetchCanvas(id))
        dispatch(fetchTemplates())

    }, [])

    useEffect(()=>{
        console.log("Canvas aggiornato...")
        console.log(JSON.parse(JSON.stringify(canvas)))
    },[canvas])

    const updateCanvasTitle = (title) => {
        dispatch(updateCanvas({ ...canvas.data, title: title }))
    }

    const addNewWrapper = () => {
        dispatch(updateCanvas({ ...canvas.data, 
            components: [...canvas.data.components, 
            { title: "Untitled Board"}] }))
    }

    const updateCanvasComponents = (components) =>{
        console.log("Componenti...")
        console.log(JSON.parse(JSON.stringify(components)))

        console.log("Total canvas")
        console.log(JSON.parse(JSON.stringify(canvas)))

        dispatch(updateCanvas({...canvas.data, components:components}))
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
                    value={canvas.data.title || ""}
                    onSave={(e) => updateCanvasTitle(e)}
                    fontSize={26} />

                <div 
                id="canvas-body"
                style={{display:"block", marginLeft:"5%", marginRight:"5%", maxWidth:1600}} >
                    {
                        (!canvas.firstLoading)?
                            <Canvas 
                            components={canvas.data.components}
                            onUpdate={(components)=>{
                                updateCanvasComponents(components)
                            }}
                            />
                        :
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                   

                    <div style={{width:"100%", textAlign:"center"}}>{copyright}</div>
                    
                </div>
            </div>

            <button
                type="button" class="btn btn-primary"
                style={{ marginTop: 30 }}
                onClick={()=>addNewWrapper()}>
                    
                    <i>
                    {
                        canvas.update.doing?
                        <div class="spinner-border text-light  spinner-border-sm" role="status" style={{marginRight:10}}>
                            <span class="sr-only">Loading...</span>
                        </div>
                        :
                        null
                    }

                    </i>
                Aggiungi board alla canvas
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
                    <i style={{marginRight:10}}>
                        <PanoramaIcon /> 
                    </i>
                Esporta immagine
            </button>

            <TemplateDialogList 
                templates={templates}
                onClose={()=>setTemplatesOpen(false)}
                open={templatesOpen}
                onSave={(components)=>{
                    setTemplatesOpen(false)
                    updateCanvasComponents(components)
                }}
            />

        </div>
    )
}

export default CanvasPage