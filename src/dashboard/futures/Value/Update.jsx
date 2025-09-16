import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormValue from "./Form";

const UpdateValue = ({ id, getValue }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getValues = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/values/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching value:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch value!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getValues();
    }, [id]);

    const updateFn = async (values) => {
        setLoading(true);

        const formData = new FormData();

        formData.append("name[kk]", values.name.kk);
        formData.append("name[uz]", values.name.uz);
        formData.append("name[ru]", values.name.ru);
        formData.append("name[en]", values.name.en);

        formData.append("text[kk]", values.text.kk);
        formData.append("text[uz]", values.text.uz);
        formData.append("text[ru]", values.text.ru);
        formData.append("text[en]", values.text.en);

        if (values.photo instanceof File) {
            formData.append("photo", values.photo);
        }

        formData.append("_method", "PUT");

        try {
            await api.post(`/values/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            if (getValue) await getValue();
            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Value updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating value:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update value!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormValue
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                name: {
                    kk: data?.name?.kk,
                    uz: data?.name?.uz,
                    ru: data?.name?.ru,
                    en: data?.name?.en,
                },
                text: {
                    kk: data?.text?.kk,
                    uz: data?.text?.uz,
                    ru: data?.text?.ru,
                    en: data?.text?.en,
                },
                photo: null,
            }}
        />
    );
};

export default UpdateValue;
