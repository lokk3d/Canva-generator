import React from "react";
import { Link } from "react-router-dom"

import Container from "../ui/container/Container"
import Button from "../ui/button/Button"
import Span from "../ui/Span"
import Anchor from "../ui/Anchor"
import Nav from "../ui/Nav"


function NavBar(props) {

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Anchor className="navbar-brand" >
        <Link to="/" style={{color:"#ffffff", textDecoration:"none"}}>
          Canvas Generator
        </Link>
        </Anchor>
      <Button
        className="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <Span className="navbar-toggler-icon"></Span>
      </Button>

      <Container className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.children}
      </Container>
    </Nav>

  );
}

export default NavBar