import React from "react";

function Anchor(props){
    return(
        <a {...props}>{props.children}</a>
    )
}

export default Anchor