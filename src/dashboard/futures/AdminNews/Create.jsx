import React, { useState } from "react";
import { Loader, Flex, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { api } from "../../../api/api";
import FormNews from "./Form";

const CreateNews = ({ getNews }) => {
    const [loading, setLoading] = useState(false);

    async function createFn(body) {
        setLoading(true);
        try {
            const formData = new FormData();

            ["kk", "uz", "ru", "en"].forEach((lang) => {
                formData.append(`title[${lang}]`, body.title[lang] || "");
                formData.append(`short_content[${lang}]`, body.short_content[lang] || "");
                formData.append(`content[${lang}]`, body.content[lang] || "");
            });

            if (body.author_id) {
                formData.append("author_id", Number(body.author_id));
            }

            if (body.tags?.length) {
                body.tags.forEach((tag) => formData.append("tags[]", Number(tag)));
            }

            if (body.cover_image) {
                formData.append("cover_image", body.cover_image);
            }

            await api.post("/news/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "✅ Success",
                message: "News created successfully",
                color: "green",
            });

            if (getNews) await getNews();
            modals.closeAll();
        } catch (error) {
            console.error("Error creating news:", error);
            notifications.show({
                title: "❌ Error",
                message: "Could not create news",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack style={{ minHeight: "300px", justifyContent: "center" }}>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (
                <FormNews
                    submitFn={createFn}
                    initialValues={{
                        title: { kk: "", uz: "", ru: "", en: "" },
                        short_content: { kk: "", uz: "", ru: "", en: "" },
                        content: { kk: "", uz: "", ru: "", en: "" },
                        author_id: "",
                        tags: [],
                        cover_image: null,
                    }}
                />
            )}
        </Stack>
    );
};

export default CreateNews;
