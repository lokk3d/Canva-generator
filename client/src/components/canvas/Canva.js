import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Button, ListItem, List } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import ComponentWrapper from "./ComponentWrapper"
import EmptyBox from "../shared/EmptyBox";


const useStyles = makeStyles(theme => ({
    box: {
        borderRadius: 5,
        padding: 10,
        margin: 10,
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff"
    },
    list:{
        display: "flex",
        flexWrap: "wrap",
        flexDirection:"row"
    },
    listItem:{
        width:"auto",
        height:"100%",
        padding:0
    }

}));

function Canva({
    components = [],
    onUpdate = (obj)=>{console.log(obj)}
}) {
    const classes = useStyles();

    const [componentsList, setComponentsList] = useState()


    const replaceUpdatedComponent = (component) =>{
        let newData = []
        components.forEach(element => {
            if(component._id === element._id){
                newData.push(component)
            }else{
                newData.push(element)
            }
        });
        onUpdate(newData)
    }

    const deleteComponent = (componentId) => {
        onUpdate(components.filter(data => data._id !== componentId))
    }

    useEffect(() => {
        setComponentsList(
            components.map(item => {
                return (
                    <ListItem key={item._id} className={classes.listItem}>

                        <ComponentWrapper 
                            component={{ title: item.title, _id: item._id, items: item.items }} 
                            onDelete={(e)=> deleteComponent(e)}
                            onUpdate={e => replaceUpdatedComponent(e) }
                        />

                    </ListItem>
                )
            })
        )
    }, [components])

    return (
        <React.Fragment>

            <div className={classes.box}>
                {
                    (components.length > 0) ?
                        <List className={classes.list}>
                            {componentsList}
                        </List>
                        :
                        <EmptyBox label="Aggiungi una board al canva"/>
                }

            </div>


        </React.Fragment>
    )
}
export default Canva    