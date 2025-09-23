import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormSchool from "./Form";

const UpdateSchool = ({ id, getSchools }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSchool = async () => {
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
        fetchSchool();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/schools/update/${id}`, body);

            await fetchSchool();

            if (getSchools) {
                await getSchools();
                modals.closeAll();
            }


            notifications.show({
                title: "Success",
                message: "School updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating school:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update school!",
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
        <FormSchool
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                name: {
                    ru: data?.name?.ru || "",
                    uz: data?.name?.uz || "",
                    en: data?.name?.en || "",
                    kk: data?.name?.kk || "",
                },
                history: {
                    ru: data?.history?.ru || "",
                    uz: data?.history?.uz || "",
                    en: data?.history?.en || "",
                    kk: data?.history?.kk || "",
                },
                phone: data?.phone || "",
                location: data?.location || "",
                email: data?.email || "",
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

export default UpdateSchool;
