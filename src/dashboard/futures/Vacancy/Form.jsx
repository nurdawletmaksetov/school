import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex, Select, Switch } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormVacancy = ({ submitFn, initialValues }) => {
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
                    label="Job title (kk)"
                    placeholder="Job title"
                    {...form.getInputProps("title.kk")}
                />
                <TextInput
                    label="Job title (uz)"
                    placeholder="Job title"
                    {...form.getInputProps("title.uz")}
                />
                <TextInput
                    label="Job title (ru)"
                    placeholder="job title"
                    {...form.getInputProps("title.ru")}
                />
                <TextInput
                    label="Job title (en)"
                    placeholder="Job title"
                    {...form.getInputProps("title.en")}
                />

                <Textarea
                    label="Job content (kk)"
                    placeholder="Job content"
                    minRows={2}
                    {...form.getInputProps("content.kk")}
                />
                <Textarea
                    label="Job content (uz)"
                    placeholder="Job content"
                    minRows={2}
                    {...form.getInputProps("content.uz")}
                />
                <Textarea
                    label="Job content (ru)"
                    placeholder="Job content"
                    minRows={2}
                    {...form.getInputProps("content.ru")}
                />
                <Textarea
                    label="Job content (en)"
                    placeholder="Job content"
                    minRows={2}
                    {...form.getInputProps("content.en")}
                />
                <Switch
                    label={
                        form.values.active
                            ? "Vacancy is active"
                            : "Vacancy is not active"
                    }
                    checked={form.values.active}
                    onChange={(event) =>
                        form.setFieldValue("active", event.currentTarget.checked)
                    }
                />

                <TextInput
                    label="Salary"
                    placeholder="Salary"
                    {...form.getInputProps("salary")}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormVacancy;
