import React from "react";
import Container from "./container/Container"
import Span from "./Span"

function Spinner(props) {
    return (
        <Container {...props}>
            <Span class="sr-only">{props.text || "Loading..."}</Span>
        </Container>
    )
}

export default Spinner