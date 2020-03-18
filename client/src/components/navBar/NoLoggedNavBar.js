import React from "react";
import { Link } from "react-router-dom"
import List from "../ui/list/List"
import ListItem from "../ui/list/ListItem"

function NoLoggedNavBar(props) {
  return (
    <List horizontal right className="navbar-nav ml-auto">
      <ListItem className="nav-item active">
        <Link className="nav-link" to="/login" style={{color:"#fff"}}>
          Accedi
            </Link>
      </ListItem>
      <ListItem className="nav-item">
        <Link className="nav-link" to="/signup" style={{color:"#fff"}}>
          Iscriviti
            </Link>
      </ListItem>
    </List>
  );
}

export default NoLoggedNavBar