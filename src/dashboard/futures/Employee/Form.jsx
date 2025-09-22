import React, { useEffect, useState } from "react";
import { Button, FileInput, Flex, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconAt } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { api } from "../../../api/api";

const FormEmployee = ({ submitFn, initialValues, loading }) => {
    const { t } = useTranslation();
    const [positions, setPositions] = useState([]);
    const [posLoading, setPosLoading] = useState(true);

    const form = useForm({
        initialValues: {
            full_name: { kk: "", uz: "", ru: "", en: "", ...initialValues.full_name },
            phone: initialValues.phone || "",
            photo: initialValues.photo || null,
            email: initialValues.email || "",
            position_id: initialValues.position_id ? String(initialValues.position_id) : "",
            birth_date: initialValues.birth_date || "",
            description: { kk: "", uz: "", ru: "", en: "", ...initialValues.description },
        },
    });

    useEffect(() => {
        api
            .get("/positions/list")
            .then((res) => {
                console.log("Positions API response:", res.data);

                const list = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                const options = list.map((pos) => ({
                    value: String(pos.id),
                    label: pos.name,
                }));

                setPositions(options);
            })
            .catch((err) => {
                console.error("Positions fetch error:", err);
            })
            .finally(() => setPosLoading(false));
    }, []);


    const handleSubmit = async (values) => {
        await submitFn({
            ...values,
            position_id: Number(values.position_id),
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label="Full Name (kk)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.kk")}
                />
                <TextInput
                    label="Full Name (uz)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.uz")}
                />
                <TextInput
                    label="Full Name (ru)"
                    placeholder="Full Name"
                    {...form.getInputProps("full_name.ru")}
                />
                <TextInput
                    label="Full Name (en)"
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

                <Select
                    label="Position"
                    placeholder="Select position"
                    data={positions}
                    searchable
                    nothingFound="No positions"
                    disabled={posLoading}
                    value={form.values.position_id}
                    onChange={(value) => form.setFieldValue("position_id", value)}
                    error={form.errors.position_id}
                />

                <TextInput
                    label="Birth Date"
                    placeholder="YYYY-MM-DD"
                    {...form.getInputProps("birth_date")}
                />

                <Flex justify="end" gap={10}>
                    <Button color="gray" onClick={() => modals.closeAll()}>
                        {t("actions.cancel")}
                    </Button>
                    <Button loading={loading} type="submit">
                        {t("actions.save")}
                    </Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormEmployee;
