import React, { useState } from "react";
import { Flex, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications"; 
import { Check, X } from "tabler-icons-react";
import FormAlbum from "./Form";
import { api } from "../../../api/api";

const CreateAlbum = ({ getAlbums }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set("title[kk]", body.kk);
            formData.set("title[uz]", body.uz);
            formData.set("title[ru]", body.ru);
            formData.set("title[en]", body.en);

            if (Array.isArray(body.photos)) {
                body.photos.forEach((file) => {
                    formData.append("photos[]", file);
                });
            }

            await api.post("/albums/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "Success",
                message: "✅ Album created successfully",
                color: "teal",
                icon: <Check />,
            });

            if (getAlbums) await getAlbums();
            modals.closeAll();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "❌ Could not create album",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack style={{ minHeight: "300px", justifyContent: "center" }}>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (
                <FormAlbum
                    submitFn={createFn}
                    initialValues={{ kk: "", uz: "", ru: "", en: "", photos: [] }}
                />
            )}
        </Stack>
    );
};

export default CreateAlbum;
