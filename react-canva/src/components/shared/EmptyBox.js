import React  from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
function EmptyBox({label="", color="rgba(0,0,0,0.8)"}){
    return(
        <div style={{display:"flex", flexDirection:"row", margin:10}}>
            <AddCircleOutlineIcon htmlColor={color}/>
            <div style={{marginLeft:20, color:color}} >{label}</div>
            
        </div>
    )
}

export default EmptyBox