import React from "react";
import { useForm } from "@mantine/form";
import { Button, Textarea, Stack, Flex, FileInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const FormSchedule = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
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
                    <Button color="gray" type="button" onClick={() => modals.closeAll()}>
                        {t("actions.cancel")}
                    </Button>
                    <Button type="submit" loading={loading}>{t("actions.save")}</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormSchedule;
