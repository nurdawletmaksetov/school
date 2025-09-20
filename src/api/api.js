import axios from "axios";

export const api = axios.create({
    baseURL: "https://induction-cameron-matching-disabilities.trycloudflare.com/api/v1",
    headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
    validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 204;
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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");

                if (!refreshToken) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                const { data } = await axios.post(
                    "https://induction-cameron-matching-disabilities.trycloudflare.com/api/v1/refresh",
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );

                const newAccess = data.data.access_token;
                const newRefresh = data.data.refresh_token;

                localStorage.setItem("access_token", newAccess);
                localStorage.setItem("refresh_token", newRefresh);

                api.defaults.headers.Authorization = "Bearer " + newAccess;
                originalRequest.headers.Authorization = "Bearer " + newAccess;

                processQueue(null, newAccess);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
