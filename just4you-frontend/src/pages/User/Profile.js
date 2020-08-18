import React, {useEffect, useState} from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function Profile(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`user/${props.username}`)
            .then(res => {
                setUser(res.data);
                if (!res.data.isInstructor) {
                    axios.get(`user/${props.username}/owned-courses`)
                        .then()
                        .catch(err => console.log(err))
                } else {
                    axios.get(`courses/instructor/${props.username}`)
                        .then()
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }, [props.location.state.loggedUser, props.username])

    return (
        <div>
            {user && <div className="container">
                <h1 className={"title-font"}>User Details</h1>
                <Card className={"rounded-content"}>
                    <div className="row">
                        <div className="col-md-5">
                            <Card.Img src={user.picture ? "data:image/jpeg;base64," + user.picture : null}
                                      alt="user"
                                      width={380}
                                      height={500}
                                      style={{padding: '15px'}}
                                      className="rounded-content"/>
                        </div>

                        <div id="userDetails" className="height-inherit col-md-7 card-vertical-line flex-center-column">
                            <h4> {user.name + " " + user.surname}</h4>
                            {user.isInstructor && <p><Badge variant="info">Instructor</Badge></p>}
                            <p>
                                <small><cite title="San Francisco, USA">Skopje, Macedonia <i
                                    className="fa fa-map-marker">
                                </i></cite></small>
                            </p>
                            <p><i className="fa fa-envelope-square"/> <a href={user.email}> {user.email} </a></p>
                            <p><i className="fas fa-user-tag"/> {user.username}</p>
                            <p><i className="far fa-calendar-alt"/> June 02, 1988</p>
                        </div>
                    </div>
                </Card>
            </div>}
        </div>
    )
}

export default Profile;