import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormVacancy from "./Form";
import { modals } from "@mantine/modals";

const CreateVacancy = ({ getVacancy }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/vacancies/create", body);

            notifications.show({
                title: "Success",
                message: "Vacancy created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getVacancy) {
                await getVacancy();
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
                <FormVacancy
                    submitFn={createFn}
                    initialValues={{
                        title: { kk: "", uz: "", ru: "", en: "" },
                        content: { kk: "", uz: "", ru: "", en: "" },
                        active: false,
                        salary: null,
                    }}
                    loading={loading}
                />
            </Stack>
        </div>
    );
};

export default CreateVacancy;
