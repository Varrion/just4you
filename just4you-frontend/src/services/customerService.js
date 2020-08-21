import axios from "./axios";

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

export {RegisterUser, LoginUser, BasicAuthToken }