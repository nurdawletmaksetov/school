import React, { useState } from "react";
import { Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const DeleteEmployee = ({ id, employee, setEmployee, getEmployees }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/employees/delete/${id}`);

            if (getEmployees) {
                await getEmployees();
            } else if (Array.isArray(employee) && setEmployee) {
                setEmployee(employee.filter((u) => u.id !== id));
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Employee deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting Employee:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete Employee!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <Text>{t("messages.confirmDelete")}</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()} color="gray">{t("actions.cancel")}</Button>
                <Button color="red" onClick={deleteFn} loading={loading}>
                    {t("actions.delete")}
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteEmployee;
