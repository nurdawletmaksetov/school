import { useState } from "react";
import { Stack, Button, Flex, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { api } from "../../../api/api";

const DeleteNews = ({ id, news, setNews, getNews }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/news/delete/${id}`);

            if (getNews) await getNews();
            else setNews(news.filter((c) => c.id !== id));

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "news deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting news:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete news!",
                color: "red",
                icon: <X />,
            });
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
            <Text>Are you sure you want to delete this news?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Cancel</Button>
                <Button color="red" onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteNews;
