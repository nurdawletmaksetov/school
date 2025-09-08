import React, { useEffect, useState } from "react";
import { Flex, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import FormAlbum from "./Form";
import { api } from "../../../api/api";

const UpdateAlbum = ({ id, albums, setAlbums }) => {
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAlbum = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/albums/${id}`);
            setAlbum(data.data);
        } catch (error) {
            console.error(error);
            alert("❌ Could not fetch album");
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

            if (Array.isArray(body.photos)) {
                body.photos.forEach((file) => {
                    formData.append("photos[]", file);
                });
            }

            formData.set("_method", "PUT");

            const { data } = await api.post(`/albums/update/${id}`, formData);
            setAlbums((prev) => prev.map((a) => (a.id === id ? data.data : a)));

            alert("✅ Album updated successfully");
            modals.closeAll();
        } catch (error) {
            console.error(error);
            alert("❌ Could not update album");
        } finally {
            setLoading(false);
        }
    };

    if (loading || !album) {
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
            initialValues={{
                kk: album.title.kk,
                uz: album.title.uz,
                ru: album.title.ru,
                en: album.title.en,
                photos: [],
            }}
        />
    );
};

export default UpdateAlbum;
