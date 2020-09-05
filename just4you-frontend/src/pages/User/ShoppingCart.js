import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import StripeCheckout from 'react-stripe-checkout';
import {GetAllItemsInShoppingCart, SetAvailablePriceForBoughtItems} from "../../services/itemService";
import {BuyItems, UpdateShoppingCart} from "../../services/customerService";
import GeneralPhoto from "../../assets/images/generalClothing.jpg";
import EmptyShoppingCart from "../../assets/images/EmptyShoppingCart.jpg";
import {Badge} from "react-bootstrap";

function ShoppingCart(props) {

    let requestPayment = {
        email: null,
        token: '',
        amount: 0,
    };

    const testObj = {};

    const publishableStripeKey = 'pk_test_51HEC03JmKKUqwZKjrfAYNzazDtlFuGUpfVNjnrKDtB2oknB8chWBeF3LyKQN4qKFLItswEn07aL0f2qCnh9itIm800HvwQsZuZ';
    const [itemsInCart, setItemsInCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deleteItem, setDeleteItem] = useState(false);
    const [user, setUser] = useState(JSON.parse(props.loggedUser));
    const [showError, setShowError] = useState([]);

    const [itemQuantity, setItemQuantity] = useState(new Map());

    useEffect(() => {
        let total = 0;
        if (user != null) {
            GetAllItemsInShoppingCart(user.username)
                .then(res => {
                    setItemsInCart(res.data)
                })
        }

        if (showError && showError.length > 0) {
            showError.forEach(item => total += item.price * item.value)
            setTotalPrice(total);
        }

        setDeleteItem(false);
    }, [deleteItem, props.loggedUser])

    const deleteItemFromShoppingCart = (itemId) => {
        UpdateShoppingCart(user.username, itemId)
            .then(() => {
                setDeleteItem(true);
                if (showError && showError.length > 0) {
                    setShowError(showError.filter(item => item.id !== itemId))
                }
            })
    }

    const generateToken = token => {
        requestPayment = {
            email: user.email,
            token: token.id,
            amount: totalPrice,
        }
        if (!showError.find(item => item.error)) {
            BuyItems(requestPayment)
                .then(() => SetAvailablePriceForBoughtItems(itemQuantity)
                    .then(() => {
                        itemQuantity.forEach((value, key) => {
                            UpdateShoppingCart(user.username, key)
                                .then(() => {
                                    setDeleteItem(true)
                                    setTotalPrice(0)
                                })
                        })
                    }))
        } else {
            alert("Resolve Errors first")
        }
    }

    const buyingItemsQuantity = (maxNumber, id, price) => event => {
        if (event.target.value > maxNumber) {
            const obj = {
                id: id,
                value: event.target.value,
                error: true,
                price: price
            }
            showError.push(obj);
        } else {
            const obj = {
                id: id,
                value: event.target.value,
                error: false,
                price: price
            }
            setItemQuantity(itemQuantity.set(id, event.target.value));
            showError.push(obj);
        }

        const filteredArr = showError.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                if (current.id === id) {
                    current.value = event.target.value;
                    current.error = event.target.value > maxNumber;
                }
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        let total = 0;

        filteredArr.forEach(item => total += item.price * item.value)
        setTotalPrice(total);
        setShowError(filteredArr)
    }

    return (
        <div className="container">
            {itemsInCart && itemsInCart.length > 0 ?
                <>
                    <h2 className={"title-font text-center mt-4"}>Shopping Cart</h2>
                    <Table className="mt-3 mb-3" responsive bordered hover>
                        <thead>
                        <tr style={{backgroundColor: "#fdfd53"}}>
                            <th>#</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price per item</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemsInCart.map((item, index) =>
                            <tr key={item.id}>
                                <td style={{fontWeight: "bold"}}>{index + 1}</td>
                                <td>
                                    <img
                                        style={{objectFit: 'cover'}}
                                        src={item.picture
                                            ? "data:image/jpeg;base64," + item.picture
                                            : GeneralPhoto}
                                        alt={"clothes"} width={65} height={60}/>
                                    <span className={"ml-2"}>{item.name}</span>
                                    {item.availableItems === 0 &&
                                    <div className={"text-center"}>
                                        <Badge variant={"danger"}>SOLD OUT</Badge>
                                    </div>}
                                </td>
                                <td>
                                    <input type={"number"}
                                           onChange={buyingItemsQuantity(item.availableItems, item.id, item.isOnSale ?
                                               item.salePrice : item.regularPrice)}
                                           max={item.availableItems}/>
                                    <br/>
                                    {showError && showError.length > 0 && showError.map(err =>
                                        err.id === item.id && err.error === true &&
                                        <small key={index + 1} style={{color: "red"}}>Only {item.availableItems} are
                                            available
                                            at
                                            the
                                            moment. </small>
                                    )}
                                </td>
                                <td>
                                    {item.isOnSale ?
                                        item.salePrice : item.regularPrice
                                    }
                                    <i className="ml-1 fa fa-euro-sign"/>
                                </td>
                                <td><Button onClick={() => deleteItemFromShoppingCart(item.id)}
                                            variant="danger">X</Button></td>
                            </tr>)}
                        <tr>
                            <td colSpan={5} className="text-center"><p>Total: {totalPrice.toFixed(2)} <i
                                className="fa fa-euro-sign"/>
                            </p></td>
                        </tr>
                        </tbody>
                    </Table>
                    {user &&
                    <div className={"mb-3 flex-justify-center"}>
                        <StripeCheckout
                            amount={totalPrice * 100}
                            email={user.email}
                            description={`Total Price to pay is ${totalPrice} EUR`}
                            name={user.name}
                            panelLabel={"Pay Now"}
                            currency="EUR"
                            label={"Pay Now"}
                            stripeKey={publishableStripeKey}
                            token={generateToken}
                        />
                    </div>}

                </> : <>
                    <h2 className={"title-font text-center mt-3"}>Your shopping cart is empty</h2>
                    <img style={{marginTop: "10px", height: "80vh", width: "inherit", objectFit: "cover"}}
                         src={EmptyShoppingCart} alt={"empty-cart"}/>

                </>}
        </div>
    )
}

export default ShoppingCart;