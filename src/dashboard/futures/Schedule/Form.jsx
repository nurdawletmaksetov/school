import React from "react";
import { useForm } from "@mantine/form";
import { Button, Textarea, Stack, Flex, FileInput } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormSchedule = ({ submitFn, initialValues }) => {

    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Textarea
                    label="Description"
                    placeholder="Description"
                    minRows={2}
                    {...form.getInputProps("description")}
                />

                <FileInput
                    label="PDF or XLSX fail"
                    placeholder="Upload PDF or XLSX"
                    accept=".pdf,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    {...form.getInputProps("file")}
                />

                <Flex justify="end" gap={10}>
                    <Button type="button" onClick={() => modals.closeAll()}>
                        Отмена
                    </Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormSchedule;