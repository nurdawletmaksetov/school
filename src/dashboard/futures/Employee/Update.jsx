import React, { useEffect, useState } from "react";
import FormEmployee from "./Form";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Flex, Loader, Stack } from "@mantine/core";
import { Check, X } from "lucide-react";
import { modals } from "@mantine/modals";

const UpdateEmployee = ({ id, getEmployee }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEmployeeById = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/employees/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching employee:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch employee!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeeById();
    }, [id]);

    const updateFn = async (values) => {
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

            if (values.photo instanceof File) {
                formData.append("photo", values.photo);
            }

            formData.append("_method", "PUT");

            await api.post(`/employees/update/${id}`, formData, {
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
                message: "Employee updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Employee:", error);
            notifications.show({
                title: "Error",
                message:
                    error.response?.data?.message || "Failed to update Employee!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" size="lg" />
            </Flex>
        );
    }

    return (
        <Stack>
            {data && (
                <FormEmployee
                    submitFn={updateFn}
                    loading={loading}
                    initialValues={{
                        full_name: {
                            kk: data?.full_name?.kk || "",
                            uz: data?.full_name?.uz || "",
                            ru: data?.full_name?.ru || "",
                            en: data?.full_name?.en || "",
                        },
                        phone: data?.phone || "",
                        photo: null,
                        email: data?.email || "",
                        position_id: data?.position?.id || "",
                        birth_date: data?.birth_date || "",
                    }}
                />
            )}
        </Stack>
    );
};

export default UpdateEmployee;
