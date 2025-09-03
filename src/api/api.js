import axios from "axios";

export const api = axios.create({
    baseURL: "https://8742ab949e68.ngrok-free.app/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});