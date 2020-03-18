import React from "react";

import Button from "./Button"
import Icon from "../Icon"

function IconButton({ color="#a1a1a1",icon, onClick=()=>console.log("Pulsante cliccato")}){
    return(
        <Button onClick={onClick} style={{padding:"4px", backgroundColor:"transparent", border:"none", outline:"none"}}>
            <Icon icon={icon} style={{color:color}}/>
        </Button>
    )
}

export default IconButton