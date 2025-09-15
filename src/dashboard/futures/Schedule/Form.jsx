import React from "react";
import { useForm } from "@mantine/form";
import { Button, Textarea, Stack, Flex, FileInput } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormSchedule = ({ submitFn, initialValues, loading }) => {
    const form = useForm({
        initialValues: {
            name: initialValues?.name || "",
            description: initialValues?.description || "",
            file: initialValues?.file || null,
        },
    });

    const handleSubmit = async (values) => {
        console.log("Form values:", values);
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
                    label="File"
                    placeholder="Upload file"
                    clearable
                    onChange={(file) => {

                        console.log("Selected file:", file);
                        form.setFieldValue("file", file)
                    }}
                />


                <Flex justify="end" gap={10}>
                    <Button type="button" onClick={() => modals.closeAll()}>
                        Отмена
                    </Button>
                    <Button type="submit" loading={loading}>Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormSchedule;
