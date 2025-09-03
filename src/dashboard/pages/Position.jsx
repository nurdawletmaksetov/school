import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreatePosition from "../futures/Position/Create";
import DeletePosition from "../futures/Position/Delete";
import UpdatePosition from "../futures/Position/Update";

function Position() {
  const [positions, setPositions] = useState([]);

  async function getPositions() {
    try {
      const { data } = await api.get("/positions");
      setPositions(data.data.items);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  }

  useEffect(() => {
    getPositions();
  }, []);

  function deleteFn(id) {
    modals.open({
      children: (
        <DeletePosition
          id={id}
          positions={positions}
          setPositions={setPositions}
        />
      ),
    });
  }

  function createFn() {
    modals.open({
      children: (
        <CreatePosition
          getPositions={getPositions}
        />
      ),
    });
  }

  function updateFn(id) {
    modals.open({
      children: (
        <UpdatePosition
          id={id}
          getPositions={getPositions}
        />
      ),
    });
  }


  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Positions</Title>
        <Button onClick={createFn}>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {positions.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td>{el.name.ru}</Table.Td>
              <Table.Td>{el.description.ru}</Table.Td>
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


export default Position;
