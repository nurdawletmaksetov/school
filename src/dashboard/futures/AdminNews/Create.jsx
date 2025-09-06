import React from 'react'
import { api } from '../../../api/api';
import FormNews from './Form';

const CreateNews = () => {
    async function createFn(body) {
        console.log("Payload:", body);
        await api.post("/news/create", body);
    }
    return (
        <div>
            <FormNews
                submitFn={createFn}
                initialValues={{
                    title: { kk: "", uz: "", ru: "", en: "" },
                    short_content: { kk: "", uz: "", ru: "", en: "" },
                    content: { kk: "", uz: "", ru: "", en: "" },
                    cover_image: "",
                }}
            />
        </div>
    )
}

export default CreateNews