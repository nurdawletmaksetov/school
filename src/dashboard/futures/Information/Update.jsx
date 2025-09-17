import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";

const UpdateInformation = ({ id, getInformation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getInformations = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/informations/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching Information:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch Information!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInformations();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/informations/update/${id}`, body);

            if (getInformation) {
                await getInformation();
            }

            if (getInformation) {
                await getInformation();
            }
            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Information updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Information:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update Information!",
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
            loading={loading}
            submitFn={updateFn}
            initialValues={{
                title: {
                    ru: data?.title?.ru || "",
                    uz: data?.title?.uz || "",
                    en: data?.title?.en || "",
                    kk: data?.title?.kk || "",
                },
                count: data?.count || 0,
                description: {
                    ru: data?.description?.ru || "",
                    uz: data?.description?.uz || "",
                    en: data?.description?.en || "",
                    kk: data?.description?.kk || "",
                },
            }}
        />
    );
};

export default UpdateInformation;
