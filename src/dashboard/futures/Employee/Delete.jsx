import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeleteEmployee = ({ id, employee, setEmployee }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/employees/delete/${id}`);
            setEmployee(employee.filter((u) => u.id !== id));
            alert("Succesfully deleted");
            modals.closeAll();
        } catch (error) {
            console.error("Error deleting employee:", error);
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


export default DeleteEmployee;
