import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormNews from "./Form";

const UpdateNews = ({ id, getNews }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/news/${id}`);
            setData(res.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch data!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const updateFn = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title[en]", values.title.en);
            formData.append("title[ru]", values.title.ru);
            formData.append("title[uz]", values.title.uz);
            formData.append("title[kk]", values.title.kk);

            formData.append("short_content[en]", values.short_content.en);
            formData.append("short_content[ru]", values.short_content.ru);
            formData.append("short_content[uz]", values.short_content.uz);
            formData.append("short_content[kk]", values.short_content.kk);

            formData.append("content[en]", values.content.en);
            formData.append("content[ru]", values.content.ru);
            formData.append("content[uz]", values.content.uz);
            formData.append("content[kk]", values.content.kk);

            if (values.cover_image) {
                formData.append("cover_image", values.cover_image);
            }

            if (values.file) {
                formData.append("file", values.file);
            }

            formData.append("author_id", values.author_id);
            formData.append("_method", "PUT");

            await api.post(`/news/update/${id}`, formData);

            notifications.show({
                title: "Success",
                message: "News updated successfully",
                color: "teal",
                icon: <Check />,
            });

            if (getNews) {
                await getNews();
            }
            modals.closeAll();
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Something went wrong while updating",
                color: "red",
                icon: <X />,
            });
            console.error("Update error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!data) {
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
                loading={loading}
                initialValues={{
                    title: {
                        kk: data?.title?.kk || "",
                        uz: data?.title?.uz || "",
                        ru: data?.title?.ru || "",
                        en: data?.title?.en || "",
                    },
                    short_content: {
                        kk: data?.short_content?.kk || "",
                        uz: data?.short_content?.uz || "",
                        ru: data?.short_content?.ru || "",
                        en: data?.short_content?.en || "",
                    },
                    content: {
                        kk: data?.content?.kk || "",
                        uz: data?.content?.uz || "",
                        ru: data?.content?.ru || "",
                        en: data?.content?.en || "",
                    },
                    author_id: data?.author?.id?.toString() || null,
                    tags: data?.tags?.map((t) => t.id.toString()) || [],
                }}
            />
        </Stack>
    );
};

export default UpdateNews;
