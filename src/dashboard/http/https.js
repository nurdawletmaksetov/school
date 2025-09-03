import axios from "axios";

export const http = axios.create({
    baseURL: "https://schoolapp.serveo.net",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});
