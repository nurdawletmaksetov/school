import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeletePosition = ({ id, positions, setPositions }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/positions/delete/${id}`);
            setPositions(positions.filter((u) => u.id !== id));
            alert("Succesfully deleted");
            modals.closeAll();
        } catch (error) {
            console.error("Error deleting position:", error);
            alert("Error deleting user");
        }
    };

    return (
        <Stack>
            <Text>Вы действительно хотите удалить?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Отмена</Button>
                <Button onClick={deleteFn}>Удалить</Button>
            </Flex>
        </Stack>
    );
};


export default DeletePosition;
