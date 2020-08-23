import axios from 'axios';

const credentials = sessionStorage.getItem('credentials');

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: credentials,
    }
});

export default instance;