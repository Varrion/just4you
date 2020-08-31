import React from "react";
import {navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import GeneralPhoto from "../assets/images/generalClothing.jpg"
import {TruncatedDescription, TruncatedTitle} from "./textComponent";

function ItemCard(props) {
    return (
        <Card style={{minHeight: '450px'}}
              onClick={() => navigate(`/items/${props.id}`)}>
            <Card.Img
                style={{objectFit: 'cover'}}
                src={props.image
                    ? "data:image/jpeg;base64," + props.image
                    : GeneralPhoto}
                alt={"clothes"} width={325} height={325}/>
            <Card.Body>
                <Card.Title>{TruncatedTitle(props.title)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-left">
                    <p>price {props.price} <i className="fas fa-euro-sign"/></p></Card.Subtitle>
                <Card.Text className={"text-left"}>
                    {TruncatedDescription(props.description)}
                </Card.Text>
                <hr width="200" align="center"/>
                <Card.Subtitle
                    className="mb-2 text-muted text-left">{props.availableItems && props.availableItems <= 10
                    ? <span style={{color:'red'}}>Available: Hurry up only {props.availableItems} left </span> : <span> Available: {props.availableItems}</span> }</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default ItemCard;