import { useEffect, useState } from "react";
import FormClub from "./Form";
import { Flex, Loader, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Check, X } from "lucide-react";
import { api } from "../../../api/api";

const UpdateClub = ({ id, getClubs }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getClubById = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/clubs/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching club:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch club!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClubById();
    }, [id]);

    const updateFn = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name[kk]", values.name.kk);
            formData.append("name[uz]", values.name.uz);
            formData.append("name[ru]", values.name.ru);
            formData.append("name[en]", values.name.en);

            formData.append("text[kk]", values.text.kk);
            formData.append("text[uz]", values.text.uz);
            formData.append("text[ru]", values.text.ru);
            formData.append("text[en]", values.text.en);

            formData.append("schedule[kk]", values.schedule.kk);
            formData.append("schedule[uz]", values.schedule.uz);
            formData.append("schedule[ru]", values.schedule.ru);
            formData.append("schedule[en]", values.schedule.en);
            if (values.photo instanceof File) {
                formData.append("photo", values.photo);
            }

            formData.append("_method", "PUT");

            await api.post(`/clubs/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (getClubs) await getClubs();
            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Club updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating club:", error);
            notifications.show({
                title: "Error",
                message: error?.response?.data?.message || "Failed to update club. Make sure all required fields are filled.",
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
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormClub
            key={id}
            loading={loading}
            submitFn={updateFn}
            initialValues={{
                name: {
                kk: data?.name.kk,
                    uz: data?.name.uz,
                    ru: data?.name.ru,
                    en: data?.name.en,
                },
                text: {
                    kk: data?.text.kk,
                    uz: data?.text.uz,
                    ru: data?.text.ru,
                    en: data?.text.en,
                },
                schedule: {
                    kk: data?.schedule.kk,
                    uz: data?.schedule.uz,
                    ru: data?.schedule.ru,
                    en: data?.schedule.en,
                },
                photo: null,
            }}
        />
    );
};

export default UpdateClub;
