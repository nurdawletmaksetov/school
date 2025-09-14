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
            not("Error fetching news:", error);
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

    const updateFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", body.name?.trim() || "");
            formData.append("description", body.description?.trim() || "");

            if (body.file instanceof File) {
                // yangi fayl bo‘lsa yuboramiz
                formData.append("file", body.file);
            } else if (data?.path) {
                // agar yangi fayl yuborilmagan bo‘lsa, eski faylni saqlaymiz
                formData.append("existing_file", data.path);
            }

            formData.append("_method", "PUT");

            await api.post(`/documents/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getDocuments) {
                await getDocuments();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Document updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Document:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update Document!",
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
                    cover_image: null,
                    author_id: data.author?.id?.toString() || "",
                    tags: data.tags?.map((t) => t.id.toString()) || [],
                }}
            />
        </Stack>
    );
};

export default UpdateNews;
