import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormSchedule from "./Form";

const UpdateSchedule = ({ id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAdminSchedule = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/schedules/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching Schedule:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch Schedule!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAdminSchedule();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/schedules/update/${id}`, body);

            if (getAdminSchedule) {
                await getAdminSchedule();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Schedule updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Schedule:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update Schedule!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormSchedule
            submitFn={updateFn}
            initialValues={{
                description: {
                    ru: data.description.ru,
                    uz: data.description.uz,
                    en: data.description.en,
                    kk: data.description.kk,
                },
                file: null,
            }}
        />
    );
};

export default UpdateSchedule;
