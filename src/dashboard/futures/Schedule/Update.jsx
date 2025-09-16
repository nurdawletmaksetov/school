import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "tabler-icons-react";
import FormSchedule from "./Form";

const UpdateSchedule = ({ id, getAdminSchedule }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSchedules = async () => {
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
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSchedules();
    }, [id]);


    const updateFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("description", body.description?.trim() || "");

            if (body.file instanceof File) {
                formData.append("file", body.file);
            }

            formData.append("_method", "PUT");

            await api.post(`/schedules/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

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
                message: error.response?.data?.message || "Failed to update Schedule!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Loader />
            </Flex>
        );
    }


    return (
        <FormSchedule
            submitFn={updateFn}
            initialValues={{
                description: data?.description,
                file: null,
            }}
            loading={loading}
        />
    );
};

export default UpdateSchedule;
