import axios from "./axios";
import {navigate} from "@reach/router";

const customerRoute = "customers";

async function RegisterUser(formData) {
    return axios.post(customerRoute + "/register", formData)
}

async function LoginUser(user) {
    return axios.post(customerRoute + "/login", user);
}

const BasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password)
}

const GetUsername = authUser => {
    let encodedUser = authUser.split(" ")[1];
    let encodedString = atob(encodedUser);
    return encodedString.split(":")[0]
}

const LogoutUser = (setLoggedUser) => {
    sessionStorage.removeItem("credentials");
    sessionStorage.removeItem("userData");
    setLoggedUser(null);
    navigate("/")
        .then(() => window.location.reload())
};

export {RegisterUser, LoginUser, BasicAuthToken, GetUsername, LogoutUser}