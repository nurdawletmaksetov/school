import React, { useEffect, useState } from 'react'
import FormEmployee from './Form';
import { api } from '../../../api/api';
import { Flex, Loader, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Check, X } from "lucide-react";

const UpdateEmployee = ({ id, getEmployee }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEmployee = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/employees/${id}`);
            setData(data.data.items);
        } catch (error) {
            console.error("Error fetching employee:", error);
            notifications.show({
                title: "Error",
                message: "Failed to fetch employee!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const updateFn = async (body) => {
        setLoading(true);
        try {
            await api.put(`/employees/update/${id}`, body);

            if (getEmployee) {
                await getEmployee();
            }

            modals.closeAll();

            notifications.show({
                title: "Success",
                message: "Employee updated successfully!",
                color: "teal",
                icon: <Check />,
            });
        } catch (error) {
            console.error("Error updating Employee:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update Employee!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !data) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Stack align="center">
                    <Loader variant="dots" size="lg" />
                </Stack>
            </Flex>
        );
    }

    return (
        <FormEmployee
            key={id}
            submitFn={updateFn}
            initialValues={{
                full_name: {
                    ru: data.full_name?.ru,
                    uz: data.full_name?.uz,
                    en: data.full_name?.en,
                    kk: data.full_name?.kk,
                },
                phone: data.phone,
                photo: data.photo,
                email: data.email,
                position: data.position_id,
                birth_date: data.birth_date,
                description: {
                    ru: data.description?.ru,
                    uz: data.description?.uz,
                    en: data.description?.en,
                    kk: data.description?.kk,
                }
            }}
        />
    );
}

export default UpdateEmployee
