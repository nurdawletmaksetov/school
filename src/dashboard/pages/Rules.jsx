import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import CreateRules from "../futures/Rules/Create";
import DeleteRules from "../futures/Rules/Delete";
import UpdateRules from "../futures/Rules/Update";
import { api } from "../../api/api";

function AdminRules() {
  const [rules, setRules] = useState([]);
  const currentLang = "ru";

  async function getRules() {
    try {
      const { data } = await api.get("/rules");
      setRules(data.data.items);
    } catch (error) {
      console.error("Error fetching rules:", error)
    }
  }

  useEffect(() => {
    getRules();
  }, []);

  function createFn() {
    modals.open({
      children: (
        <CreateRules
          getRules={getRules}
        />
      )
    })
  }

  function deleteFn(id) {
    modals.open({
      children: (
        <DeleteRules
          id={id}
          rules={rules}
          setRules={setRules}
        />
      )
    })
  }

  function updateFn(id) {
    modals.open({
      children: (
        <UpdateRules
          id={id}
          rules={rules}
          setRules={setRules}
        />
      )
    })
  }

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Rules</Title>
        <Button onClick={createFn}>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
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
              <Table.Td>{el.title[currentLang]}</Table.Td>
              <Table.Td>{el.text[currentLang]}</Table.Td>
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


export default AdminRules;
