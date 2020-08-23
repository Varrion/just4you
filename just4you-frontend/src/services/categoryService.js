import axios from "./axios";

const categoryRoute = "categories"

async function AddCategory(categoryForm) {
    return axios.post(categoryRoute, categoryForm)
}

async function GetAllCategories() {
    return axios.get(categoryRoute)
}

async function GetCategoryDetails(categoryId) {
    return axios.get(`${categoryRoute}/${categoryId}`)
}

export {AddCategory, GetAllCategories, GetCategoryDetails}