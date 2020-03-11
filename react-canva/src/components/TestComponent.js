import React, { useState, useEffect } from "react";
import Item from "./canvas/Item"
import ComponentWrapper from "./canvas/ComponentWrapper";
import { useDispatch, useSelector } from "react-redux"
import EditableInputText from "../components/editableComponents/EditableInputText"
import { Button } from "@material-ui/core";
/*
Questo componente contiene solo "spazzatura", serve per fare i test dei vari presenter
*/

function TestComponent(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            <strong>
            <EditableInputText
                value="Titolo della cosa"
                onSave={(e) => {}}
                fontSize={26}
            />
            </strong>

            <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1500 }}>

                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                </ComponentWrapper>
                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                </ComponentWrapper>
                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                </ComponentWrapper>
                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                </ComponentWrapper>
                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                </ComponentWrapper>
                <ComponentWrapper item={{ title: "Componente di test" }} >
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />
                    <Item item={{ title: "Ciao", description: "Heiiii" }} />

                </ComponentWrapper>


            </div>
            <Button color="primary" variant="contained"
            style={{margin:30}}>Aggiungi componente alla board</Button>

        </div>
    )

}

export default TestComponent