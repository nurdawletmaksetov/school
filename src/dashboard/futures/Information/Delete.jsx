import { useState } from "react";
import { Button, Flex, Stack, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { useTranslation } from "react-i18next";

const DeleteInformation = ({ id, information, setInformation, getInformation }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/informations/delete/${id}`);

            if (getInformation) await getInformation();
            else setInformation(information.filter((u) => u.id !== id));

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Information deleted successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error deleting information:", error);

            notifications.show({
                title: "Error",
                message: "Failed to delete information!",
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

export default DeleteInformation;
