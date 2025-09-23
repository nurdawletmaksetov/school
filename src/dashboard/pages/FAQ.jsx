import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateFaqs from "../futures/FAQ/Create";
import DeleteFaqs from "../futures/FAQ/Delete";
import UpdateFaq from "../futures/FAQ/Update";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  const getFaqs = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/faqs?page=${page}&per_page=10`);
      setFaqs(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch FAQ!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqs(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateFaqs getFaqs={getFaqs} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateFaq id={id} getFaqs={getFaqs} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteFaqs
          id={id}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      ),
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>FAQ</Title>
        <Button onClick={() => createFn()}>{t("actions.create")}</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Table
          style={{
            fontSize: '12px',
            tableLayout: 'auto',
          }}
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {faqs.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.question[language]}</Table.Td>
                <Table.Td>{el.answer[language]}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button size="xs" color="red" onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
                    <Button size="xs" onClick={() => updateFn(el.id)}>{t("actions.update")}</Button>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      <Flex justify="center" mt="md">
        <Pagination total={lastPage} value={page} onChange={setPage} />
      </Flex>
    </Stack>
  )
}

export default FAQ