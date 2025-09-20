import React, { useEffect, useState } from "react";
import { Flex, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import FormAlbum from "./Form";
import { api } from "../../../api/api";

const UpdateAlbum = ({ id, albums, setAlbums, getAlbums }) => {
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAlbum = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/albums/${id}`);
            setAlbum(data.data);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "Could not fetch album",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAlbum();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set("title[kk]", body.kk);
            formData.set("title[uz]", body.uz);
            formData.set("title[ru]", body.ru);
            formData.set("title[en]", body.en);

            formData.set("description[kk]", body.description.kk);
            formData.set("description[uz]", body.description.uz);
            formData.set("description[ru]", body.description.ru);
            formData.set("description[en]", body.description.en);

            if (Array.isArray(body.photos)) {
                body.photos.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("photos[]", file);
                    } else {
                        formData.append("existing_photos[]", file.id || file);
                    }
                });
            }

            formData.set("_method", "PUT");

            const { data } = await api.post(`/albums/update/${id}`, formData);

            setAlbums((prev) =>
                prev.map((a) => (a.id === id ? data.data : a))
            );

            notifications.show({
                title: "Success",
                message: "Album updated successfully",
                color: "teal",
                icon: <Check />,
            });

            if (getAlbums) {
                await getAlbums();
            }
            modals.closeAll();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Could not update album",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !album) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Stack align="center">
                    <Loader variant="dots" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormAlbum
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                kk: album?.title?.kk,
                uz: album?.title?.uz,
                ru: album?.title?.ru,
                en: album?.title?.en,
                description: album?.description,
                photos: album?.photos || [],
            }}
        />
    );
};

export default UpdateAlbum;
