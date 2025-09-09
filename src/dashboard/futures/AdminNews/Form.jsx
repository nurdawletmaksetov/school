import { useForm } from "@mantine/form";
import {
    Button,
    TextInput,
    Textarea,
    Stack,
    Flex,
    FileInput,
    Select,
    MultiSelect,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { api } from "../../../api/api";
import { modals } from "@mantine/modals";

const FormNews = ({ submitFn, initialValues }) => {
    const [file, setFile] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);

    const form = useForm({ initialValues });

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

        async function fetchTags() {
            try {
                const { data } = await api.get("/tags");
                setTags(
                    data.data.items.map((t) => ({
                        value: t.id.toString(),
                        label: t.name,
                    }))
                );
            } catch (error) {
                console.error("Error fetching tags:", error);
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
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput label="Title (kk)" {...form.getInputProps("title.kk")} />
                <TextInput label="Title (uz)" {...form.getInputProps("title.uz")} />
                <TextInput label="Title (ru)" {...form.getInputProps("title.ru")} />
                <TextInput label="Title (en)" {...form.getInputProps("title.en")} />

                <Textarea
                    label="Short Content (kk)"
                    {...form.getInputProps("short_content.kk")}
                />
                <Textarea
                    label="Short Content (uz)"
                    {...form.getInputProps("short_content.uz")}
                />
                <Textarea
                    label="Short Content (ru)"
                    {...form.getInputProps("short_content.ru")}
                />
                <Textarea
                    label="Short Content (en)"
                    {...form.getInputProps("short_content.en")}
                />

                <Textarea label="Content (kk)" {...form.getInputProps("content.kk")} />
                <Textarea label="Content (uz)" {...form.getInputProps("content.uz")} />
                <Textarea label="Content (ru)" {...form.getInputProps("content.ru")} />
                <Textarea label="Content (en)" {...form.getInputProps("content.en")} />

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
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormNews;
