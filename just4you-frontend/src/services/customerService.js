import axios from "./axios";
import {navigate} from "@reach/router";

const customerRoute = "customers";

async function RegisterUser(formData) {
    return axios.post(customerRoute + "/register", formData)
}

async function LoginUser(user) {
    return axios.post(customerRoute + "/login", user);
}

async function DeactivateAccount(username) {
    return axios.delete(customerRoute + `/${username}`)
}

async function UpdateProfile(username, formData) {
    return axios.put(customerRoute + `/${username}`, formData)
}

async function UpdateShoppingCart(username, itemId) {
    return axios.put(customerRoute + `/${username}/cart`, null, {
        params: {
            itemId: itemId
        }
    })
}

async function BuyItems(paymentInfo) {
    return axios.post(customerRoute + "/payment", paymentInfo)
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
        .then(() => {
            window.location.reload();
            alert("logged out successfully");
        })
};


export {
    RegisterUser,
    LoginUser,
    BasicAuthToken,
    GetUsername,
    LogoutUser,
    DeactivateAccount,
    UpdateProfile,
    UpdateShoppingCart,
    BuyItems
}