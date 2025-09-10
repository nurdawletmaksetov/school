import { useState } from "react";
import { api } from "../../../api/api";
import FormPosition from "./Form";
import { Loader, Flex, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

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
            }
        } catch (error) {
            console.error("Error creating faq:", error);

            notifications.show({
                title: "Error",
                message: "Failed to create FAQ!",
                color: "red",
                icon: <X />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (
                <Stack>
                    <FormPosition
                        submitFn={createFn}
                        initialValues={{
                            question: { kk: "", uz: "", ru: "", en: "" },
                            answer: { kk: "", uz: "", ru: "", en: "" },
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default CreateFaqs;
