import React from 'react'
import FormEmployee from './Form';
import { api } from '../../../api/api';

const CreateEmployee = () => {
    async function createFn(body) {
        console.log("Payload:", body);
        await api.post("/employees/create", body);
    }
    return (
        <div>
            <FormEmployee
                submitFn={createFn}
                initialValues={{
                    full_name: { kk: "", uz: "", ru: "", en: "" },
                    phone: "",
                    photo: "",
                    email: "",
                    position: "",
                    birth_date: "",
                }}
            />
        </div>
    )
}

export default CreateEmployee