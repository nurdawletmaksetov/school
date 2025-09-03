import { createContext, useState, useEffect } from "react";
import { api } from "../api/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true); // 🔹 qo‘shildi

    async function login({ phone, password }) {
        try {
            const { data, status } = await api.post("/auth/login", { phone, password });
            if (status === 200) {
                setIsAuth(true);
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }

    async function logout(callback) {
        const token = localStorage.getItem("access_token");
        try {
            await api.post(
                "/auth/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Logout error:", error);
        }
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuth(false);
        if (callback) callback();
    }

    async function getMe() {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const { status } = await api.get("/auth/get-me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (status === 200) {
                    setIsAuth(true);
                }
            } catch (error) {
                console.error("GetMe error:", error);
                setIsAuth(false);
            }
        }
        setLoading(false); // 🔹 getMe tugagandan keyin loading=false
    }

    useEffect(() => {
        getMe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, loading, login, logout, getMe }}>
            {children}
        </AuthContext.Provider>
    );
};
