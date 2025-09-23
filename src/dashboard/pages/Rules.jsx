import { useEffect, useState } from "react";
import { Button, Flex, Loader, Pagination, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import CreateRules from "../futures/Rules/Create";
import DeleteRules from "../futures/Rules/Delete";
import UpdateRules from "../futures/Rules/Update";
import { api } from "../../api/api";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

function AdminRules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  async function getRules() {
    setLoading(true);
    try {
      const { data } = await api.get(`/rules?page=${page}&per_page=10`);
      setRules(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching rules:", error)
      notifications.show({
        title: "Error",
        message: "Failed to fetch rules!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRules(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateRules getRules={getRules} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteRules
          id={id}
          rules={rules}
          setRules={setRules}
        />
      ),
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateRules id={id} getRules={getRules} />,
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.rules")}</Title>
        <Button onClick={createFn}>{t("actions.create")}</Button>
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
              <Table.Th>Title</Table.Th>
              <Table.Th>Text</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rules.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.title[language]}</Table.Td>
                <Table.Td>{el.text[language]}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button color="red" size="xs" onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
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
  );
}


export default AdminRules;
