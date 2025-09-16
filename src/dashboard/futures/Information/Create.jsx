import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormInformation from "./Form";
import { modals } from "@mantine/modals";

const CreateInformation = ({ getInformation }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/informations/create", body);

            notifications.show({
                title: "Success",
                message: "Information created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getInformation) {
                await getInformation();
            }
            modals.closeAll();

        } catch (error) {
            console.error("Error creating Information:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create Information!",
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
                <FormInformation
                    submitFn={createFn}
                    initialValues={{
                        title: { kk: "", uz: "", ru: "", en: "" },
                        count: null,
                        description: { kk: "", uz: "", ru: "", en: "" },
                    }}
                    loading={loading}
                />
            </Stack>
        </div>
    );
};

export default CreateInformation;
