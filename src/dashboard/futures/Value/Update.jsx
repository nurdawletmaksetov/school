import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormValue from "./Form";

const UpdateValue = ({ id, getValue }) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [updating, setUpdating] = useState(false);

    const getValues = async () => {
        setFetching(true);
        try {
            const response = await api.get(`/values/${id}`);
            setData(response.data.data);

        } catch (error) {
            console.error("Error fetching value:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch value!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getValues();
    }, [id]);

    const updateFn = async (body) => {
        console.log("START updateFn");
        setUpdating(true);
        try {
            const formData = new FormData();
            Object.entries(body.name).forEach(([lang, value]) => {
                formData.append(`name[${lang}]`, value);
            });
            Object.entries(body.text).forEach(([lang, value]) => {
                formData.append(`text[${lang}]`, value);
            });
            if (body.photo instanceof File) {
                formData.append("photo", body.photo);
            }

            const res = await api.post(`/values/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("RESPONSE:", res);

            if (getValue) {
                getValue();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Value updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("CATCH error:", error);
        } finally {
            console.log("FINALLY ishladi");
            setUpdating(false);
        }
    };

    if (fetching || !data) {
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
            initialValues={{
                name: {
                    ru: data?.name?.ru || "",
                    uz: data?.name?.uz || "",
                    en: data?.name?.en || "",
                    kk: data?.name?.kk || "",
                },
                text: {
                    ru: data?.text?.ru || "",
                    uz: data?.text?.uz || "",
                    en: data?.text?.en || "",
                    kk: data?.text?.kk || "",
                },
                photo: data?.photo || null,
            }}

            submitting={updating} // ⚡ agar FormValue’da loader ko‘rsatmoqchi bo‘lsang
        />
    );
};

export default UpdateValue;
