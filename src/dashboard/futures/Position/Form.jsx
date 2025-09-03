import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormPosition = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Введите название"
                    {...form.getInputProps("name.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Введите название"
                    {...form.getInputProps("name.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Введите название"
                    {...form.getInputProps("name.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Введите название"
                    {...form.getInputProps("name.en")}
                />

                <Textarea
                    label="Kazakh (kk)"
                    placeholder="Введите описание"
                    minRows={2}
                    {...form.getInputProps("description.kk")}
                />
                <Textarea
                    label="Uzbek (uz)"
                    placeholder="Введите описание"
                    minRows={2}
                    {...form.getInputProps("description.uz")}
                />
                <Textarea
                    label="Russian (ru)"
                    placeholder="Введите описание"
                    minRows={2}
                    {...form.getInputProps("description.ru")}
                />
                <Textarea
                    label="English (en)"
                    placeholder="Введите описание"
                    minRows={2}
                    {...form.getInputProps("description.en")}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormPosition;
