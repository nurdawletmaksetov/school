import { Button, FileInput, Flex, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormDocument = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const form = useForm({
        initialValues: {
            name: {
                kk: initialValues?.name?.kk || "",
                uz: initialValues?.name?.uz || "",
                ru: initialValues?.name?.ru || "",
                en: initialValues?.name?.en || "",
            },
            description: {
                kk: initialValues?.description?.kk || "",
                uz: initialValues?.description?.uz || "",
                ru: initialValues?.description?.ru || "",
                en: initialValues?.description?.en || "",
            },
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
                    label="Name (kk)"
                    placeholder="Name"
                    {...form.getInputProps("name.kk")}
                />

                <TextInput
                    label="Name (uz)"
                    placeholder="Name"
                    {...form.getInputProps("name.uz")}
                />

                <TextInput
                    label="Name (ru)"
                    placeholder="Name (ru)"
                    {...form.getInputProps("name.ru")}
                />

                <TextInput
                    label="Name (en)"
                    placeholder="Name (en)"
                    {...form.getInputProps("name.en")}
                />

                <Textarea
                    label="Description (kk)"
                    placeholder="Description (kk)"
                    {...form.getInputProps("description.kk")}
                />

                <Textarea
                    label="Description (uz)"
                    placeholder="Description (uz)"
                    {...form.getInputProps("description.uz")}
                />

                <Textarea
                    label="Description (ru)"
                    placeholder="Description (ru)"
                    {...form.getInputProps("description.ru")}
                />

                <Textarea
                    label="Description (en)"
                    placeholder="Description (en)"
                    {...form.getInputProps("description.en")}
                />

                <FileInput
                    label="File"
                    placeholder="Upload file"
                    clearable
                    onChange={(file) => form.setFieldValue("file", file)}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()} color="gray">
                        {t("actions.cancel")}
                    </Button>
                    <Button type="submit" loading={loading}>{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormDocument;
