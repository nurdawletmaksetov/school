import { useState } from "react";
import FormClub from "./Form";
import { Flex, Loader, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import { api } from "../../../api/api";
import { modals } from "@mantine/modals";

const CreateClub = ({ getClubs }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (values) => {
        setLoading(true);
        try {
            if (!values.photo) {
                notifications.show({
                    title: "Error",
                    message: "Photo is required!",
                    color: "red",
                    icon: <X />,
                });
                return;
            }

            const formData = new FormData();
            formData.append("name[kk]", values.name.kk);
            formData.append("name[uz]", values.name.uz);
            formData.append("name[ru]", values.name.ru);
            formData.append("name[en]", values.name.en);

            formData.append("text[kk]", values.text.kk);
            formData.append("text[uz]", values.text.uz);
            formData.append("text[ru]", values.text.ru);
            formData.append("text[en]", values.text.en);

            formData.append("schedule[kk]", values.schedule.kk);
            formData.append("schedule[uz]", values.schedule.uz);
            formData.append("schedule[ru]", values.schedule.ru);
            formData.append("schedule[en]", values.schedule.en);

            formData.append("photo", values.photo);

            await api.post("/clubs/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getClubs) {
                await getClubs();
                modals.closeAll();
            }

            notifications.show({
                title: "Success",
                message: "Club created successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error creating club:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create club!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormClub
            submitFn={createFn}
            loading={loading}
            initialValues={{
                name: { kk: "", uz: "", ru: "", en: "" },
                text: { kk: "", uz: "", ru: "", en: "" },
                schedule: { kk: "", uz: "", ru: "", en: "" },
                photo: null
            }}
        />
    );
};

export default CreateClub;
