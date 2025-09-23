import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormDocument from "./Form";

const UpdateDocument = ({ id, getDocuments }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getDocument = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/documents/show/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching Document:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch Document!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDocument();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name[kk]", body.name.kk || "");
            formData.append("name[uz]", body.name.uz || "");
            formData.append("name[ru]", body.name.ru || "");
            formData.append("name[en]", body.name.en || "");

            formData.append("description[kk]", body.description.kk || "");
            formData.append("description[uz]", body.description.uz || "");
            formData.append("description[ru]", body.description.ru || "");
            formData.append("description[en]", body.description.en || "");

            if (body.file instanceof File) {
                formData.append("file", body.file);
            }

            formData.append("_method", "PUT");

            await api.post(`/documents/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getDocuments) {
                await getDocuments();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Document updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Document:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update Document!",
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
        <FormDocument
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                name: {
                    kk: data?.name?.kk || "",
                    uz: data?.name?.uz || "",
                    ru: data?.name?.ru || "",
                    en: data?.name?.en || "",
                },
                description: {
                    kk: data?.description?.kk || "",
                    uz: data?.description?.uz || "",
                    ru: data?.description?.ru || "",
                    en: data?.description?.en || "",
                },
                file: null,
            }}
        />
    );
};

export default UpdateDocument;
