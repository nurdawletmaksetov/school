import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormSchoolHours from "./Form";

const UpdateSchoolHourse = ({ id, getSchoolHours }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getHourse = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/school-hours/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching School Hourse:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch School Hourse!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHourse();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/school-hours/update/${id}`, body);

            if (getSchoolHours) {
                await getSchoolHours();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "School Hourse updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating School Hourse:", error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to update School Hourse!",
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
        <FormSchoolHours
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                title: {
                    ru: data?.title.ru,
                    uz: data?.title.uz,
                    en: data?.title.en,
                    kk: data?.title.kk,
                },
                workday: {
                    ru: data?.workday.ru,
                    uz: data?.workday.uz,
                    en: data?.workday.en,
                    kk: data?.workday.kk,
                },
                holiday: {
                    ru: data?.holiday.ru,
                    uz: data?.holiday.uz,
                    en: data?.holiday.en,
                    kk: data?.holiday.kk,
                },
            }}
        />
    );
};

export default UpdateSchoolHourse;
