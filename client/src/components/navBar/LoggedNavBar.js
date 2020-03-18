import React from "react";
import { Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import { logout } from "../authPage/authReducer"
import List from "../ui/list/List"
import ListItem from "../ui/list/ListItem"

function LoggedNavBar(props) {

  const dispatch = useDispatch();
  return (
      <List horizontal right className="navbar-nav ml-auto">
        <ListItem className="nav-item">
          <Link className="nav-link" to="/"
            onClick={() => dispatch(logout())}
            style={{color:"#fff"}}>
            Logout
            </Link>
        </ListItem>
      </List>

  );
}

export default LoggedNavBar