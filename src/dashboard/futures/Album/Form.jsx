import { Button, FileInput, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

const FormAlbum = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues: initialValues || {
            kk: "",
            uz: "",
            ru: "",
            en: "",
            photos: [],
        },
        validate: {},
    });

    async function handleSubmit(values) {
        await submitFn(values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Title (ru)"
                    placeholder="Please, enter title (ru)"
                    {...form.getInputProps("ru")}
                />
                <TextInput
                    label="Title (en)"
                    placeholder="Please, enter title (en)"
                    {...form.getInputProps("en")}
                />
                <TextInput
                    label="Title (uz)"
                    placeholder="Please, enter title (uz)"
                    {...form.getInputProps("uz")}
                />
                <TextInput
                    label="Title (kk)"
                    placeholder="Please, enter title (kk)"
                    {...form.getInputProps("kk")}
                />
                <FileInput
                    label="Photos"
                    placeholder="Please, select your photo"
                    multiple
                    clearable
                    value={form.values.photos}
                    onChange={(files) => form.setFieldValue("photos", files)}
                />
                <Group>
                    <Button onClick={() => modals.closeAll()} variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </Group>
            </Stack>
        </form>
    );
};

export default FormAlbum;
