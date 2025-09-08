import React, { useState } from 'react';
import { Flex, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import FormUsers from './Form';
import { api } from '../../../api/api';

const CreateUsers = ({ getUsers }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (newUser) => {
        setLoading(true);
        try {
            await api.post("/users/create", newUser);

            alert("✅ User created successfully");

            if (getUsers) await getUsers();
            modals.closeAll();
        } catch (error) {
            console.error(error);

            // Alert bilan error
            alert("❌ Could not create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack style={{ minHeight: "300px", justifyContent: "center" }}>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (
                <FormUsers
                    submitFn={createFn}
                    initialValues={{
                        full_name: { kk: "", uz: "", ru: "", en: "" },
                        birth_date: "",
                        phone: "",
                    }}
                />
            )}
        </Stack>
    );
};

export default CreateUsers;
