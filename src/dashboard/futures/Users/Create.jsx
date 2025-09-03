import React from 'react'
import FormUsers from './Form';
import { api } from '../../../api/api';

const CreateUsers = () => {
    const createFn = async (newUser) => {
        try {
            const { data } = await api.post("/users/create", newUser);
            setUsers([...users, data]);
            alert("Successfully created");
            modals.closeAll();
        } catch (error) {
            console.error("Error creating user:", error);
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