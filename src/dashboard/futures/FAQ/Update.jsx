import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormFaq from "./Form";

const UpdateFaq = ({ id, getFaqs }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getHistories = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/faqs/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching FAQ:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch FAQ!",
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
            await api.put(`/faqs/update/${id}`, body);
            if (getFaqs) {
                await getFaqs();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "FAQ updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating FAQ:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update FAQ!",
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
        <FormFaq
            loading={loading}
            submitFn={updateFn}
            initialValues={{
                question: {
                    ru: data?.question.ru,
                    uz: data?.question.uz,
                    en: data?.question.en,
                    kk: data?.question.kk,
                },
                answer: {
                    ru: data?.answer.ru,
                    uz: data?.answer.uz,
                    en: data?.answer.en,
                    kk: data?.answer.kk,
                },
            }}
        />
    );
};

export default UpdateFaq;
