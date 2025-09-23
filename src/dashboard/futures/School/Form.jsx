import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { IconAt } from "@tabler/icons-react";

const FormSchool = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation()

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
                    label="Name (kk)"
                    placeholder="name"
                    {...form.getInputProps("name.kk")}
                />
                <TextInput
                    label="Name (uz)"
                    placeholder="name"
                    {...form.getInputProps("name.uz")}
                />
                <TextInput
                    label="Name (ru)"
                    placeholder="name"
                    {...form.getInputProps("name.ru")}
                />
                <TextInput
                    label="Name (en)"
                    placeholder="name"
                    {...form.getInputProps("name.en")}
                />

                <Textarea
                    label="History (kk)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.kk")}
                />
                <Textarea
                    label="History (uz)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.uz")}
                />
                <Textarea
                    label="History (ru)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.ru")}
                />
                <Textarea
                    label="History (en)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.en")}
                />

                <TextInput
                    label="Phone"
                    placeholder="Phone number"
                    {...form.getInputProps("phone")}
                />

                <TextInput
                    label="Location"
                    placeholder="Location"
                    {...form.getInputProps("location")}
                />

                <TextInput
                    label="Email"
                    placeholder="Your email"
                    leftSection={<IconAt size={16} />}
                    {...form.getInputProps("email")}
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

export default FormSchool;
