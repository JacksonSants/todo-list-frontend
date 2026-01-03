import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7201"
})

export default api;
