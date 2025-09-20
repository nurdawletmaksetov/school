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

            formData.append("title[kk]", body.title.kk);
            formData.append("title[uz]", body.title.uz);
            formData.append("title[ru]", body.title.ru);
            formData.append("title[en]", body.title.en);

            formData.append("short_content[kk]", body.short_content.kk);
            formData.append("short_content[uz]", body.short_content.uz);
            formData.append("short_content[ru]", body.short_content.ru);
            formData.append("short_content[en]", body.short_content.en);

            formData.append("content[kk]", body.content.kk);
            formData.append("content[uz]", body.content.uz);
            formData.append("content[ru]", body.content.ru);
            formData.append("content[en]", body.content.en);

            if (body.author_id) {
                formData.append("author_id", body.author_id);
            }

            if (body.tags?.length) {
                body.tags.forEach((tag) => formData.append("tags[]", tag));
            }

            if (body.cover_image) {
                formData.append("cover_image", body.cover_image);
            }

            await api.post("/news/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "Success",
                message: "News created successfully",
                color: "green",
            });

            if (getNews) await getNews();
            modals.closeAll();
        } catch (error) {
            console.error("Error creating news:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Could not create news",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <Stack style={{ minHeight: "300px", justifyContent: "center" }}>
            <FormNews
                submitFn={createFn}
                loading={loading}
                initialValues={{
                    title: { kk: "", uz: "", ru: "", en: "" },
                    short_content: { kk: "", uz: "", ru: "", en: "" },
                    content: { kk: "", uz: "", ru: "", en: "" },
                    author_id: "",
                    tags: [],
                    cover_image: null,
                }}
            />
        </Stack>
    );
};

export default CreateNews;
