import React, { useEffect, useState } from 'react'
import FormUsers from './Form';
import { api } from '../../../api/api';

const UpdateUsers = ({ id }) => {
    const [data, setData] = useState();

    async function getUsers() {
        try {
            const { data } = await api.get(`/users/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [id]);

    async function updateFn(body) {
        try {
            await api.put(`/users/update/${id}`, body);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
    return (
        <>
            {data && (
                <FormUsers
                    submitFn={updateFn}
                    initialValues={{
                        full_name: {
                            ru: data.full_name?.ru,
                            uz: data.full_name?.uz,
                            en: data.full_name?.en,
                            kk: data.full_name?.kk,
                        },

                        birth_date: data.birth_date,
                        phone: data.phone,
                    }}
                />
            )}
        </>
    )
}

export default UpdateUsers