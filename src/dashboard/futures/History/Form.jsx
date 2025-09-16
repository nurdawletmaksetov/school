import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormHistory = ({ submitFn, initialValues, loading }) => {
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
                    label="Year"
                    placeholder="Year"
                    {...form.getInputProps("year")}
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
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button loading={loading} type="submit">{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormHistory;
