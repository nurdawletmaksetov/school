import React, { useState } from "react";
import FormEmployee from "./Form";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Stack } from "@mantine/core";
import { Check, X } from "lucide-react";
import { modals } from "@mantine/modals";

const CreateEmployee = ({ getEmployee }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("full_name[kk]", values.full_name.kk);
            formData.append("full_name[uz]", values.full_name.uz);
            formData.append("full_name[ru]", values.full_name.ru);
            formData.append("full_name[en]", values.full_name.en);

            formData.append("phone", values.phone);
            formData.append("email", values.email);

            formData.append("position_id", Number(values.position_id));

            formData.append("birth_date", values.birth_date);

            if (values.photo) {
                formData.append("photo", values.photo);
            }

            await api.post("/employees/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (getEmployee) {
                await getEmployee();
                modals.closeAll();
            }

            notifications.show({
                title: "Success",
                message: "Employee created successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error creating Employee:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create Employee!",
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
                <FormEmployee
                    submitFn={createFn}
                    loading={loading}
                    initialValues={{
                        full_name: { kk: "", uz: "", ru: "", en: "" },
                        phone: "",
                        photo: null,
                        email: "",
                        position_id: "",
                        birth_date: "",
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateEmployee;
