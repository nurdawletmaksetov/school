import { useEffect, useState } from "react";
import FormClub from "./Form";
import { Flex, Loader, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "lucide-react";
import { api } from "../../../api/api";

const UpdateClub = ({ id, getClubs }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getClubById = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/clubs/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching club:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch club!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClubById();
    }, [id]);

    const updateFn = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();

            const fields = ["name", "text", "schedule"];
            const langs = ["kk", "uz", "ru", "en"];

            fields.forEach(field => {
                langs.forEach(lang => {
                    formData.append(`${field}[${lang}]`, values[field]?.[lang] || "");
                });
            });

            if (values.photo) formData.append("photo", values.photo);

            // Barcha boshqa required fieldlar
            formData.append("status", values.status || "active");
            formData.append("category", values.category || "");
            formData.append("teacher_id", values.teacher_id || "");
            formData.append("price", values.price || 0);

            // PUT methodni POST orqali yuborish
            formData.append("_method", "PUT");

            await api.post(`/clubs/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getClubs) await getClubs();
            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Club updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating club:", error);
            notifications.show({
                title: "Error",
                message: error?.response?.data?.message || "Failed to update club. Make sure all required fields are filled.",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };


    if (loading || !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormClub
            key={id}
            submitFn={updateFn}
            initialValues={{
                name: data.name || { kk: "", uz: "", ru: "", en: "" },
                text: data.text || { kk: "", uz: "", ru: "", en: "" },
                schedule: data.schedule || { kk: "", uz: "", ru: "", en: "" },
                photo: null,
            }}
        />
    );
};

export default UpdateClub;
