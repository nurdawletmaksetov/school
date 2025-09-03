import { http } from "../http/https";

export const adminApi = {
    getLists: async () => {
        try {
            const res = await http.get("https://bb71ff7897ee.ngrok-free.app/api/v1");
            return res.data;
        } catch (err) {
            console.error("getLists error:", err);
            throw err;
        }
    },
};