import { useState } from "react";
import { Stack, Button, Flex, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { api } from "../../../api/api";
import { useTranslation } from "react-i18next";

const DeleteNews = ({ id, news, setNews, getNews }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

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

export default DeleteNews;
