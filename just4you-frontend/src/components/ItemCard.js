import React from "react";
import {navigate} from "@reach/router";
import Card from "react-bootstrap/Card";

function ItemCard(props) {
    return (
        <>
            <Card style={{minHeight:'460px'}}
                  onClick={() => navigate(`/items/${props.id}`, {state: {loggedUser: props.loggedUser}})}>
                {/*<Card.Img src={CourseLogo} alt={"courses"} className="rounded-content"/>*/}
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-left">
                        <p>by {props.price}</p></Card.Subtitle>
                    <Card.Text className={"text-left"}>
                        {props.title}
                    </Card.Text>
                    <hr width="200" align="center"/>
                    <Card.Subtitle
                        className="mb-2 text-muted text-left">category: {props.category}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    )
}

export default ItemCard;