import React, { useEffect, useState } from 'react'
import FormEmployee from './Form';
import { api } from '../../../api/api';

const UpdateEmployee = ({ id }) => {
    const [data, setData] = useState({});

    async function getEmployee() {
        try {
            const { data } = await api.get(`/employees/${id}`);
            setData(data.data.items);
            getEmployee();
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    }

    useEffect(() => {
        getEmployee();
    }, [id]);

    async function updateFn(body) {
        try {
            await api.put(`/employees/update/${id}`, body);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }
    return (
        <>
            {data && (
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
                        position: {
                            ru: data.position?.ru,
                            uz: data.position?.uz,
                            en: data.position?.en,
                            kk: data.position?.kk,
                        },
                        birth_date: data.birth_date,
                    }}
                />
            )}
        </>
    )
}

export default UpdateEmployee