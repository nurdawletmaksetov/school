import { api } from "../../../api/api";
import FormRules from "./Form";

const CreateRules = () => {
    async function createFn(body) {
        console.log("Payload:", body);
        await api.post("/rules/create", body);
    }

    return (
        <div>
            <FormRules
                submitFn={createFn}
                initialValues={{
                    title: { kk: "", uz: "", ru: "", en: "" },
                    text: { kk: "", uz: "", ru: "", en: "" },
                }}
            />
        </div>
    );
};

export default CreateRules;
