import React, { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Flex, Loader, Stack } from "@mantine/core";
import { Check, X } from "lucide-react";
import { modals } from "@mantine/modals";
import FormNews from "./Form";

const UpdateNews = ({ id, getNews }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchNewsById = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/news/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching news:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch news!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsById();
    }, [id]);

    const updateFn = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();

            ["en", "ru", "uz", "kk"].forEach((lang) => {
                formData.append(`title[${lang}]`, values.title[lang]);
                formData.append(`short_content[${lang}]`, values.short_content[lang]);
                formData.append(`content[${lang}]`, values.content[lang]);
            });

            if (values.cover_image instanceof File) {
                formData.append("cover_image", values.cover_image);
            }

            if (values.author_id) {
                formData.append("author_id", Number(values.author_id));
            }

            if (values.tags?.length) {
                values.tags.forEach((tagId) =>
                    formData.append("tags[]", Number(tagId))
                );
            }

            formData.append("_method", "PUT");

            await api.post(`/news/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getNews) {
                await getNews();
                modals.closeAll();
            }

            notifications.show({
                title: "Success",
                message: "News updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating news:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update news!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" size="lg" />
            </Flex>
        );
    }

    return (
        <Stack>
            <FormNews
                submitFn={updateFn}
                initialValues={{
                    title: {
                        en: data.title?.en || "",
                        ru: data.title?.ru || "",
                        uz: data.title?.uz || "",
                        kk: data.title?.kk || "",
                    },
                    short_content: {
                        en: data.short_content?.en || "",
                        ru: data.short_content?.ru || "",
                        uz: data.short_content?.uz || "",
                        kk: data.short_content?.kk || "",
                    },
                    content: {
                        en: data.content?.en || "",
                        ru: data.content?.ru || "",
                        uz: data.content?.uz || "",
                        kk: data.content?.kk || "",
                    },
                    cover_image: null, // yangi fayl tanlansa
                    author_id: data.author?.id?.toString() || "",
                    tags: data.tags?.map((t) => t.id.toString()) || [],
                }}
            />
        </Stack>
    );
};

export default UpdateNews;
