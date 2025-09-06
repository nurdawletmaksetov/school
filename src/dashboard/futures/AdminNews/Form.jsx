import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex, FileInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";

const FormNews = ({ submitFn, initialValues }) => {
    const [value, setValue] = useState(null);

    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Add Title"
                    {...form.getInputProps("title.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Add Title"
                    {...form.getInputProps("title.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Add Title"
                    {...form.getInputProps("title.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Add Title"
                    {...form.getInputProps("title.en")}
                />
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Add short content"
                    {...form.getInputProps("short_content.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Add short_content"
                    {...form.getInputProps("short_content.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Add short_content"
                    {...form.getInputProps("short_content.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Add short_content"
                    {...form.getInputProps("short_content.en")}
                />
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Add content"
                    {...form.getInputProps("content.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Add content"
                    {...form.getInputProps("content.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Add content"
                    {...form.getInputProps("content.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Add content"
                    {...form.getInputProps("content.en")}
                />
                <FileInput
                    label="Cover Image"
                    accept="image/png,image/jpeg"
                    value={value} onChange={setValue}
                    {...form.getInputProps("cover_image")}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormNews;