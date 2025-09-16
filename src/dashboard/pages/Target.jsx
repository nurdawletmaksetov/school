import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateTarget from "../futures/Target/Create";
import UpdateTarget from "../futures/Target/Update";
import DeleteTarget from "../futures/Target/Delete";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Target = () => {
  const [target, setTarget] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";

  const getTarget = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/targets?page=${page}&per_page=10`);
      setTarget(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching target:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch target!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTarget(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateTarget getTarget={getTarget} />,
    });
  };


  const updateFn = (id) => {
    modals.open({
      children: <UpdateTarget id={id} getTarget={getTarget} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteTarget
          id={id}
          target={target}
          setTarget={setTarget}
        />
      ),
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.target")}</Title>
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
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {target.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.name[currentLang]}</Table.Td>
                <Table.Td>{el.description[currentLang]}</Table.Td>
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

export default Target