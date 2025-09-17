import { Button, FileInput, Flex, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const FormAlbum = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const form = useForm({
        initialValues: initialValues || {
            kk: "",
            uz: "",
            ru: "",
            en: "",
            photos: [],
        },
        validate: {},
    });

    async function handleSubmit(values) {
        await submitFn(values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Title (ru)"
                    placeholder="title (ru)"
                    {...form.getInputProps("ru")}
                />
                <TextInput
                    label="Title (en)"
                    placeholder="title (en)"
                    {...form.getInputProps("en")}
                />
                <TextInput
                    label="Title (uz)"
                    placeholder="title (uz)"
                    {...form.getInputProps("uz")}
                />
                <TextInput
                    label="Title (kk)"
                    placeholder="title (kk)"
                    {...form.getInputProps("kk")}
                />
                <FileInput
                    label="Photos"
                    placeholder="select your photo"
                    multiple
                    clearable
                    value={form.values.photos}
                    onChange={(files) => form.setFieldValue("photos", files)}
                />
                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button type="submit" loading={loading}>{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormAlbum;
