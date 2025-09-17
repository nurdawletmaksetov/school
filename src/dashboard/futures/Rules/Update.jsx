import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";

const UpdateRules = ({ id, getRules }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const getRule = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/rules/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching Rule:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch Rule!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRule();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/rules/update/${id}`, body);

            if (getRules) {
                await getRules();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Rule updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Rule:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update Rule!",
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
                title: {
                    ru: data?.title.ru,
                    uz: data?.title.uz,
                    en: data?.title.en,
                    kk: data?.title.kk,
                },
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

export default UpdateRules;
