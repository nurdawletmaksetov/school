import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormInformation = ({ submitFn, initialValues, loading }) => {
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
                <TextInput
                    label="Count"
                    placeholder="Count"
                    {...form.getInputProps("count")}
                />
                <Textarea
                    label="Description (kk)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.kk")}
                />
                <Textarea
                    label="Description (uz)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.uz")}
                />
                <Textarea
                    label="Description (ru)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.ru")}
                />
                <Textarea
                    label="Description (en)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.en")}
                />

                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button loading={loading} type="submit">{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormInformation;
