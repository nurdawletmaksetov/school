import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormValue from "./Form";

const CreateValue = ({ getValue }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();

            if (body.photo) {
                formData.append("photo", body.photo);
            }


            Object.entries(body.name).forEach(([lang, value]) => {
                formData.append(`name[${lang}]`, value);
            });

            Object.entries(body.text).forEach(([lang, value]) => {
                formData.append(`text[${lang}]`, value);
            });

            if (body.photo && body.photo.length > 0) {
                body.photo.forEach((file) => {
                    formData.append("photo", file);
                });
            }

            await api.post("/values/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "Success",
                message: "Value created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getValue) {
                getValue();
                modals.closeAll();
            }
        } catch (error) {
            console.error("Error creating Value:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create Value!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Stack>
                <FormValue
                    submitFn={createFn}
                    loading={loading}
                    initialValues={{
                        name: { kk: "", uz: "", ru: "", en: "" },
                        text: { kk: "", uz: "", ru: "", en: "" },
                        photo: [],
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateValue;
