import React, { useState, useEffect } from "react";
import { Avatar, List, ListItem, Button, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NewCanva from "./NewCanva";
import { createNewCanva, deleteCanva, fetchCanvas } from "./canvaListReducer"
import { useHistory } from "react-router-dom"
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EmptyBox from "../shared/EmptyBox";

const useStyles = makeStyles(theme => ({

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    box: {
        borderRadius: 5,
        padding: 10,
        margin: 10,
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff"
    },
    entireRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    personBox: {

    },
    main: {
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));


function Home(props) {
    const classes = useStyles();
    const history = useHistory()

    const dispatch = useDispatch()

    const canvas = useSelector(state => state.canvas)
    const [canvasList, setCanvasList] = useState()

    const [openCanva, setOpenCanva] = useState(false)

    const createCanva = (canvaTitle) => {
        dispatch(createNewCanva(canvaTitle))
    }

    useEffect(() => {
        dispatch(fetchCanvas())
    }, [])


    useEffect(() => {
        if (Array.isArray(canvas.data)) {
            setCanvasList(
                canvas.data.map(item => {
                    return (
                        <ListItem
                            button
                            key={item._id}
                            className={classes.entireRow}
                            onClick={() => history.push("/canvas/" + item._id)}>
                            <div>{item.title}</div>
                            <ListItemSecondaryAction>
                                <IconButton style={{ padding: 5 }}
                                    onClick={() => dispatch(deleteCanva(item._id))}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    )
                })
            )
        }

    }, [canvas])

    return (
        <div className={classes.main}>
            <div className={classes.main}>
                <Avatar className={classes.orange}>NC</Avatar>
                <h3>Nome e cognome</h3>
            </div>

            <div className={classes.box} style={{ minWidth: 400 }}>
                {
                    (canvas.data.length > 0)?
                    <List>
                        {canvasList}
                    </List>
                    :
                    <EmptyBox label="Crea un nuovo canva per continuare"/>

                }
                
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCanva(true)}
            >
                Crea nuovo canva
            </Button>

            <NewCanva
                onSave={(e) => createCanva(e)}
                open={openCanva}
                onClose={() => setOpenCanva(false)}
            />

        </div>
    )
}

export default Home