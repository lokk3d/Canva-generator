import React, { useState, useEffect } from "react";

import Container from "../../ui/container/Container"
import List from "../../ui/list/List"
import ListItem from "../../ui/list/ListItem"
import IconButton from "../../ui/button/IconButton"

import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Paragraph from "../../ui/typography/Paragraph";


function Toolbar({ items }) {

    const [open, setOpen] = useState(true)
    const [itemList, setItemList] = useState()

    useEffect(() => {
        if(Array.isArray(items)){
            setItemList(
                items.map((item) => {
                    return (
                        <ListItem
                            style={{ ...styles.row, ...styles.space }}
                            button key={item.id}
                            onClick={item.onClick}>
                            <IconButton color="white" icon={item.icon} />
                            {
                                open ?
                                    <Paragraph style={styles.text}>{item.title}</Paragraph>
                                    : null
                            }
                        </ListItem>
                    )
                })
            )
        }

       

    }, [items])

    return (
        <Container style={{ height: "100%", backgroundColor: "#262626", zIndex:100, position:"fixed" }}>
            <List style={{ height: "100%", padding: "10px" }}>
                {itemList}

                {
                    open ?
                        <ListItem style={styles.row} button onClick={() => setOpen(false)}>
                            <IconButton color="white" icon={faArrowLeft} />
                            <Paragraph style={styles.text}>Chiudi</Paragraph>
                        </ListItem>
                        :
                        <ListItem style={styles.row} button onClick={() => setOpen(true)}>
                            <IconButton color="white" icon={faArrowRight} />
                        </ListItem>
                }

                <Container style={styles.space} />


            </List>
        </Container>
    )
}


const styles = {
    space: { marginBottom: "10px" },
    text: {
        color: "#ffffff",
        margin: "0px",
        marginLeft: "10px",
        marginRight: "10px"
    },
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
}

export default Toolbar