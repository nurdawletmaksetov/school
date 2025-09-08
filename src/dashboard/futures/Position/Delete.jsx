import { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeletePosition = ({ id, positions, setPositions, getPositions }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/positions/delete/${id}`);

            if (getPositions) await getPositions();
            else setPositions(positions.filter((u) => u.id !== id));

            modals.closeAll();

            alert("Position deleted successfully!");
        } catch (error) {
            console.error("Error deleting position:", error);

            alert("Failed to delete position!");
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
            <Text>Are you sure you want to delete this position?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Cancel</Button>
                <Button color="red" onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeletePosition;
