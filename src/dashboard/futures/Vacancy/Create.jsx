import { useState } from "react";
import { api } from "../../../api/api";
import FormPosition from "./Form";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

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
            }
        } catch (error) {
            console.error("Error creating position:", error);

            notifications.show({
                title: "Error",
                message: "Failed to create position!",
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
                    <FormPosition
                        submitFn={createFn}
                        initialValues={{
                            title: { kk: "", uz: "", ru: "", en: "" },
                            content: { kk: "", uz: "", ru: "", en: "" },
                            salary: "",
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default CreateVacancy;
