import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
// import { modals } from "@mantine/modals";
import { api } from "../../api/api";

const Club = () => {
  const [club, setClub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";

  const getClub = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/clubs?page=${page}&per_page=10`);
      setClub(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClub(page);
  }, [page]);

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Club</Title>
        <Button>Create</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Text</Table.Th>
              <Table.Th>Schedule</Table.Th>
              <Table.Th>Photo</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {club.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.name[currentLang]}</Table.Td>
                <Table.Td>{el.text[currentLang]}</Table.Td>
                <Table.Td>{el.schedule[currentLang]}</Table.Td>
                <Table.Td>{el.photo.path}</Table.Td>
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
  )
}

export default Club