import React, { useState } from "react";
import { Flex, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import FormUsers from "./Form";
import { api } from "../../../api/api";

const CreateUsers = ({ getUsers }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (newUser) => {
        setLoading(true);
        try {
            await api.post("/users/create", newUser);

            notifications.show({
                title: "Success",
                message: "User created successfully",
                color: "teal",
            });

            if (getUsers) {
                await getUsers();
                modals.closeAll();
            }
        } catch (error) {
            console.error(error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Could not create user",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack style={{ minHeight: "300px", justifyContent: "center" }}>
            <FormUsers
                submitFn={createFn}
                loading={loading}
                initialValues={{
                    full_name: { kk: "", uz: "", ru: "", en: "" },
                    birth_date: "",
                    phone: "",
                }}
            />
        </Stack>
    );
};

export default CreateUsers;
