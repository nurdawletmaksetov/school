import { Button, FileInput, Flex, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals';
import { IconAt } from '@tabler/icons-react';
import React from 'react'

const FormEmployee = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues: {
            full_name: { kk: "", uz: "", ru: "", en: "", ...initialValues.full_name },
            phone: initialValues.phone || "",
            photo: initialValues.photo || null,
            email: initialValues.email || "",
            position_id: initialValues.position_id || "",
            birth_date: initialValues.birth_date || "",
            description: { kk: "", uz: "", ru: "", en: "", ...initialValues.description },
        },
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Karakalpak (kk)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.en")}
                />

                <TextInput
                    label="Phone"
                    placeholder="Phone number"
                    {...form.getInputProps("phone")}
                />

                <FileInput
                    label="Your Photo"
                    placeholder="Upload your photo"
                    accept="image/png,image/jpeg"

                    {...form.getInputProps("photo")}
                />

                <TextInput
                    label="Email"
                    placeholder="Your email"
                    leftSection={<IconAt size={16} />}
                    {...form.getInputProps("email")}
                />

                <TextInput
                    label="Position id"
                    placeholder="Position id"
                    {...form.getInputProps("position_id")}
                />

                <TextInput
                    label="Birth Date"
                    placeholder="YYYY-MM-DD"
                    {...form.getInputProps("birth_date")}
                />

                <TextInput
                    label="Description (kk)"
                    placeholder="Description"
                    {...form.getInputProps("position.description.kk")}
                />
                <TextInput
                    label="Description (uz)"
                    placeholder="Description"
                    {...form.getInputProps("position.description.uz")}
                />
                <TextInput
                    label="Description (ru)"
                    placeholder="Description"
                    {...form.getInputProps("position.description.ru")}
                />
                <TextInput
                    label="Description (en)"
                    placeholder="Description"
                    {...form.getInputProps("position.description.en")}
                />

                <Flex justify="end" gap={10}>
                    <Button onClick={() => { form.reset(); modals.closeAll(); }}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    )
}

export default FormEmployee
