import { http } from "../http/https";

export const adminApi = {
    getLists: async () => {
        try {
            const res = await http.get("https://d3c4e099f32e.ngrok-free.app/api/v1");
            return res.data;
        } catch (err) {
            console.error("getLists error:", err);
            throw err;
        }
    },
};