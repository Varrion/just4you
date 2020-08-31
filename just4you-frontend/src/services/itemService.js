import axios from "./axios";

const itemRoute = "items"

async function GetAllItems() {
    return axios.get(itemRoute);
}

async function AddItem(itemForm) {
    return axios.post(itemRoute, itemForm);
}

async function GetAllItemsByCategory(categoryId) {
    return axios.get(`${itemRoute}/category/${categoryId}`);
}

async function GetItemDetails(itemId) {
    return axios.get(`${itemRoute}/${itemId}`)
}

async function GetAvailableSizesForItem(itemId) {
    return axios.get(`${itemRoute}/${itemId}/sizes`)
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

export {GetAllItems, AddItem, GetAllItemsByCategory, GetItemDetails, Sizes}

