import React, { useEffect, useState } from "react";
import EditableInputText from "../editableComponents/EditableInputText"
import EditableTextArea from "../editableComponents/EditableTextArea"
import ItemColorPicker from "./ItemColorPicker"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from "react-redux";

const initialState = {
    mouseX: null,
    mouseY: null,
};

function Item({
    onUpdate = (item) => { console.log("I want to update this post: " + JSON.stringify(item)) },
    onDelete = (id) => { console.log("I want to delete this post: " + id) },
    item = { title: "", description: "", bgColor: "#ffffff", _id: "defaultId" }
}) {

    const update = (key, value) => {
        onUpdate({ ...item, [key]: value })
    }

    
    const [state, setState] = React.useState(initialState);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);

    const [showDescription, setShowDescription] = useState(false)

    useEffect(()=>{
        if(item.description !== "..."){
            setShowDescription(true)
        }
    },[item])

    const mouseEnter = ()=>{
        if(item.description === "..."){
            setShowDescription(true)
        }
    }

    const mouseLeave =() => {
        if(item.description === "..."){
            setShowDescription(false)
        }
    }



    const handleClick = event => {
        event.preventDefault();
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setState(initialState);
    };

    

    return (
        <div style={{
            ...styles.container,
            backgroundColor: item.bgColor || "#ffffff"
        }}
            onContextMenu={handleClick} 

            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >

            <div style={styles.row}>
                <EditableInputText
                    value={item.title}
                    onSave={(e) => update("title", e)}
                    fontSize={16}
                />
               
            </div>

            {
                showDescription?
                <EditableTextArea
                    value={item.description}
                    onSave={(e) => {
                        if(e.trim() === "")
                            update("description", "...")
                        else
                            update("description", e)
                    }}
                />
                :
                null
            }
            

            <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    state.mouseY !== null && state.mouseX !== null
                        ? { top: state.mouseY, left: state.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={() => onDelete(item._id)}>Delete</MenuItem>
                <MenuItem onClick={()=>setColorPickerOpen(true)}>Background Color</MenuItem>
                
            </Menu>

            <ItemColorPicker 
                open={colorPickerOpen}
                onSave={(color)=>{
                    update("bgColor",color);
                    setColorPickerOpen(false)
                }}
                onClose={()=>setColorPickerOpen(false)}

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
        borderRadius: "2px",
        cursor: 'context-menu'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

}

export default Item