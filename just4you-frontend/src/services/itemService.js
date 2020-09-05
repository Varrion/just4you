import axios from "./axios";

const itemRoute = "items"

async function GetAllItems() {
    return axios.get(itemRoute);
}

async function AddItem(itemForm) {
    return axios.post(itemRoute, itemForm);
}

async function UpdateItem(itemId, itemForm) {
    return axios.put(itemRoute + `/${itemId}`, itemForm);
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

async function DeleteItemById(itemId) {
    return axios.delete(itemRoute+ `/${itemId}`)
}

const sizesObj = {
    XXS: 1,
    XS: 2,
    S: 3,
    M: 4,
    L: 5,
    XL: 6,
    XXL: 7
}
const Sizes = Object.freeze(sizesObj);

export {
    GetAllItems,
    AddItem,
    UpdateItem,
    GetAllItemsByCategory,
    GetItemDetails,
    GetAllItemsInShoppingCart,
    SetAvailablePriceForBoughtItems,
    GetItemsOnSale,
    DeleteItemById,
    Sizes
}

