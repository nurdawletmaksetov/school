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

            formData.append("name", body.name || "");
            formData.append("description", body.description || "");

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
            key={data?.id}
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                name: data?.name || "",
                description: data?.description || "",
                file: null,
            }}
        />
    );
};

export default UpdateDocument;
