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

async function GetAllItemsInShoppingCart(username) {
    return axios.get(itemRoute + `/${username}/cart`)
}

async function SetAvailablePriceForBoughtItems(itemMap) {
    const convMap = {};
    itemMap.forEach((val, key) => {
        convMap[key] = val;
    });

    return axios.put(itemRoute + "/available-items", convMap)
}

async function GetItemsOnSale(onSale) {
    return axios.get(itemRoute, {
        params: {
            isOnSale: onSale
        }
    })
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

export {
    GetAllItems,
    AddItem,
    GetAllItemsByCategory,
    GetItemDetails,
    GetAllItemsInShoppingCart,
    SetAvailablePriceForBoughtItems,
    GetItemsOnSale,
    Sizes
}

