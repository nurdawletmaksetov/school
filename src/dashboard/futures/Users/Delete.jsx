import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { api } from "../../../api/api";
import { t } from "i18next";

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
            <Text>{t("messages.confirmDelete")}</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()} color="gray">{t("actions.cancel")}</Button>
                <Button loading={loading} color="red" onClick={deleteFn}>
                    {t("actions.delete")}
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteUsers;
