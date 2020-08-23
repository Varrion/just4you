import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {Link, navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import {BasicAuthToken, LoginUser} from "../../services/customerService";

function Login(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        LoginUser(user)
            .then(res => {
                sessionStorage.setItem("credentials", BasicAuthToken(user.username, user.password))
                sessionStorage.setItem("userData", JSON.stringify(res.data))
                navigate("/").then(() => window.location.reload());
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="flex-column-center full-height login-background">
            <Card style={{width: '450px', border: 'dashed', height: '510px'}}>
                <Card.Body className={"flex-column-center"}>
                    <h2 className="title-font mb-3">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="far fa-user"/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control placeholder="Username"
                                              value={user.username} onChange={handleChange("username")}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formUserPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                              placeholder="UtEc56d2XY..."/>
                            </InputGroup>
                        </Form.Group>

                        <div className={"d-flex flex-column align-items-center"}>
                            <Button type="submit" className={"mb-3"}>
                                Login
                            </Button>
                            <p>Don't have an Account? <Link to={"/register"}> Register now </Link></p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login