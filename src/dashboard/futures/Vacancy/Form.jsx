import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex, Select, Switch } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormVacancy = ({ submitFn, initialValues, loading }) => {
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
                    label={t("vacancy.title") + " (kk)"}
                    placeholder={t("vacancy.title")}
                    {...form.getInputProps("title.kk")}
                />
                <TextInput
                    label={t("vacancy.title") + " (uz)"}
                    placeholder={t("vacancy.title")}
                    {...form.getInputProps("title.uz")}
                />
                <TextInput
                    label={t("vacancy.title") + " (ru)"}
                    placeholder={t("vacancy.title")}
                    {...form.getInputProps("title.ru")}
                />
                <TextInput
                    label={t("vacancy.title") + " (en)"}
                    placeholder={t("vacancy.title")}
                    {...form.getInputProps("title.en")}
                />

                <Textarea
                    label={t("vacancy.content") + " (kk)"}
                    placeholder={t("vacancy.content")}
                    minRows={2}
                    {...form.getInputProps("content.kk")}
                />
                <Textarea
                    label={t("vacancy.content") + " (uz)"}
                    placeholder={t("vacancy.content")}
                    minRows={2}
                    {...form.getInputProps("content.uz")}
                />
                <Textarea
                    label={t("vacancy.content") + " (ru)"}
                    placeholder={t("vacancy.content")}
                    minRows={2}
                    {...form.getInputProps("content.ru")}
                />
                <Textarea
                    label={t("vacancy.content") + " (en)"}
                    placeholder={t("vacancy.content")}
                    minRows={2}
                    {...form.getInputProps("content.en")}
                />
                <Switch
                    label={
                        form.values.active
                            ? t("vacancy.active")
                            : t("vacancy.inactive")
                    }
                    checked={form.values.active}
                    onChange={(event) =>
                        form.setFieldValue("active", event.currentTarget.checked)
                    }
                />

                <TextInput
                    label={t("vacancy.salary")}
                    placeholder={t("vacancy.salary")}
                    {...form.getInputProps("salary")}
                />

                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                    <Button type="submit" loading={loading}>{t("save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormVacancy;
