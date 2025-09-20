import React, { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { api } from "../../../api/api";
import { useTranslation } from "react-i18next";

const DeleteAlbum = ({ id, albums, setAlbums, getAlbums }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/albums/delete/${id}`);

            notifications.show({
                title: "Success",
                message: "Album deleted successfully",
                color: "teal",
                icon: <Check />,
            });

            if (getAlbums) await getAlbums();
            setAlbums(albums.filter((a) => a.id !== id));
            modals.closeAll();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "Could not delete album",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack>
            <Text>{t("messages.confirmDelete")}</Text>
            <Flex gap={10} justify="flex-end">
                <Button color="gray" onClick={() => modals.closeAll()}>{t("actions.cancel")}</Button>
                <Button color="red" loading={loading} onClick={deleteFn}>
                    {t("actions.delete")}
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteAlbum;
