import React from "react";
import Avatar from "../../ui/Avatar"
import Container from "../../ui/container/Container"
import Title from "../../ui/typography/Title"


function User({firstName="Test", lastName="User", email="test@test.com"}) {

    return (
        <Container style={styles.main}>
            <Avatar backgroundColor="orange" size={30}>
                {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase() }
            </Avatar>
            <Title tag="h4" style={{ marginBottom: 0 }}>{firstName + " " + lastName}</Title>
            <Container>{email}</Container>
        </Container>
    )
}

const styles= {
    main: {
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}

export default User