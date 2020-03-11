import React, { useState, useEffect } from "react";
import EditableInputText from "../editableComponents/EditableInputText"
import EditableTextArea from "../editableComponents/EditableTextArea"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from "@material-ui/core/IconButton"
function Item({ 
    onUpdate = (item) => { console.log("I want to update this post: " + JSON.stringify(item)) },
    onDelete = (item) => { console.log("I want to delete this post: " + item._id)},
    item = { title: "", description: "", bgColor: "#ffffff", _id:"defaultId" }
}) {

    const update = (key, value) => {
        onUpdate({ ...item, [key]: value })
    }

    return (
        <div style={{
            ...styles.container,
            backgroundColor: item.bgColor
        }}>

            <div style={styles.row}>
                <EditableInputText
                    value={item.title}
                    onSave={(e) => update("title", e)}
                    fontSize={16}
                />
                <IconButton onClick={()=>onDelete(item._id)}>
                    <DeleteOutlineIcon />
                </IconButton>
             </div>

            <EditableTextArea
                value={item.description}
                onSave={(e) => update("description", e)}
            />

        </div>
    )

}


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        padding: 10,
        boxShadow: "1px 1px 5px  rgba(0,0,0,0.20)",
        borderRadius:"2px",
        width:"100%"
    },
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    }

}

export default Item