import React from "react";
import "../theme.css"

function Input(props) {
    return (
        <input {...props} >
            {props.children}
        </input>
    )
}

export default Input