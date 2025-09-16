import { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

const DeleteHistory = ({ id, history, setHistory, getHistory }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/histories/delete/${id}`);

            if (getHistory) await getHistory();
            else setHistory(history.filter((u) => u.id !== id));

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "History deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting History:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete History!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <Text>Are you sure you want to delete this History?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Cancel</Button>
                <Button loading={loading} color="red" onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteHistory;
