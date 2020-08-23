import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import {Link, navigate} from "@reach/router";

function ShoppingCart(props) {

    const publishableStripeKey = 'pk_test_51HEC03JmKKUqwZKjrfAYNzazDtlFuGUpfVNjnrKDtB2oknB8chWBeF3LyKQN4qKFLItswEn07aL0f2qCnh9itIm800HvwQsZu';

    const [coursesInShoppingCart, setCoursesInShoppingCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deleteCourse, setDeleteCourse] = useState(false);

    let requestPayment = {};

    if (props.loggedUser) {
        requestPayment = {
            customerId: props.loggedUser.id,
            email: props.loggedUser.email,
            token: '',
            amount: totalPrice,
        }
    }

    const generateToken = token => {
        requestPayment.token = token.id;
        axios.post("user/payment", requestPayment)
            .then(() => navigate(`/user/${props.loggedUser.username}`))
    }

    useEffect(() => {
        let total = 0;
        axios.get(`courses/cart/${props.userId}`)
            .then(res => {
                let data = res.data;
                setCoursesInShoppingCart(data);
                data.forEach(course => {
                    total += course.price;
                });
                setTotalPrice(total);
            })
            .catch(err => console.log(err))
        setDeleteCourse(false);
    }, [deleteCourse, props.loggedUser])

    const deleteCourseFromCart = course => {
        axios.put(`user/${props.userId}/cart`, course)
            .then(() => {
                setDeleteCourse(true);
            })
    }

    return (
        <div className="container containerDiv">
            {coursesInShoppingCart && coursesInShoppingCart.length ?
                <>
                    <h2>Shopping Cart</h2>
                    <Table className="mt-3 mb-3" responsive bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Course Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coursesInShoppingCart.map((course, index) =>
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.name}</td>
                                <td>{course.price !== 0 ? course.price : "FREE"}</td>
                                <td><Button onClick={() => deleteCourseFromCart(course)} className="rounded-content"
                                            variant="danger">Remove from cart</Button></td>
                            </tr>)}
                        <tr>
                            <td colSpan={4} className="text-right"><p>Total: {totalPrice.toFixed(2)} <i
                                className="fa fa-euro-sign"/>
                            </p></td>
                        </tr>
                        </tbody>
                    </Table>
                    {props.loggedUser && <StripeCheckout
                        className={"mb-3"}
                        amount={totalPrice * 100}
                        email={props.loggedUser.email}
                        description={`Total Price to pay is ${totalPrice} EUR`}
                        name={props.loggedUser.name}
                        panelLabel={"Pay Now"}
                        currency="EUR"
                        label={"Pay Now"}
                        stripeKey={publishableStripeKey}
                        token={generateToken}
                    />}

                </> : <div>
                    <p>
                        Go to <Link to={"/courses"}>courses </Link>
                        to make a purchase
                    </p>
                </div>}
        </div>
    )
}

export default ShoppingCart;