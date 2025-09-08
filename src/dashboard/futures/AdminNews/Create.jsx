import { useState } from "react";
import { Button, Stack, TextInput, Textarea, MultiSelect, FileInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { api } from "../../../api/api";

const CreateNews = ({ getNews }) => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: { kk: "", uz: "", ru: "", en: "" },
        short_content: { kk: "", uz: "", ru: "", en: "" },
        content: { kk: "", uz: "", ru: "", en: "" },
        author_id: "",
        tags: [],
        cover_image: null,
    });

    const handleChange = (section, lang, value) => {
        setForm((prev) => ({
            ...prev,
            [section]: { ...prev[section], [lang]: value },
        }));
    };

    const createFn = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            // title[lang]
            Object.keys(form.title).forEach((lang) => {
                formData.append(`title[${lang}]`, form.title[lang] || "");
            });

            // short_content[lang]
            Object.keys(form.short_content).forEach((lang) => {
                formData.append(`short_content[${lang}]`, form.short_content[lang] || "");
            });

            // content[lang]
            Object.keys(form.content).forEach((lang) => {
                formData.append(`content[${lang}]`, form.content[lang] || "");
            });

            // author_id
            if (form.author_id) {
                formData.append("author_id", form.author_id);
            }

            // tags[]
            if (form.tags?.length) {
                form.tags.forEach((tag) => formData.append("tags[]", tag));
            }

            // cover_image
            if (form.cover_image) {
                formData.append("cover_image", form.cover_image);
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
                message: error?.response?.data?.message || "Could not create news",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <TextInput
                label="Title (KK)"
                value={form.title.kk}
                onChange={(e) => handleChange("title", "kk", e.target.value)}
            />
            <TextInput
                label="Title (UZ)"
                value={form.title.uz}
                onChange={(e) => handleChange("title", "uz", e.target.value)}
            />
            <TextInput
                label="Title (RU)"
                value={form.title.ru}
                onChange={(e) => handleChange("title", "ru", e.target.value)}
            />
            <TextInput
                label="Title (EN)"
                value={form.title.en}
                onChange={(e) => handleChange("title", "en", e.target.value)}
            />

            <Textarea
                label="Short Content (KK)"
                value={form.short_content.kk}
                onChange={(e) => handleChange("short_content", "kk", e.target.value)}
            />
            <Textarea
                label="Short Content (UZ)"
                value={form.short_content.uz}
                onChange={(e) => handleChange("short_content", "uz", e.target.value)}
            />
            <Textarea
                label="Short Content (RU)"
                value={form.short_content.ru}
                onChange={(e) => handleChange("short_content", "ru", e.target.value)}
            />
            <Textarea
                label="Short Content (EN)"
                value={form.short_content.en}
                onChange={(e) => handleChange("short_content", "en", e.target.value)}
            />

            <Textarea
                label="Content (KK)"
                value={form.content.kk}
                onChange={(e) => handleChange("content", "kk", e.target.value)}
            />
            <Textarea
                label="Content (UZ)"
                value={form.content.uz}
                onChange={(e) => handleChange("content", "uz", e.target.value)}
            />
            <Textarea
                label="Content (RU)"
                value={form.content.ru}
                onChange={(e) => handleChange("content", "ru", e.target.value)}
            />
            <Textarea
                label="Content (EN)"
                value={form.content.en}
                onChange={(e) => handleChange("content", "en", e.target.value)}
            />

            <TextInput label="Author ID" value={form.author_id} onChange={(e) => setForm({ ...form, author_id: e.target.value })} />

            <MultiSelect
                label="Tags"
                placeholder="Select tags"
                data={[
                    { value: "1", label: "Politics" },
                    { value: "2", label: "Economy" },
                    { value: "3", label: "Technology" },
                ]}
                value={form.tags}
                onChange={(value) => setForm({ ...form, tags: value })}
            />

            <FileInput label="Cover Image" placeholder="Upload image" onChange={(file) => setForm({ ...form, cover_image: file })} />

            <Button loading={loading} onClick={createFn}>
                Create News
            </Button>
        </Stack>
    );
};

export default CreateNews;

