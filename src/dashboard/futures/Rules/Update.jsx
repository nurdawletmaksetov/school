import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import FormPosition from "../Position/Form";

const UpdateRules = ({ id }) => {
    const [data, setData] = useState();

    async function getRules() {
        try {
            const { data } = await api.get(`/rules/${id}`);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching rules:", error);
        }
    }

    useEffect(() => {
        getRules();
    }, [id]);

    async function updateFn(body) {
        try {
            await api.put(`/rules/update/${id}`, body);
        } catch (error) {
            console.error("Error updating rules:", error);
        }
    }

    return (
        <>
            {data && (
                <FormPosition
                    submitFn={updateFn}
                    initialValues={{
                        title: {
                            ru: data.title.ru,
                            uz: data.title.uz,
                            en: data.title.en,
                            kk: data.title.kk,
                        },
                        text: {
                            ru: data.text.ru,
                            uz: data.text.uz,
                            en: data.text.en,
                            kk: data.text.kk,
                        },
                    }}
                />
            )}
        </>
    );
};

export default UpdateRules;
