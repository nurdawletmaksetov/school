import React, { useEffect, useState } from "react";
import { Flex, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import FormUsers from "./Form";
import { api } from "../../../api/api";

const UpdateUsers = ({ id, getUsers }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/users/${id}`);
            setData(data.data);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "Could not fetch user",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/users/update/${id}`, body);

            notifications.show({
                title: "Success",
                message: "User updated successfully",
                color: "teal",
            });

            if (getUsers) await getUsers();
            modals.closeAll();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Could not update user",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" />
            </Flex>
        );
    }

    return (
        <FormUsers
            submitFn={updateFn}
            loading={loading}
            initialValues={{
                full_name: {
                    ru: data?.full_name?.ru,
                    uz: data?.full_name?.uz,
                    en: data?.full_name?.en,
                    kk: data?.full_name?.kk,
                },
                birth_date: data?.birth_date,
                phone: data?.phone,
            }}
        />
    );
};

export default UpdateUsers;
