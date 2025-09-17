import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, FileInput, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormClub = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const form = useForm({
        initialValues: {
            name: { kk: "", uz: "", ru: "", en: "", ...initialValues.name },
            text: { kk: "", uz: "", ru: "", en: "", ...initialValues.text },
            schedule: { kk: "", uz: "", ru: "", en: "", ...initialValues.schedule },
            photo: initialValues.photo || null,
        }
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label={`Name (kk)`}
                    placeholder="Name"
                    {...form.getInputProps(`name.kk`)}
                />
                <TextInput
                    label={`Name (uz)`}
                    placeholder="Name"
                    {...form.getInputProps(`name.uz`)}
                />
                <TextInput
                    label={`Name (ru)`}
                    placeholder="Name"
                    {...form.getInputProps(`name.ru`)}
                />
                <TextInput
                    label={`Name (en)`}
                    placeholder="Name"
                    {...form.getInputProps(`name.en`)}
                />

                <Textarea
                    label={`Text (kk)`}
                    placeholder="Text"
                    {...form.getInputProps(`text.kk`)}
                />
                <Textarea
                    label={`Text (uz)`}
                    placeholder="Text"
                    {...form.getInputProps(`text.uz`)}
                />
                <Textarea
                    label={`Text (ru)`}
                    placeholder="Text"
                    {...form.getInputProps(`text.ru`)}
                />
                <Textarea
                    label={`Text (en)`}
                    placeholder="Text"
                    {...form.getInputProps(`text.en`)}
                />

                <Textarea
                    label={`Schedule (kk)`}
                    placeholder="Schedule"
                    {...form.getInputProps(`schedule.kk`)}
                />
                <Textarea
                    label={`Schedule (uz)`}
                    placeholder="Schedule"
                    {...form.getInputProps(`schedule.uz`)}
                />
                <Textarea
                    label={`Schedule (ru)`}
                    placeholder="Schedule"
                    {...form.getInputProps(`schedule.ru`)}
                />
                <Textarea
                    label={`Schedule (en)`}
                    placeholder="Schedule"
                    {...form.getInputProps(`schedule.en`)}
                />

                <FileInput
                    label="Upload photo"
                    placeholder="Upload photo"
                    accept="image/*"
                    value={form.values.photo}
                    onChange={(file) => form.setFieldValue("photo", file)}
                />

                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button type="submit" loading={loading}>{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormClub;
