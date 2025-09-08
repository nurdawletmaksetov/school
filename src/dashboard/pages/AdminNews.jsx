import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Pagination } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateNews from "../futures/AdminNews/Create";
import UpdateNews from "../futures/AdminNews/Update";
import DeleteNews from "../futures/AdminNews/Delete";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";

  async function getNews(page = 1) {
    setLoading(true);
    try {
      const { data } = await api.get(`/news?page=${page}&per_page=10`);
      setNews(data.data.items);
      setLastPage(data.data.pagination?.last_page || 1);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("❌ Could not fetch news");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews(page);
  }, [page]);

  function createFn() {
    modals.open({
      children: <CreateNews getNews={() => getNews(page)} />,
    });
  }

  function updateFn(id) {
    modals.open({
      children: <UpdateNews id={id} getNews={() => getNews(page)} />,
    });
  }

  function deleteFn(id) {
    modals.open({
      children: <DeleteNews id={id} getNews={() => getNews(page)} />,
    });
  }

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>News</Title>
        <Button onClick={createFn}>Create</Button>
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
              <Table.Th>Image</Table.Th>
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
                <Table.Td>
                  <img
                    src={el.cover_image?.path}
                    alt="cover"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                </Table.Td>
                <Table.Td>{el.title?.[currentLang]}</Table.Td>
                <Table.Td>{el.short_content?.[currentLang]}</Table.Td>
                <Table.Td
                  style={{
                    maxWidth: "500px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >{el.content?.[currentLang]}</Table.Td>
                <Table.Td>{el.author?.full_name?.[currentLang]}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button color="red" onClick={() => deleteFn(el.id)}>
                      Delete
                    </Button>
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

export default AdminNews;
