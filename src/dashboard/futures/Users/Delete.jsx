import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { api } from "../../../api/api";

const DeleteUsers = ({ id, getUsers }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/users/delete/${id}`);

            notifications.show({
                title: "Success",
                message: "User deleted successfully",
                color: "teal",
            });

            if (getUsers) await getUsers(); 
            modals.closeAll();
        } catch (error) {
            console.error(error);

            notifications.show({
                title: "Error",
                message: "Could not delete user",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <Text>Вы действительно хотите удалить?</Text>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "50px" }}>
                    <Loader variant="dots" />
                </Flex>
            ) : (
                <Flex gap={10} justify="flex-end">
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button color="red" onClick={deleteFn}>
                        Удалить
                    </Button>
                </Flex>
            )}
        </Stack>
    );
};

export default DeleteUsers;
