import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";

const UpdateSchool = ({ id, getPositions }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSchools = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/schools/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching school:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch school!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSchools();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/schools/update/${id}`, body);

            if (getPositions) {
                await getPositions();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Position updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating position:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update position!",
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
        <FormPosition
            submitFn={updateFn}
            initialValues={{
                name: {
                    ru: data.name.ru,
                    uz: data.name.uz,
                    en: data.name.en,
                    kk: data.name.kk,
                },
                name: {
                    ru: data.history.ru,
                    uz: data.history.uz,
                    en: data.history.en,
                    kk: data.history.kk,
                },
                phone: data.phone,
                location: data.location,
                description: {
                    ru: data.description.ru,
                    uz: data.description.uz,
                    en: data.description.en,
                    kk: data.description.kk,
                },
            }}
        />
    );
};

export default UpdateSchool;
