import React, {useEffect, useState} from "react";
import {GetItemDetails, Sizes} from "../../services/itemService";
import Form from "react-bootstrap/Form";
import GeneralPhoto from "../../assets/images/generalClothing.jpg"
import Button from "react-bootstrap/Button";
import {Card} from "react-bootstrap";
import {UpdateShoppingCart} from "../../services/customerService";

function ItemDetails(props) {
    const [user, setUser] = useState(JSON.parse(props.loggedUser))
    const [item, setItem] = useState(null);
    const [addedToShoppingCart, setAddedToShoppingCart] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        GetItemDetails(props.itemId)
            .then(res => setItem(res.data))
    }, [props.loggedUser, addedToShoppingCart])

    const addToShoppingCart = itemId => {
        UpdateShoppingCart(user.username, itemId)
            .then(() => setAddedToShoppingCart(true))
    }

    return (
        <div className={"container-fluid mt-3"}>
            {item && <Card className={"card-details"}>
                <Card.Body>
                    <div className={"row"}>

                        <div className={"col-md-5"} style={{height: "85vh"}}>
                            <img style={{height: "inherit", width: "inherit", objectFit: 'cover'}} src={item.picture
                                ? "data:image/jpeg;base64," + item.picture
                                : GeneralPhoto} alt={"cloth"}/>
                        </div>

                        <div className={"col-md-5 details-content"}
                             style={{paddingLeft: "50px"}}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>
                                <span>Regular Price </span>
                                <span className={item.isOnSale && "striked-text"}>
                            {item.regularPrice} <i className="fas fa-euro-sign"/>
                        </span>
                            </p>
                            {item.isOnSale && <div>
                                <p style={{color: "red"}}>Sale Price {item.salePrice} <i className="fas fa-euro-sign"/>
                                </p>
                                <p style={{color: "red"}}> Sale period
                                    from {item.saleStartDate} to {item.saleEndDate}</p>
                            </div>}
                            <p>{item.availableItems > 0
                                ? "Items left " + item.availableItems
                                : <span style={{color:"red"}}>No items available !</span>}</p>
                            <span>Sizes available: </span>
                            {Object.keys(Sizes).map((size, index) =>
                                <Form.Check
                                    key={index + 1}
                                    custom
                                    inline
                                    disabled
                                    label={size}
                                    checked={item.sizes.find(name => name === size)}
                                    id={index + 1}
                                    type={"checkbox"}
                                />
                            )}
                            <div>
                                {user && !user.isSeller ?
                                    <Button onClick={() => addToShoppingCart(item.id)}>Add to cart</Button>
                                    : <Button onClick={() => setShowUpdateModal(true)}>Edit Item</Button>
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>}
        </div>
    )
}

export default ItemDetails;