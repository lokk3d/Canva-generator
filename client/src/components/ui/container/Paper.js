import React from "react";
import "../theme.css"

function Paper(props){
    return(
        <div {...props} className="paper-default" >
                {props.children}
        </div>
    )
}



export default Paper