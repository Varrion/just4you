import Form from 'react-bootstrap/Form'
import React, {useState} from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function Register() {

    const initialUser = {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        city: '',
        isSeller: false
    }

    const [user, setUser] = useState(initialUser);

    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        if (name !== "isSeller") {
            setUser({...user, [name]: event.target.value});
        } else {
            setUser({...user, [name]: event.target.checked});
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userPhoto", userPhoto);
        formData.append("userData", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));

        axios.post("user", formData)
            .then(() => {
                navigate("/login");
                setUserPhoto(null);
                setUser(initialUser);
            })
            .catch(err => console.log(err))
    };


    return (
        <div className="flex-column-center full-height login-background">
            <Card style={{width: '720px', border: 'dashed'}}>
                <Card.Body className={"flex-column-center"}>
                    <h2 className="title-font mb-4">Register</h2>
                    <Form onSubmit={handleSubmit} style={{width: '-webkit-fill-available'}}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formUserFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control value={user.name} onChange={handleChange("name")} type="text"
                                              placeholder="Enter your first name"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formUserLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control value={user.surname} onChange={handleChange("surname")} type="text"
                                              placeholder="Enter your last name"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={user.username} onChange={handleChange("username")} type="text"
                                          placeholder="Enter your username"/>
                        </Form.Group>

                        <Form.Group controlId="formUserPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                          placeholder="We recommend using strong password for your safety"/>
                        </Form.Group>

                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={user.email} onChange={handleChange("email")} type="email"
                                          placeholder="Enter your email address"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formUserAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control value={user.address} onChange={handleChange("address")} type="text"
                                              placeholder="Enter your address"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formUserCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control value={user.city} onChange={handleChange("city")} type="text"
                                              placeholder="Enter your city"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formIsSeller">
                            <Form.Check value={user.isSeller} onChange={handleChange("isSeller")}
                                        type="switch"
                                        label="Seller"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.File id="formCustomerPicture" onChange={handleDrop} label="Photo"/>
                        </Form.Group>
                        <div className="row justify-content-center">
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Register