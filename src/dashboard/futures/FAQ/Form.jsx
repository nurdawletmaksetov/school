import { useForm } from "@mantine/form";
import { Button, Textarea, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

const FormFaq = ({ submitFn, initialValues }) => {
    const form = useForm({
        initialValues,
    });

    const handleSubmit = async (values) => {
        await submitFn(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Textarea
                    label="Question (kk)"
                    placeholder="Question"
                    {...form.getInputProps("question.kk")}
                />
                <Textarea
                    label="Question (uz)"
                    placeholder="Question"
                    {...form.getInputProps("question.uz")}
                />
                <Textarea
                    label="Question (ru)"
                    placeholder="Question "
                    {...form.getInputProps("question.ru")}
                />
                <Textarea
                    label="Question (en)"
                    placeholder="Question"
                    {...form.getInputProps("question.en")}
                />

                <Textarea
                    label="Answer (kk)"
                    placeholder="Answer"
                    minRows={2}
                    {...form.getInputProps("answer.kk")}
                />
                <Textarea
                    label="Answer (uz)"
                    placeholder="Answer"
                    minRows={2}
                    {...form.getInputProps("answer.uz")}
                />
                <Textarea
                    label="Answer (ru)"
                    placeholder="Answer"
                    minRows={2}
                    {...form.getInputProps("answer.ru")}
                />
                <Textarea
                    label="Answer (en)"
                    placeholder="Answer"
                    minRows={2}
                    {...form.getInputProps("answer.en")}
                />
                <Flex justify="end" gap={10}>
                    <Button onClick={() => modals.closeAll()}>Отмена</Button>
                    <Button type="submit">Сохранить</Button>
                </Flex>
            </Stack>
        </form>
    );
};

export default FormFaq;
