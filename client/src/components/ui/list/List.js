import React from "react";
import "../theme.css"
function List(props) {
    let classes = "list"

    if(props.horizontal){
      classes += " list-horizontal"
    }
    if(props.right){
        classes += " list-right"
      }

    return (
        <div {...props} className={classes}>
            {props.children}
        </div>
    )
}

export default List