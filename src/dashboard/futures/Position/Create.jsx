import { useState } from "react";
import { api } from "../../../api/api";
import FormPosition from "./Form";
import { Loader, Flex, Stack } from "@mantine/core";

const CreatePosition = ({ getPositions }) => {
    const [loading, setLoading] = useState(false);

    const createFn = async (body) => {
        setLoading(true);
        try {
            await api.post("/positions/create", body);

            alert("Position created successfully!");

            if (getPositions) {
                await getPositions();
            }
        } catch (error) {
            console.error("Error creating position:", error);

            alert("Failed to create position!");
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
                            name: { kk: "", uz: "", ru: "", en: "" },
                            description: { kk: "", uz: "", ru: "", en: "" },
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default CreatePosition;
