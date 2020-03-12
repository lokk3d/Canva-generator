import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import EditableInputText from "../editableComponents/EditableInputText"
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { List, ListItem } from "@material-ui/core"
import Item from "./Item";
const useStyles = makeStyles({
    box: {
        border: "1px solid #afafaf",
        width: "300px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    addBox: {
        position: "relative",
        float: "right"
    }

});


function ComponentWrapper({
    component = { title: "", description: "", items: [] },
    onUpdate = (item) => { console.log("I want to update this post: " + JSON.stringify(item)) },
    onDelete = (item) => { console.log("I want to delete this post: " + item._id) },
}) {
    const classes = useStyles();
    const [showDelete, setShowDelete] = useState(false)

    const update = (key, value) => {
        onUpdate({ ...component, [key]: value })
    }

    const addItem = () => {
        const newItems = [...component.items, { title: "Untitled item", description: "..." }]
        console.log(newItems)
        onUpdate({ ...component, items: newItems })
    }

    



    const replaceUpdatedItem = (item) => {
        let newData = []
        component.items.forEach(element => {
            if (item._id === element._id) {
                newData.push(item)
            } else {
                newData.push(element)
            }
        });
        onUpdate({ ...component, items: newData })
    }

    const deleteItem = (itemId) => {
        console.log("Cancello l'item con id " + itemId)
        const newItems = component.items.filter(data => data._id !== itemId)
        onUpdate({ ...component, items: newItems })
    }


    const [itemsList, setItemsList] = useState()
    useEffect(() => {
        if (typeof component.items === "undefined") {
            component.items = []
        }
        if (Array.isArray(component.items)) {
            setItemsList(
                component.items.map(item => {
                    return (
                        <div key={item._id} style={{ padding: "0px" }}>
                            <Item
                                item={item}
                                onUpdate={(e) => replaceUpdatedItem(e)}
                                onDelete={(id) => deleteItem(id)}
                            />
                        </div>
                    )
                })
            )
        }

    }, [component])

    return (
        <div className={classes.box}>
            <div className={classes.row}

                onMouseLeave={() => setShowDelete(false)}
                onMouseEnter={() => setShowDelete(true)}

            >
                <EditableInputText
                    value={component.title}
                    onSave={(e) => update("title", e)}
                    fontSize={16}
                />
                {
                    showDelete?
                    <IconButton onClick={() => onDelete(component._id)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                    :
                    null
                }
               
            </div>

            <div>
                {itemsList}
            </div>
            
            <div
            style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>
                <button
                    style={{
                        backgroundColor:"transparent", 
                        outline:"none", 
                        border:"none",
                        margin:3
                    }}
                    onClick={() => addItem()}
                >
                    <AddIcon htmlColor="rgba(0,0,0,0.5)"/>
                </button>
            </div>
          

        </div>
    )
}



export default ComponentWrapper