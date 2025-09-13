import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, FileInput, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormClub = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        // Frontend validation: barcha majburiy fieldlarni tekshirish
        const fields = ["name", "text", "schedule"];
        const langs = ["kk", "uz", "ru", "en"];

        for (let field of fields) {
            for (let lang of langs) {
                if (!values[field]?.[lang]) {
                    alert(`${field}[${lang}] is required!`);
                    return;
                }
            }
        }

        await submitFn(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                {/* Name fields */}
                {["kk", "uz", "ru", "en"].map((lang) => (
                    <TextInput
                        key={`name-${lang}`}
                        label={`Name (${lang})`}
                        placeholder="Name"
                        {...form.getInputProps(`name.${lang}`)}
                    />
                ))}

                {/* Text fields */}
                {["kk", "uz", "ru", "en"].map((lang) => (
                    <Textarea
                        key={`text-${lang}`}
                        label={`Text (${lang})`}
                        placeholder="Text"
                        {...form.getInputProps(`text.${lang}`)}
                    />
                ))}

                {/* Schedule fields */}
                {["kk", "uz", "ru", "en"].map((lang) => (
                    <Textarea
                        key={`schedule-${lang}`}
                        label={`Schedule (${lang})`}
                        placeholder="Schedule"
                        {...form.getInputProps(`schedule.${lang}`)}
                    />
                ))}

                {/* Photo */}
                <FileInput
                    label="Upload photo"
                    placeholder="Upload photo"
                    accept="image/*"
                    value={form.values.photo}
                    onChange={(file) => form.setFieldValue("photo", file)}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormClub;
