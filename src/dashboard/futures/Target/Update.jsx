import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";

const UpdateTarget = ({ id, getTarget }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPosition = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/targets/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching target:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch target!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosition();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/targets/update/${id}`, body);

            if (getTarget) {
                await getTarget();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Position updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating target:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update target!",
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
        <FormPosition
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                name: {
                    ru: data?.name.ru,
                    uz: data?.name.uz,
                    en: data?.name.en,
                    kk: data?.name.kk,
                },
                description: {
                    ru: data?.description.ru,
                    uz: data?.description.uz,
                    en: data?.description.en,
                    kk: data?.description.kk,
                },
            }}
        />
    );
};

export default UpdateTarget;
