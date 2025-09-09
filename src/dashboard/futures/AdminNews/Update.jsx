import React, { useEffect, useState } from "react";
import { Loader, Flex, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { api } from "../../../api/api";
import FormNews from "./Form";

const UpdateNews = ({ id, getNews }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchNews() {
        setLoading(true);
        try {
            const { data } = await api.get(`/news/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchNews();
    }, [id]);

    async function updateFn(body) {
        setLoading(true);
        try {
            const formData = new FormData();

            Object.keys(body.title).forEach((lang) => {
                formData.append(`title[${lang}]`, body.title[lang] || "");
            });

            Object.keys(body.short_content).forEach((lang) => {
                formData.append(`short_content[${lang}]`, body.short_content[lang] || "");
            });

            Object.keys(body.content).forEach((lang) => {
                formData.append(`content[${lang}]`, body.content[lang] || "");
            });

            if (body.author_id) {
                formData.append("author_id", body.author_id);
            }

            if (body.tags?.length) {
                body.tags.forEach((tag) => formData.append("tags[]", tag));
            }

            if (body.cover_image) {
                formData.append("cover_image", body.cover_image);
            }

            await api.post(`/news/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "✅ Success",
                message: "News updated successfully",
                color: "green",
            });

            if (getNews) await getNews();
            modals.closeAll();
        } catch (error) {
            console.error("Error updating news:", error);
            notifications.show({
                title: "❌ Error",
                message: "Could not update news",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading || !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" size="lg" />
            </Flex>
        );
    }

    return (
        <FormNews
            submitFn={updateFn}
            initialValues={{
                title: data.title || { kk: "", uz: "", ru: "", en: "" },
                short_content: data.short_content || { kk: "", uz: "", ru: "", en: "" },
                content: data.content || { kk: "", uz: "", ru: "", en: "" },
                author_id: data.author?.id?.toString() || "",
                tags: data.tags?.map((t) => t.id.toString()) || [],
                cover_image: null,
            }}
        />
    );
};

export default UpdateNews;
