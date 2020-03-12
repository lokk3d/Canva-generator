import React from "react";
import { Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import { logout } from "../authPage/authReducer"


function LoggedNavBar(props) {

  const dispatch = useDispatch();
  return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/"
            onClick={() => dispatch(logout())}
          >
            Logout
            </Link>
        </li>
      </ul>

  );
}

export default LoggedNavBar