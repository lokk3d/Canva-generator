import React from "react";
import "../theme.css"

function Button(props) {
    return (
        <button {...props} >
            {props.children}
        </button>
    )
}

export default Button