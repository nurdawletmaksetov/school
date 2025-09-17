import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormRules from "./Form";

const CreateRules = ({ getRules }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/rules/create", body);

            notifications.show({
                title: "Success",
                message: "Rules created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getRules) {
                await getRules();
            }
            modals.closeAll();


        } catch (error) {
            console.error("Error creating Rules:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create Rules!",
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
                <FormRules
                    loading={loading}
                    submitFn={createFn}
                    initialValues={{
                        title: { kk: "", uz: "", ru: "", en: "" },
                        text: { kk: "", uz: "", ru: "", en: "" },
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateRules;
