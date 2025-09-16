import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormTarget from "./Form";
import { modals } from "@mantine/modals";

const CreateTarget = ({ getTarget }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/targets/create", body);
            notifications.show({
                title: "Success",
                message: "Position created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getTarget) {
                await getTarget();
                modals.closeAll();
            }
        } catch (error) {
            console.error("Error creating position:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create position!",
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
                <FormTarget
                    submitFn={createFn}
                    loading={loading}
                    initialValues={{
                        name: { kk: "", uz: "", ru: "", en: "" },
                        description: { kk: "", uz: "", ru: "", en: "" },
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateTarget;
