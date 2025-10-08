import axios from 'axios';

const API = axios.create({
    baseURL : 'http://localhost:8080/api'
})

API.interceptors.request.use((config) => {
        const stored = localStorage.getItem("pocBanti");
        const token = stored ? JSON.parse(stored).token : null;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;