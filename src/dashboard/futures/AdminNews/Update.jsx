import React, { useEffect, useState } from 'react'
import { api } from '../../../api/api';
import FormNews from './Form';

const UpdateNews = ({ id }) => {
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
            await api.put(`/news/update/${id}`, body);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }
    return (
        <>
            {data && (
                <FormNews
                    key={id}
                    submitFn={updateFn}
                    initialValues={{
                        title: {
                            ru: data.title?.ru,
                            uz: data.title?.uz,
                            en: data.title?.en,
                            kk: data.title?.kk,
                        },
                        short_content: {
                            ru: data.short_content?.ru,
                            uz: data.short_content?.uz,
                            en: data.short_content?.en,
                            kk: data.short_content?.kk,
                        },
                        content: {
                            ru: data.content?.ru,
                            uz: data.content?.uz,
                            en: data.content?.en,
                            kk: data.content?.kk,
                        },
                        cover_image: data.cover_image,
                    }}
                />
            )}
        </>
    )
}

export default UpdateNews