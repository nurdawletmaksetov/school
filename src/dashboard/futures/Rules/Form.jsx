import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormRules = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Title (kk)"
                    placeholder="Title"
                    {...form.getInputProps("title.kk")}
                />
                <TextInput
                    label="Title (uz)"
                    placeholder="Title"
                    {...form.getInputProps("title.uz")}
                />
                <TextInput
                    label="Title (ru)"
                    placeholder="Title"
                    {...form.getInputProps("title.ru")}
                />
                <TextInput
                    label="Title (en)"
                    placeholder="Title"
                    {...form.getInputProps("title.en")}
                />

                <Textarea
                    label="Text (kk)"
                    placeholder="Text"
                    minRows={2}
                    {...form.getInputProps("text.kk")}
                />
                <Textarea
                    label="Text (uz)"
                    placeholder="Text"
                    minRows={2}
                    {...form.getInputProps("text.uz")}
                />
                <Textarea
                    label="Text (ru)"
                    placeholder="Text"
                    minRows={2}
                    {...form.getInputProps("text.ru")}
                />
                <Textarea
                    label="Text (en)"
                    placeholder="Text"
                    minRows={2}
                    {...form.getInputProps("text.en")}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()} color="gray">{t("actions.cancel")}</Button>
                    <Button type="submit" loading={loading}>{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormRules;
