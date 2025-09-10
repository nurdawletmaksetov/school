import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
// import { modals } from "@mantine/modals";
import { api } from "../../api/api";


const AdminSchedule = () => {
  const [AdminSchedule, setAdminSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getAdminSchedule = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/schedules?page=${page}&per_page=10`);
      setAdminSchedule(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching Schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminSchedule(page);
  }, [page]);

  return (
    <>
      <Stack p={20} w="100%">
        <Flex justify="space-between" align="center">
          <Title>Schedule</Title>
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
                <Table.Th>Description</Table.Th>
                <Table.Th>Download</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {AdminSchedule.map((el) => (
                <Table.Tr key={el.id}>
                  <Table.Td>{el.id}</Table.Td>
                  <Table.Td>{el.description}</Table.Td>
                  <Table.Td>
                    <Button>Download</Button>
                  </Table.Td>
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

export default AdminSchedule;