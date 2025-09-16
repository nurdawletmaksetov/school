import React from 'react'
import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import DeleteHistory from '../futures/History/Delete';
import UpdateHistory from '../futures/History/Update';
import CreateHistory from '../futures/History/Create';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t } = useTranslation();
  const currentLang = "ru";

  const getHistory = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/histories?page=${page}&per_page=10`);
      setHistory(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching history:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch history!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateHistory getHistory={getHistory} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateHistory id={id} getHistory={getHistory} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteHistory
          id={id}
          history={history}
          setHistory={setHistory}
        />
      ),
    });
  };


  return (
    <>
      <Stack p={20} w="100%">
        <Flex justify="space-between" align="center">
          <Title>{t("sidebar.history")}</Title>
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
                <Table.Th>Year</Table.Th>
                <Table.Th>Text</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {history.map((el) => (
                <Table.Tr key={el.id}>
                  <Table.Td>{el.id}</Table.Td>
                  <Table.Td>{el.year}</Table.Td>
                  <Table.Td>{el.text[currentLang]}</Table.Td>
                  <Table.Td>
                    <Flex gap={10}>
                      <Button size='xs' color='red' onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
                      <Button size='xs' onClick={() => updateFn(el.id)}>{t("actions.update")}</Button>
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
    </>
  )
}

export default History