import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";

function Document() {
  const [documents, setDocuments] = useState([]);
  const currentLang = "ru";

  async function getDocuments() {
    try {
      const { data } = await api.get("/documents");
      setDocuments(data.data.items);
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Documents</Title>
        <Button>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Download</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {documents.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td>{el.name}</Table.Td>
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
    </Stack>
  );
}


export default Document;
