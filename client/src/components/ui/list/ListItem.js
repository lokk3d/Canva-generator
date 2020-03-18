import React from "react";

function ListItem(props) {
    if(props.button){
        return (
            <a href="#" {...props} className="list-item">
                {props.children}
            </a>
        )
    }

    return (
        <div {...props} className="list-item">
            {props.children}
        </div>
    )
}

export default ListItem