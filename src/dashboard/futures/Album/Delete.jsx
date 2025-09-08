import React, { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeleteAlbum = ({ id, albums, setAlbums, getAlbums }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/albums/delete/${id}`);
            alert("✅ Album deleted successfully");

            if (getAlbums) await getAlbums();
            setAlbums(albums.filter((a) => a.id !== id));
            modals.closeAll();
        } catch (error) {
            console.error(error);
            alert("❌ Could not delete album");
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
                    <Button color="red" onClick={deleteFn}>Удалить</Button>
                </Flex>
            )}
        </Stack>
    );
};

export default DeleteAlbum;
