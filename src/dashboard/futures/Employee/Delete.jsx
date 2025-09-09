import React, { useState } from "react";
import { Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";

const DeleteEmployee = ({ id, employee, setEmployee, getEmployees }) => {
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

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ height: "150px" }}>
                <Loader variant="dots" />
            </Flex>
        );
    }

    return (
        <Stack>
            <Text>Are you sure you want to delete this employee?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Cancel</Button>
                <Button color="red" onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteEmployee;
