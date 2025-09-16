import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormVacancy from "./Form";

const UpdateVacancy = ({ id, getVacancy }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getVacancies = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/vacancies/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching Vacancy:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch Vacancy!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVacancies();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/vacancies/update/${id}`, body);
            await getVacancy();
            if (getVacancy) await getVacancy();
            modals.closeAll();
            notifications.show({
                title: "Success",
                message: "Position updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Vacancy:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update Vacancy!",
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
        <FormVacancy
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                title: {
                    ru: data?.title?.ru || "",
                    uz: data?.title?.uz || "",
                    en: data?.title?.en || "",
                    kk: data?.title?.kk || "",
                },
                content: {
                    ru: data?.content?.ru || "",
                    uz: data?.content?.uz || "",
                    en: data?.content?.en || "",
                    kk: data?.content?.kk || "",
                },
                active: data?.active || false,
                salary: data?.salary || "",
            }}
        />
    );
};

export default UpdateVacancy;
