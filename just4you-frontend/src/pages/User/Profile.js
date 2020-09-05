import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {Button} from "react-bootstrap";
import {navigate} from "@reach/router";
import {DeactivateAccount} from "../../services/customerService";
import UpdateProfileModal from "../../components/UpdateProfileModal";
import DefaultPicture from '../../assets/images/anonymous-user.png';

function Profile(props) {

    const [user, setUser] = useState(null);
    const [userModal, setUserModal] = useState(false);

    useEffect(() => {
        if (props.loggedUser) {
            setUser(JSON.parse(props.loggedUser));
        }
    }, [props.loggedUser])

    const deactivateUser = username => {
        DeactivateAccount(username)
            .then(() => {
                sessionStorage.removeItem("credentials");
                sessionStorage.removeItem("userData");
                navigate("/")
                    .then(() => alert("You have deactivated your account successfully"))
            })
    }

    return (
        <>
            {user && <div className="container">
                <h1 className={"title-font text-center mt-4"}>User Details</h1>
                <Card className={"rounded-content"}>
                    <div className="row">
                        <div className="col-md-5">
                            <Card.Img src={user.picture ? "data:image/jpeg;base64," + user.picture : DefaultPicture}
                                      alt="user"
                                      width={380}
                                      height={500}
                                      style={{padding: '15px', objectFit: 'cover'}}
                                      className="rounded-content"/>
                        </div>
                        <div id="userDetails" style={{position: "relative"}}
                             className="height-inherit col-md-7 flex-center-column mt-3">
                            <h4> {user.name + " " + user.surname}</h4>
                            {user.isSeller && <p><Badge variant="info">Seller</Badge></p>}
                            <p>
                                <small><cite title="San Francisco, USA">Skopje, Macedonia <i
                                    className="fa fa-map-marker">
                                </i></cite></small>
                            </p>
                            <p><i className="fa fa-envelope-square"/> <a href={user.email}> {user.email} </a></p>
                            <p><i className="fas fa-user-tag"/> {user.username}</p>
                            <p><i className="fas fa-user-tag"/> {user.address}</p>
                            <p><i className="fas fa-user-tag"/> {user.city}</p>
                            <div className={"card-details-bottom"}>
                                <Button className={"mr-3"} variant="warning" style={{color: "white"}}
                                        onClick={() => setUserModal(true)}>Update Info</Button>
                                <Button variant="danger" onClick={() => deactivateUser(user.username)}>Deactivate
                                    Account</Button>
                            </div>
                        </div>
                    </div>
                </Card>
                <UpdateProfileModal show={userModal} setShow={setUserModal} user={user}/>
            </div>}
        </>
    )
}

export default Profile;