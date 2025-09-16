import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormSchoolHours from "./Form";
import { modals } from "@mantine/modals";

const CreateSchoolHours = ({ getSchoolHours }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/school-hours/create", body);

            notifications.show({
                title: "Success",
                message: "SchoolHours created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getSchoolHours) {
                await getSchoolHours();
                modals.closeAll();
            }
        } catch (error) {
            console.error("Error creating SchoolHours:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create SchoolHours!",
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
                <FormSchoolHours
                    submitFn={createFn}
                    loading={loading}
                    initialValues={{
                        title: { kk: "", uz: "", ru: "", en: "" },
                        workday: { kk: "", uz: "", ru: "", en: "" },
                        holiday: { kk: "", uz: "", ru: "", en: "" },
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateSchoolHours;
