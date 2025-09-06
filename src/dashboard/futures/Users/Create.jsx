import React from 'react'
import FormUsers from './Form';
import { api } from '../../../api/api';

const CreateUsers = () => {
    const createFn = async (newUser) => {
        try {
            await api.post("/users/create", newUser);
            await getUsers();
            modals.closeAll();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div>
            <FormUsers
                submitFn={createFn}
                initialValues={{
                    full_name: { kk: "", uz: "", ru: "", en: "" },
                    birth_date: "",
                    phone: "",
                }}
            />
        </div>
    )
}

export default CreateUsers;