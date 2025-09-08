import { useForm } from "@mantine/form";
import {
    Button,
    TextInput,
    Stack,
    Flex,
    FileInput,
    Select,
    MultiSelect,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState, useEffect } from "react";
import { api } from "../../../api/api";

const FormNews = ({ submitFn, initialValues }) => {
    const [file, setFile] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);

    const form = useForm({
        initialValues,
    });

    // Avtorlarni olish
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const { data } = await api.get("/users");
                setAuthors(
                    data.data.items.map((u) => ({
                        value: u.id.toString(),
                        label: u.full_name?.ru || u.full_name?.en || `User ${u.id}`,
                    }))
                );
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        }

        async function createFn(body) {
            setLoading(true);
            try {
                const formData = new FormData();

                // Title massiv
                Object.values(body.title).forEach((t) => {
                    formData.append("title[]", t || "");
                });

                // Short content massiv
                Object.values(body.short_content).forEach((sc) => {
                    formData.append("short_content[]", sc || "");
                });

                // Content massiv
                Object.values(body.content).forEach((c) => {
                    formData.append("content[]", c || "");
                });

                // Author
                if (body.author_id) {
                    formData.append("author_id", body.author_id);
                }

                // Tags
                if (body.tags && body.tags.length > 0) {
                    body.tags.forEach((tag) => {
                        formData.append("tags[]", tag);
                    });
                }

                // Cover image
                if (body.cover_image) {
                    formData.append("cover_image", body.cover_image);
                }

                await api.post("/news/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
                    message: error?.response?.data?.message || "Could not create news",
                    color: "red",
                });
            } finally {
                setLoading(false);
            }
        }


        fetchAuthors();
        fetchTags();
    }, []);

    const handleSubmit = async (values) => {
        await submitFn({
            ...values,
            cover_image: file,
        });
        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Title (kk)"
                    {...form.getInputProps("title.kk")}
                />
                <TextInput

                    label="Title (uz)"
                    {...form.getInputProps("title.uz")}
                />
                <TextInput
                    label="Title (ru)"
                    {...form.getInputProps("title.ru")}
                />
                <TextInput
                    label="Title (en)"
                    {...form.getInputProps("title.en")}
                />

                <TextInput
                    label="Short Content (kk)"
                    {...form.getInputProps("short_content.kk")}
                />
                <TextInput
                    label="Short Content (uz)"
                    {...form.getInputProps("short_content.uz")}
                />
                <TextInput
                    label="Short Content (ru)"
                    {...form.getInputProps("short_content.ru")}
                />
                <TextInput
                    label="Short Content (en)"
                    {...form.getInputProps("short_content.en")}
                />

                <TextInput
                    label="Content (kk)"
                    {...form.getInputProps("content.kk")}
                />
                <TextInput
                    label="Content (uz)"
                    {...form.getInputProps("content.uz")}
                />
                <TextInput
                    label="Content (ru)"
                    {...form.getInputProps("content.ru")}
                />
                <TextInput
                    label="Content (en)"
                    {...form.getInputProps("content.en")}
                />

                <Select
                    label="Author"
                    placeholder="Select author"
                    data={authors}
                    {...form.getInputProps("author_id")}
                />

                <MultiSelect
                    label="Tags"
                    placeholder="Select tags"
                    data={tags}
                    {...form.getInputProps("tags")}
                />

                <FileInput
                    label="Cover Image"
                    accept="image/png,image/jpeg"
                    value={file}
                    onChange={setFile}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()} variant="outline">
                        Отмена
                    </Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormNews;
