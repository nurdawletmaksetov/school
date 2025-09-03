import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateUsers from "../futures/Users/Create";
import DeleteUsers from "../futures/Users/Delete";
import UpdateUsers from "../futures/Users/Update";

function Users() {
  const [users, setUsers] = useState([]);
  const currentLang = "ru";

  async function getUsers() {
    try {
      const { data } = await api.get("/users");
      setUsers(data.data.items);
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function createFn() {
    modals.open({
      children: (
        <CreateUsers
          getUsers={getUsers}
        />
      )
    })
  }

  function deleteFn(id) {
    modals.open({
      children: (
        <DeleteUsers
          id={id}
          users={users}
          setUsers={setUsers}
        />
      )
    })
  }

  function updateFn(id) {
    modals.open({
      children: (
        <UpdateUsers
          id={id}
          users={users}
          setUsers={setUsers}
        />
      )
    })
  }

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Users</Title>
        <Button onClick={createFn}>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
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
    </Stack>
  );
}


export default Users;
