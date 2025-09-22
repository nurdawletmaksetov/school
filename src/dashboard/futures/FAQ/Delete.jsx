import React, { useState } from "react";
import { Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const DeleteFaqs = ({ id, setFaqs, getFaqs }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/faqs/delete/${id}`);

            if (getFaqs) {
                await getFaqs();
            } else if (setFaqs) {
                setFaqs((prevFaqs) => prevFaqs.filter((u) => u.id !== id));
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Faqs deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting Faqs:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete Faqs!",
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

export default DeleteFaqs;
