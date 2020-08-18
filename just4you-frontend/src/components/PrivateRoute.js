import React from "react";
import {Redirect} from "@reach/router";
import {AuthContext} from "../auth/AuthContext";


function PrivateRoute(props) {
    let {component: Component, ...otherProps} = props;

    return (
        <AuthContext.Consumer>
            {({authUser}) =>
                authUser && authUser.user ? <Component {...otherProps} /> : <Redirect to={"/login"} noThrow/>
            }
        </AuthContext.Consumer>
    )
}

export default PrivateRoute;