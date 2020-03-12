import React from "react";
import { Link } from "react-router-dom"

function NoLoggedNavBar(props) {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/login">
          Accedi
            </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Iscriviti
            </Link>
      </li>
    </ul>
  );
}

export default NoLoggedNavBar