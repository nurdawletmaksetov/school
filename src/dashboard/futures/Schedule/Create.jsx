import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormSchedule from "./Form";

const CreateSchedule = ({ getAdminSchedule }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("description", body.description);

            if (body.file) {
                formData.append("file_pdf", body.file);
            }

            await api.post("/schedules/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notifications.show({
                title: "Success",
                message: "Schedule created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getAdminSchedule) {
                await getAdminSchedule();
                modals.closeAll();
            }
        } catch (error) {
            console.error("Error creating Schedule:", error);
            console.log("Backend response:", error.response?.data);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create Schedule!",
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
                <FormSchedule
                    submitFn={createFn}
                    initialValues={{
                        description: "",
                        file: null,
                    }}
                    loading={loading}
                />
            </Stack>
        </div>
    );
};

export default CreateSchedule;
