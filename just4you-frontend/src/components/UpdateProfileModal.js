import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {BasicAuthToken, UpdateProfile} from "../services/customerService";

function UpdateProfileModal(props) {

    const [user, setUser] = useState(props.user ?? null);
    const [userPhoto, setUserPhoto] = useState(props.user?.picture)

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("customerDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("customerPicture", userPhoto);

        UpdateProfile(user.username, formData)
            .then(res => {
                sessionStorage.clear();
                sessionStorage.setItem("credentials", BasicAuthToken(user.username, user.password))
                sessionStorage.setItem("userData", JSON.stringify(res.data))
                window.location.reload();
            })
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Change details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formUserFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={user?.name} onChange={handleChange("name")} type="text"
                                          placeholder="Enter your first name"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUserLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={user?.surname} onChange={handleChange("surname")} type="text"
                                          placeholder="Enter your last name"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={user?.password} onChange={handleChange("password")} type="password"
                                      placeholder="We recommend using strong password for your safety"/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={user?.email} onChange={handleChange("email")} type="email"
                                      placeholder="Enter your email address"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formUserAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={user?.address} onChange={handleChange("address")} type="text"
                                          placeholder="Enter your address"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUserCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={user?.city} onChange={handleChange("city")} type="text"
                                          placeholder="Enter your city"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.File id="formCustomerPicture" onChange={handleDrop} label="Photo"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateProfileModal;