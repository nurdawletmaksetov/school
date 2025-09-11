import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormHistory from "./Form";

const CreateHistory = ({ getHistory }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/histories/create", body);

            notifications.show({
                title: "Success",
                message: "History created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getHistory) {
                await getHistory();
            }
            modals.closeAll();

        } catch (error) {
            console.error("Error creating History:", error);

            notifications.show({
                title: "Error",
                message: "Failed to create History!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (
                <Stack>
                    <FormHistory
                        submitFn={createFn}
                        initialValues={{
                            year: null,
                            text: { kk: "", uz: "", ru: "", en: "" },
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default CreateHistory;
