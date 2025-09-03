import { api } from "../../../api/api";
import FormPosition from "./Form";

const CreatePosition = () => {
    async function createFn(body) {
        console.log("Payload:", body);
        await api.post("/positions/create", body);
    }

    return (
        <div>
            <FormPosition
                submitFn={createFn}
                initialValues={{
                    name: { kk: "", uz: "", ru: "", en: "" },
                    description: { kk: "", uz: "", ru: "", en: "" },
                }}
            />
        </div>
    );
};

export default CreatePosition;
