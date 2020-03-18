import React from "react";
import "./theme.css"
import Container from "./container/Container"
import Paragraph from "./typography/Paragraph"

function Avatar({children, size, backgroundColor}) {

    const fontSize= size+"px"
    const containerSize = size*1.8+"px"
    return (
    <Container class="avatar" 
    style={{width:containerSize, height:containerSize, backgroundColor:backgroundColor}}>
        <Paragraph style={{margin:"0px", fontSize:fontSize, lineHeight:fontSize}}>{children}</Paragraph>
    </Container>
    )
}

export default Avatar