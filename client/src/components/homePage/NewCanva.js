import React, { useState } from "react";

import Input from "../ui/input/Input"
import Title from "../ui/typography/Title"
import Container from "../ui/container/Container"
import Button from "../ui/button/Button"
import MyDialog from "../ui/modal/MyDialog"
import MyDialogContent from "../ui/modal/MyDialogContent"

function NewCanva({
    onSave,
    open,
    onClose
}) {

    const [value, setValue] = useState("")

    return (

        <MyDialog
            open={open}
            onClose={
                () => {
                    onClose();
                    setValue("")
                }
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <MyDialogContent>
                <Container >
                    <Title tag="h3">Titolo della Canvas</Title>

                    <Input
                        type="text" class="form-control"
                        placeholder="Titolo" aria-label="Titolo"
                        aria-describedby="basic-addon1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                </Container>

                <Container style={{ margin: 20 }}>
                    <Button onClick={
                        () => {
                            onClose();
                            setValue("")
                        }
                    } color="primary"
                        type="button" class="btn btn-secondary"
                        style={{ marginRight: 20 }}>
                        Annulla
                </Button>
                    <Button onClick={() => {
                        onSave(value)
                        setValue("")
                        onClose()
                    }}
                        type="button" class="btn btn-primary"
                    >
                        Salva
                </Button>
                </Container>

            </MyDialogContent>

        </MyDialog>
    )
}

export default NewCanva