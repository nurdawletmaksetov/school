import { useState } from "react";
import { api } from "../../../api/api";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { modals } from "@mantine/modals";
import FormFaq from "./Form";

const CreateFaqs = ({ getFaqs }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/faqs/create", body);

            notifications.show({
                title: "Success",
                message: "FAQ created successfully!",
                color: "teal",
                icon: <Check />,
            });

            if (getFaqs) {
                await getFaqs();
                modals.closeAll();
            }
        } catch (error) {
            console.error("Error creating faq:", error);

            notifications.show({
                title: "Error",
                message: error.response?.data?.message || "Failed to create FAQ!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Stack>
                <FormFaq
                    loading={loading}
                    submitFn={createFn}
                    initialValues={{
                        question: { kk: "", uz: "", ru: "", en: "" },
                        answer: { kk: "", uz: "", ru: "", en: "" },
                    }}
                />
            </Stack>
        </div>
    );
};

export default CreateFaqs;
