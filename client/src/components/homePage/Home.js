import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NewCanva from "./NewCanva";
import { createNewCanvas, deleteCanvas, fetchCanvases } from "./canvaListReducer"
import { useHistory } from "react-router-dom"
import EmptyBox from "../shared/EmptyBox";
import User from "../user/User"
import { fetchUserData } from "../user/userReducer";

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
                        <a
                            key={item._id}
                            href="#"
                            className="list-group-item d-flex justify-content-between align-items-center"
                            >
                            <div
                            onClick={() => history.push("/canvas/" + item._id)}
                            >{item.title}</div>
                            <IconButton style={{ padding: 5, marginLeft: 20 }}
                                onClick={() => dispatch(deleteCanvas(item._id))}>
                                <DeleteOutlineIcon />
                            </IconButton>


                        </a>

                    )
                })
            )
        }

    }, [canvases])

    return (
        <div className={classes.main}>
            <User
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
            />

            <div className={classes.box} >
                {
                    canvases.fetched?
                    <div>{
                        (canvases.data.length > 0) ?
                            <div className="list-group">
                                {canvasList}
                            </div>
                            :
                            <EmptyBox label="Crea una canvas per continuare" />
    
                    }</div>
                    :
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                }
               

            </div>

            <button 
                type="button" 
                class="btn btn-dark"
                onClick={() => setOpenCanva(true)}
            >
                Crea nuova canvas
            </button>

            <NewCanva
                onSave={(e) => createCanvas(e)}
                open={openCanva}
                onClose={() => setOpenCanva(false)}
            />

        </div>
    )
}

export default Home