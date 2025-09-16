import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormHistory from "./Form";

const UpdateHistory = ({ id, getHistory }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getHistories = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/histories/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching History:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch History!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistories();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/histories/update/${id}`, body);

            if (getHistory) {
                await getHistory();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "History updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating History:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update History!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormHistory
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                year: data?.year,
                text: {
                    ru: data?.text.ru,
                    uz: data?.text.uz,
                    en: data?.text.en,
                    kk: data?.text.kk,
                },
            }}
        />
    );
};

export default UpdateHistory;
