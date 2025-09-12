import React, { useState } from "react";
import { Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";

const DeleteFaqs = ({ id, setFaqs, getFaqs }) => {
    const [loading, setLoading] = useState(false);

    const deleteFn = async () => {
        setLoading(true);
        try {
            await api.delete(`/faqs/delete/${id}`);

            if (getFaqs) {
                await getFaqs();
            } else if (Array.isArray(setFaqs) && setFaqs) {
                setFaqs(setFaqs.filter((u) => u.id !== id));
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

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ height: "150px" }}>
                <Loader variant="dots" />
            </Flex>
        );
    }

    return (
        <Stack>
            <Text>Are you sure you want to delete this Faqs?</Text>
            <Flex gap={10} justify="flex-end">
                <Button onClick={() => modals.closeAll()}>Cancel</Button>
                <Button color="red" onClick={deleteFn}>
                    Delete
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteFaqs;
