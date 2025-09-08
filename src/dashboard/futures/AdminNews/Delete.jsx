import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";

const DeleteNews = ({ id, news, setNews }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/news/delete/${id}`);
            setNews(news.filter((u) => u.id !== id));

            notifications.show({
                title: "✅ Success",
                message: "News deleted successfully",
                color: "green",
            });

            modals.closeAll();
        } catch (error) {
            console.error("Error deleting news:", error);

            notifications.show({
                title: "❌ Error",
                message: "Could not delete news",
                color: "red",
            });
        }
    };

    return (
        <Stack>
            <Text>Вы действительно хотите удалить?</Text>
            <Flex gap={10} justify="flex-end">
                <Button variant="default" onClick={() => modals.closeAll()}>
                    Отмена
                </Button>
                <Button color="red" onClick={deleteFn}>
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteNews;
