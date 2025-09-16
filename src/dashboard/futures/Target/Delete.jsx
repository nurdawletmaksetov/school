import { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { useTranslation } from "react-i18next";

const DeleteTarget = ({ id, target, setTarget, getTarget }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/targets/delete/${id}`);

            if (getTarget) await getTarget();
            else setTarget(target.filter((u) => u.id !== id));

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Position deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting position:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete position!",
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
                <Button loading={loading} color="red" onClick={deleteFn}>
                    {t("actions.delete")}
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteTarget;
