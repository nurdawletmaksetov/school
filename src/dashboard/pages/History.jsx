import React from 'react'
import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
// import { modals } from "@mantine/modals";
import { api } from "../../api/api";
const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";

  const getHistory = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/histories?page=${page}&per_page=10`);
      setHistory(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory(page);
  }, [page]);
  return (
    <>
      <Stack p={20} w="100%">
        <Flex justify="space-between" align="center">
          <Title>History</Title>
          <Button>Create</Button>
        </Flex>

        {loading ? (
          <Flex justify="center" align="center" style={{ height: "200px" }}>
            <Loader variant="dots" />
          </Flex>
        ) : (
          <Table
            horizontalSpacing="xl"
            verticalSpacing="sm"
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
                      <Button>Delete</Button>
                      <Button>Update</Button>
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