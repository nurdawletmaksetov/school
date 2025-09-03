import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeleteRules = ({ id, rules, setRules }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/rules/delete/${id}`);
            setRules(rules.filter((u) => u.id !== id));
            alert("Succesfully deleted");
            modals.closeAll();
        } catch (error) {
            console.error("Error deleting rules:", error);
            alert("Error deleting rules");
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


export default DeleteRules;
