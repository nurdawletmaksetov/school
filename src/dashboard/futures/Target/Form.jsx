import { useForm } from "@mantine/form";
import { Button, Textarea, Stack, Flex, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormTarget = ({ submitFn, initialValues, loading }) => {
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
                    placeholder="Name "
                    {...form.getInputProps("name.ru")}
                />
                <TextInput
                    label="Name (en)"
                    placeholder="Name"
                    {...form.getInputProps("name.en")}
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
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit" loading={loading}>Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormTarget;
