import React  from "react";
import Icon from "../ui/Icon"
import Container from "../ui/container/Container"
import Paragraph from "../ui/typography/Paragraph"

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


function EmptyBox({label="", color="rgba(0,0,0,0.8)"}){
    return(
        <Container style={styles.container}>
            <Icon htmlColor={color} icon={faPlusCircle}/>            
            <Paragraph style={{margin:0, marginLeft:20, color:color}} >{label}</Paragraph>
        </Container>
    )
}

const styles = {
    container: {
        display:"flex", 
        flexDirection:"row", 
        margin:10,
        justifyContent:"center",
        alignItems:"center"

    }
}

export default EmptyBox