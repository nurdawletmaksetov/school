import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormSchedule from "./Form";

const CreateSchedule = ({ getAdminSchedule }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/schedules/create", body);

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

            notifications.show({
                title: "Error",
                message: "Failed to create Schedule!",
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
                    <FormSchedule
                        submitFn={createFn}
                        initialValues={{
                            description: { kk: "", uz: "", ru: "", en: "" },
                            file: null,
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default CreateSchedule;
