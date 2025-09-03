import { Button, FileInput, Flex, Input, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals';
import { IconAt } from '@tabler/icons-react';
import React, { useState } from 'react'

const FormEmployee = ({ submitFn, initialValues }) => {
    const [value, setValue] = useState(null);
    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
        modals.closeAll();
    }
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Введите название"
                    {...form.getInputProps("full_name.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Введите название"
                    {...form.getInputProps("full_name.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Введите название"
                    {...form.getInputProps("full_name.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Введите название"
                    {...form.getInputProps("full_name.en")}
                />
                <Textarea
                    label="Phone"
                    placeholder="Введите описание"
                    {...form.getInputProps("phone")}
                />
                <FileInput
                    label="Your Photo"
                    accept="image/png,image/jpeg"
                    value={value} onChange={setValue}
                    {...form.getInputProps("photo")}
                />
                <Input
                    placeholder="Your email"
                    leftSection={<IconAt size={16} />}
                    {...form.getInputProps("email")}
                />
                <TextInput
                    label="Kazakh (kk)"
                    placeholder="Введите название"
                    {...form.getInputProps("position.kk")}
                />
                <TextInput
                    label="Uzbek (uz)"
                    placeholder="Введите название"
                    {...form.getInputProps("position.uz")}
                />
                <TextInput
                    label="Russian (ru)"
                    placeholder="Введите название"
                    {...form.getInputProps("position.ru")}
                />
                <TextInput
                    label="English (en)"
                    placeholder="Введите название"
                    {...form.getInputProps("position.en")}
                />
                <Textarea
                    label="Birth Date"
                    placeholder="Введите описание"
                    {...form.getInputProps("birth_date")}
                />
                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    )
}

export default FormEmployee