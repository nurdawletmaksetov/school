import React, { useState } from "react";
import FormEmployee from "./Form";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Flex, Loader, Stack } from "@mantine/core";
import { Check, X } from "lucide-react";

const CreateEmployee = ({ getEmployees }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/employees/create", body);

            notifications.show({
                title: "Success",
                message: "Employee created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getEmployees) {
                await getEmployees();
            }
        } catch (error) {
            console.error("Error creating Employee:", error);

            notifications.show({
                title: "Error",
                message: "Failed to create Employee!",
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
                    <FormEmployee
                        submitFn={createFn}
                        initialValues={{
                            full_name: { kk: "", uz: "", ru: "", en: "" },
                            phone: "",
                            photo: null,
                            email: "",
                            position_id: "",
                            birth_date: "",
                            description: { kk: "", uz: "", ru: "", en: "" },
                        }}
                    />

                </Stack>
            )}
        </div>
    );
};

export default CreateEmployee;
