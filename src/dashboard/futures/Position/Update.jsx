import { useEffect, useState } from "react";
import FormPosition from "./Form";
import { api } from "../../../api/api";

const UpdatePosition = ({ id }) => {
    const [data, setData] = useState();

    async function getPosition() {
        try {
            const { data } = await api.get(`/positions/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching position:", error);
        }
    }

    useEffect(() => {
        getPosition();
    }, [id]);

    async function updateFn(body) {
        try {
            await api.put(`/positions/update/${id}`, body);
        } catch (error) {
            console.error("Error updating position:", error);
        }
    }

    return (
        <>
            {data && (
                <FormPosition
                    submitFn={updateFn}
                    initialValues={{
                        name: {
                            ru: data.name.ru,
                            uz: data.name.uz,
                            en: data.name.en,
                            kk: data.name.kk,
                        },
                        description: {
                            ru: data.description.ru,
                            uz: data.description.uz,
                            en: data.description.en,
                            kk: data.description.kk,
                        },
                    }}
                />
            )}
        </>
    );
};

export default UpdatePosition;
