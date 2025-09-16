import { Button, FileInput, Flex, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormValue = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const form = useForm({
        initialValues,
    });

    async function handleSubmit(values) {
        await submitFn(values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Name (kk)"
                    placeholder="Name (kk)"
                    {...form.getInputProps("name.kk")}
                />
                <TextInput
                    label="Name (uz)"
                    placeholder="Name (uz)"
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
                    label="Text (kk)"
                    placeholder="Text (kk)"
                    {...form.getInputProps("text.kk")}
                />
                <Textarea
                    label="Text (uz)"
                    placeholder="Text (uz)"
                    {...form.getInputProps("text.uz")}
                />
                <Textarea
                    label="Text (ru)"
                    placeholder="Text (ru)"
                    {...form.getInputProps("text.ru")}
                />
                <Textarea
                    label="Text (en)"
                    placeholder="Text (en)"
                    {...form.getInputProps("text.en")}
                />
                <FileInput
                    label="Photo"
                    placeholder={initialValues.photo ? "Current photo uploaded" : "Upload photo"}
                    accept="image/*"
                    onChange={(file) => form.setFieldValue("photo", file)}
                />


                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button loading={loading} type="submit">{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormValue;
