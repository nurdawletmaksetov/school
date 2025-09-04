import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";

function AdminNews() {
  const [news, setNews] = useState([]);
  const currentLang = "ru";

  async function getNews() {
    try {
      const { data } = await api.get("/news");
      setNews(data.data.items);
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>News</Title>
        <Button>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Short Content</Table.Th>
            <Table.Th>Content</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {news.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td>{el.title[currentLang]}</Table.Td>
              <Table.Td>{el.short_content[currentLang]}</Table.Td>
              <Table.Td>{el.content[currentLang]}</Table.Td>
              <Table.Td>{el.full_name}</Table.Td>
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


export default AdminNews;
