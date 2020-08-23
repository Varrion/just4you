import axios from "./axios";

const itemRoute = "items"

async function GetAllItems() {
    return axios.get(itemRoute);
}

async function AddItem(itemForm) {
    return axios.post(itemRoute, itemForm);
}

const Sizes = Object.freeze({
    XXS: Symbol("xxs"),
    XS: Symbol("xs"),
    S: Symbol("s"),
    M: Symbol("m"),
    L: Symbol("l"),
    XL: Symbol("xl"),
    XXL: Symbol("xxl"),
});

export {GetAllItems, AddItem, Sizes}

