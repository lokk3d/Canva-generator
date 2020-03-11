import React from "react";
import EditableInputText from "../editableComponents/EditableInputText"
import EditableTextArea from "../editableComponents/EditableTextArea"
import ItemColorPicker from "./ItemColorPicker"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialState = {
    mouseX: null,
    mouseY: null,
};

function Item({
    onUpdate = (item) => { console.log("I want to update this post: " + JSON.stringify(item)) },
    onDelete = (item) => { console.log("I want to delete this post: " + item._id) },
    item = { title: "", description: "", bgColor: "#ffffff", _id: "defaultId" }
}) {

    const update = (key, value) => {
        onUpdate({ ...item, [key]: value })
    }

    
    const [state, setState] = React.useState(initialState);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);


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
        >

            <div style={styles.row}>
                <EditableInputText
                    value={item.title}
                    onSave={(e) => update("title", e)}
                    fontSize={16}
                />
               
            </div>

            <EditableTextArea
                value={item.description}
                onSave={(e) => update("description", e)}
            />

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
        width: "100%",
        cursor: 'context-menu'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

}

export default Item