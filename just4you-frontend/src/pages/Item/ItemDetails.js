import React, {useEffect, useState} from "react";
import {DeleteItemById, GetAllItemsInShoppingCart, GetItemDetails, Sizes} from "../../services/itemService";
import Form from "react-bootstrap/Form";
import GeneralPhoto from "../../assets/images/generalClothing.jpg"
import Button from "react-bootstrap/Button";
import {Card} from "react-bootstrap";
import {UpdateShoppingCart} from "../../services/customerService";
import ItemModal from "../../components/ItemModal";

function ItemDetails(props) {
    const [user, setUser] = useState(JSON.parse(props.loggedUser))
    const [item, setItem] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isItemInCart, setIsItemInCart] = useState(false);

    useEffect(() => {
        GetItemDetails(props.itemId)
            .then(res => {
                const foundItem = res.data;
                setItem(foundItem);
                GetAllItemsInShoppingCart(user.username)
                    .then(res => res.data.find(cartItem => cartItem.id === foundItem.id && setIsItemInCart(true)))
            })
    }, [props.loggedUser, showUpdateModal, isItemInCart])

    const addToShoppingCart = itemId => {
        UpdateShoppingCart(user.username, itemId)
            .then(() => setIsItemInCart(true))
    }

    const deleteItem = itemId => {
        DeleteItemById(itemId)
            .then(() => window.history.back())
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
                                <span className={item.isOnSale ? "striked-text" : null}>
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
                                : <span style={{color: "red"}}>No items available !</span>}</p>
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
                                {user && !user.isSeller
                                    ? !isItemInCart
                                        ? <Button onClick={() => addToShoppingCart(item.id)}>Add to cart</Button>
                                        :
                                        <p style={{color: "green", fontStyle: "italic"}}>{item.name} is already in your
                                            shopping cart</p>
                                    : <div>
                                        <Button className={"mr-4"} onClick={() => setShowUpdateModal(true)}>Edit
                                            Item</Button>
                                        <Button variant={"danger"} onClick={() => deleteItem(item.id)}>Delete
                                            Item</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>

                <ItemModal show={showUpdateModal} setShow={setShowUpdateModal} item={item}/>
            </Card>}
        </div>
    )
}

export default ItemDetails;