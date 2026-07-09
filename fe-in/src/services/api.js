import axios from "axios";

const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null;

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
});

export default api;