import React from "react";
import { Link } from "react-router-dom"


function NavBar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" >
        <Link to="/" style={{color:"#ffffff", textDecoration:"none"}}>
          Canvas Generator
        </Link>
        </a>
      <button
        className="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.children}
      </div>
    </nav>

  );
}

export default NavBar