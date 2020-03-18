import React from "react";

function Nav(props){
    return(
        <nav {...props}>{props.children}</nav>
    )
}

export default Nav