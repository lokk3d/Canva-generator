import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import { Button } from "@material-ui/core";

function ManualRedirectLogin(props){
    const history = useHistory()
    history.push("/app")
    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:80}}>
            <Button 
                variant="contained"
                color="primary"
                onClick={()=>history.push("/app")}
            >Accedi all'applicazione</Button>
            
        </div>
    )
}

export default ManualRedirectLogin