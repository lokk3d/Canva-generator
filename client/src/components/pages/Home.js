import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import NewCanva from "../homePage/NewCanva";
import { createNewCanvas, deleteCanvas, fetchCanvases } from "../homePage/canvaListReducer"
import { useHistory } from "react-router-dom"
import EmptyBox from "../features/EmptyBox";
import User from "../features/user/User"
import { fetchUserData } from "../features/user/userReducer";

import Container from "../ui/container/Container"
import Title from "../ui/typography/Title"
import Paper from "../ui/container/Paper"
import Button from "../ui/button/Button"
import IconButton from "../ui/button/IconButton"
import List from "../ui/list/List"
import ListItem from "../ui/list/ListItem"
import Spinner from "../ui/Spinner"

import { faTrash } from '@fortawesome/free-solid-svg-icons'

const styles = {
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
        margin: 10,
    },
    main: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
}


function Home(props) {
    const history = useHistory()

    const dispatch = useDispatch()

    const canvases = useSelector(state => state.canvases)
    const user = useSelector(state => state.user)

    const [canvasList, setCanvasList] = useState()

    const [openCanva, setOpenCanva] = useState(false)

    const createCanvas = (canvaTitle) => {
        dispatch(createNewCanvas(canvaTitle))
    }

    useEffect(() => {
        dispatch(fetchCanvases())
        dispatch(fetchUserData())
    }, [])


    useEffect(() => {
        if (Array.isArray(canvases.data)) {
            setCanvasList(
                canvases.data.map(item => {
                    return (
                        <ListItem
                            key={item._id}
                            button
                            style={{ display: "flex" }}
                        >

                            <Container onClick={() => history.push("/canvas/" + item._id)}>
                                {item.title}
                            </Container>
                            <IconButton
                                icon={faTrash}
                                onClick={() => dispatch(deleteCanvas(item._id))} />

                        </ListItem>

                    )
                })
            )
        }

    }, [canvases])

    return (
        <Container style={styles.main}>

            <Container style={{ width: "100%" }}>
                <Container style={styles.box}>
                    <User
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                    />
                </Container>

                <Container style={styles.box}>

                    <Paper >
                        {
                            canvases.fetched ?
                                <Container>{
                                    (canvases.data.length > 0) ?
                                        <List>
                                            {canvasList}
                                        </List>
                                        :
                                        <EmptyBox label="Crea una canvas per continuare" />

                                }</Container>
                                :
                                <Container class="text-center">
                                    <Spinner class="spinner-border" role="status" />

                                </Container>
                        }
                    </Paper>

                    {/* <Container>
                    <Title tag="h3">Le mie canvas</Title>
                    <List>
                        <ListItem>
                            <Paper>
                                <Title tag="h5">Titolo1</Title>
                                <List>
                                    <ListItem> <Avatar>TU</Avatar> </ListItem>
                                    <ListItem> <Avatar>TU</Avatar> </ListItem>

                                </List>
                            </Paper>
                        </ListItem>
                    </List>

                </Container>
                <Title tag="h3">Condivise con me</Title>
 */}

                    <Button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => setOpenCanva(true)}
                    >
                        Crea nuova canvas
                    </Button>
                </Container>

                <NewCanva
                    onSave={(e) => createCanvas(e)}
                    open={openCanva}
                    onClose={() => setOpenCanva(false)}
                />
            </ Container>
        </Container>
    )
}

export default Home