import { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

const DeleteVacancy = ({ id, vacancy, setVacancy, getVacancy }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/vacancies/delete/${id}`);
            if (getVacancy) await getVacancy();
            else setVacancy(vacancy.filter((u) => u.id !== id));

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Vacancy deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting Vacancy:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete Vacancy!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <Text>Are you sure you want to delete this Vacancy?</Text>
            <Flex gap={10} justify="flex-end">
                <Button color="gray" onClick={() => modals.closeAll()}>Cancel</Button>
                <Button color="red" loading={loading} onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteVacancy;
