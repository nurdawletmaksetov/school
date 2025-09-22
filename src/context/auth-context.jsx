import { createContext, useState, useEffect } from "react";
import { api } from "../api/api";
import * as apiRoutes from '../constants/apiRoutes'
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    async function login({ phone, password }) {
        try {
            const { data, status } = await api.post(apiRoutes.AUTH_LOGIN_API, { phone, password });
            if (status === 200) {
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);

                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.data.access_token}`;

                setIsAuth(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }

    async function logout(callback) {
        try {
            await api.post(apiRoutes.AUTH_LOGOUT_API);
        } catch (error) {
            console.error("Logout error:", error);
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        delete api.defaults.headers.common["Authorization"];

        setIsAuth(false);

        if (callback) {
            callback();
        } else {
            window.location.href = "/login";
        }
    }

    async function getMe() {
        try {
            const { status } = await api.get("/auth/get-me");
            if (status === 200) {
                setIsAuth(true);
            }
        } catch (error) {
            console.error("GetMe error:", error);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            getMe();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, loading, login, logout, getMe }}>
            {children}
        </AuthContext.Provider>
    );
};
