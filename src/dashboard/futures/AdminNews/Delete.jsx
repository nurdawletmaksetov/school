import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";

const DeleteNews = ({ id, news, setNews }) => {
    const deleteFn = async () => {
        try {
            await api.delete(`/news/delete/${id}`);
            setNews(news.filter((u) => u.id !== id));
            alert("Succesfully deleted");
            modals.closeAll();
        } catch (error) {
            console.error("Error deleting news:", error);
            alert("Error deleting news");
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


export default DeleteNews;