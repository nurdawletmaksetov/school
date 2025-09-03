import { Button, Flex, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import React from 'react'
import { api } from '../../../api/api';

const DeleteUsers = ({ id, users, setUsers }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/users/delete/${id}`);
            setUsers(users.filter((u) => u.id !== id));
            alert("Successfully deleted");
            modals.closeAll();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user");
        }
    }
    return (
        <Stack>
            <Text>Вы действительно хотите удалить?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Отмена</Button>
                <Button onClick={deleteFn}>Удалить</Button>
            </Flex>
        </Stack>
    )
}

export default DeleteUsers