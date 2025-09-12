import { Button, FileInput, Flex, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

const FormDocument = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues: {
            name: initialValues?.name || "",
            description: initialValues?.description || "",
            file: initialValues?.file || null,
        },
    });

    async function handleSubmit(values) {
        await submitFn(values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Name"
                    placeholder="Name"
                    required
                    {...form.getInputProps("name")}
                />

                <Textarea
                    label="Description"
                    placeholder="Description"
                    required
                    {...form.getInputProps("description")}
                />

                <FileInput
                    label="File"
                    placeholder="Upload file"
                    clearable
                    onChange={(file) => form.setFieldValue("file", file)}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()} variant="default">
                        Отмена
                    </Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormDocument;
