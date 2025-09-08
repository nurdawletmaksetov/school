import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";

const UpdatePosition = ({ id, getPositions }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPosition = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/positions/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching position:", error);
            alert("Failed to fetch position!");
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
            await api.put(`/positions/update/${id}`, body);

            if (getPositions) {
                await getPositions();
            }

            alert("Position updated successfully!");
        } catch (error) {
            console.error("Error updating position:", error);

            alert("Failed to update position!");
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

export default UpdatePosition;
