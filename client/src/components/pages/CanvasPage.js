import React, { useState, useEffect } from "react";
import EditableInputText from "../features/editableComponents/EditableInputText";
import { useDispatch, useSelector } from "react-redux"
import { updateCanvas, fetchCanvas } from "../features/canvas/canvasReducer"
import Canvas from "../features/canvas/Canvas"
import TemplateDialogList from "../features/canvasTemplate/TemplateDialogList"
import { fetchTemplates } from "../features/canvasTemplate/templateReducer"
import domtoimage from 'dom-to-image';
import {useHistory} from "react-router-dom"

import Container from "../ui/container/Container"
import Title from "../ui/typography/Title"
import Paper from "../ui/container/Paper"
import Button from "../ui/button/Button"
import IconButton from "../ui/button/IconButton"
import List from "../ui/list/List"
import ListItem from "../ui/list/ListItem"
import Spinner from "../ui/Spinner"
import Avatar from "../ui/Avatar"

import Toolbar from "../features/toolbar/Toolbar"

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import Span from "../ui/Span";



const styles = {
    col: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
        margin: 10,
    },
    main: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
}


function CanvasPage(props) {
    const history = useHistory()
    const canvasId = "canvasId"
    const canvas = useSelector(state => state.canvas)

    const templates = useSelector(state => state.templates)
    const [templatesOpen, setTemplatesOpen] = useState(false)

    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(() => {
        dispatch(fetchCanvas(id))
        dispatch(fetchTemplates())

    }, [])

    useEffect(() => {
        console.log("Canvas aggiornato...")
        console.log(JSON.parse(JSON.stringify(canvas)))
    }, [canvas])

    const updateCanvasTitle = (title) => {
        dispatch(updateCanvas({ ...canvas.data, title: title }))
    }

    const addNewWrapper = () => {
        dispatch(updateCanvas({
            ...canvas.data,
            components: [...canvas.data.components,
            { title: "Untitled Board" }]
        }))
    }

    const updateCanvasComponents = (components) => {
        console.log("Componenti...")
        console.log(JSON.parse(JSON.stringify(components)))

        console.log("Total canvas")
        console.log(JSON.parse(JSON.stringify(canvas)))

        dispatch(updateCanvas({ ...canvas.data, components: components }))
    }


    const downloadImage = () => {
        var node = document.getElementById(canvasId);
        domtoimage.toJpeg(node, { bgcolor: "#ededed" })
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


    const items = [
        { id: 1, title: "Home", icon: faHome, onClick: () => history.push("/app") },
        { id: 1, title: "Scarica", icon: faDownload, onClick:()=> downloadImage() },
        { id: 1, title: "Condividi", icon: faShareAlt },
        { id: 1, title: "Aggiungi board", icon: faPlus, onClick:()=>addNewWrapper()},
        { id: 1, title: "Template", icon: faThList, onClick:() => setTemplatesOpen(true) },

    ]

    return (
        <Container style={styles.main}>

            <Toolbar items={items} />
            <Container style={styles.col} style={{ marginLeft: "46px", width: "100%", marginTop: 30 }}>

                <Container
                     style={styles.col}
                    id={canvasId}
                    style={{ paddingBottom: 20, marginLeft:"20px" }}
                >
                    <EditableInputText
                        value={canvas.data.title || ""}
                        onSave={(e) => updateCanvasTitle(e)}
                        fontSize={26} />

                    <Container
                        id="canvas-body"
                        style={{ display: "block", marginLeft: "5%", marginRight: "5%", maxWidth: 1600 }} >
                        {
                            (!canvas.firstLoading) ?
                                <Canvas
                                    components={canvas.data.components}
                                    onUpdate={(components) => {
                                        updateCanvasComponents(components)
                                    }}
                                />
                                :
                                <Container class="text-center">
                                    <Container class="spinner-border" role="status">
                                        <Span class="sr-only">Loading...</Span>
                                    </Container>
                                </Container>
                        }


                        <Container style={{ width: "100%", textAlign: "center" }}>{copyright}</Container>

                    </Container>
                </Container>

                {/* <Button
                    type="button" class="btn btn-primary"
                    style={{ marginTop: 30 }}
                    onClick={() => addNewWrapper()}>

                    <i>
                        {
                            canvas.update.doing ?
                                <Container class="spinner-border text-light  spinner-border-sm" role="status" style={{ marginRight: 10 }}>
                                    <Span class="sr-only">Loading...</Span>
                                </Container>
                                :
                                null
                        }

                    </i>
                Aggiungi board alla canvas
            </Button>

                <Button
                    type="button" class="btn btn-link"
                    onClick={() => setTemplatesOpen(true)}>
                    Carica schema template
            </Button>


                <Button
                    style={{ marginTop: 30 }}
                    type="button" class="btn btn-dark"
                    onClick={downloadImage}>
                    <i style={{ marginRight: 10 }}>
                        <PanoramaIcon />
                    </i>
                Esporta immagine
            </Button> */}

                <TemplateDialogList
                    templates={templates}
                    onClose={() => setTemplatesOpen(false)}
                    open={templatesOpen}
                    onSave={(components) => {
                        setTemplatesOpen(false)
                        updateCanvasComponents(components)
                    }}
                />

            </Container>
        </Container>

    )
}

export default CanvasPage