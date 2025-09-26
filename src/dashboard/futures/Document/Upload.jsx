import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormDocument from "./Form";

const UploadDocument = ({ getDocuments }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", body.name);
            formData.append("description", body.description);

            if (body.file) {
                formData.append("file", body.file);
            }

            await api.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "Success",
                message: "Document uploaded successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getDocuments) {
                await getDocuments();
            }
            modals.closeAll();

        } catch (error) {
            console.error("Error uploading document:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to upload document!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };





    return (
        <div>
            <Stack>
                <FormDocument
                    submitFn={createFn}
                    initialValues={{
                        name: "",
                        description: "",
                        file: null,
                    }}
                    loading={loading}
                />
            </Stack>
        </div>
    );
};

export default UploadDocument;
