import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormSchool = ({ submitFn, initialValues }) => {
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
                    label="Karakalpak (kk)"
                    placeholder="name"
                    {...form.getInputProps("name.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="name"
                    {...form.getInputProps("name.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="name"
                    {...form.getInputProps("name.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="name"
                    {...form.getInputProps("name.en")}
                />

                <Textarea
                    label="Karakalpak (kk)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.kk")}
                />
                <Textarea
                    label="Uzbek (uz)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.uz")}
                />
                <Textarea
                    label="Russian (ru)"
                    placeholder="history"
                    minRows={2}
                    {...form.getInputProps("history.ru")}
                />
                <Textarea
                    label="English (en)"
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

                <Textarea
                    label="Karakalpak (kk)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.kk")}
                />
                <Textarea
                    label="Uzbek (uz)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.uz")}
                />
                <Textarea
                    label="Russian (ru)"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description.ru")}
                />
                <Textarea
                    label="English (en)"
                    placeholder="Description"
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

export default FormSchool;
