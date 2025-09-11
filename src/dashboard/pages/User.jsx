import { useEffect, useState } from "react";
import { Button, Flex, Pagination, Stack, Table, Title, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { showNotification } from '@mantine/notifications';
import { api } from "../../api/api";
import CreateUsers from "../futures/Users/Create";
import DeleteUsers from "../futures/Users/Delete";
import UpdateUsers from "../futures/Users/Update";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentLang = "ru";
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getUsers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users?page=${page}&per_page=10`);
      setUsers(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Error",
        message: "Users could not be loaded",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateUsers getUsers={() => getUsers(page)} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: <DeleteUsers id={id} getUsers={() => getUsers(page)} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateUsers id={id} getUsers={() => getUsers(page)} />,
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Users</Title>
        <Button onClick={createFn}>Create</Button>
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
              <Table.Th>Birth Date</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.full_name[currentLang]}</Table.Td>
                <Table.Td>{el.birth_date}</Table.Td>
                <Table.Td>{el.phone}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button onClick={() => deleteFn(el.id)}>Delete</Button>
                    <Button onClick={() => updateFn(el.id)}>Update</Button>
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

export default Users;
