import axios from 'axios';

let authUser = sessionStorage.getItem('user');
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: authUser,
    }
});

export default instance;