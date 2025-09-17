import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Pagination } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateNews from "../futures/AdminNews/Create";
import UpdateNews from "../futures/AdminNews/Update";
import DeleteNews from "../futures/AdminNews/Delete";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  async function getNews(page = 1) {
    setLoading(true);
    try {
      const { data } = await api.get(`/news?page=${page}&per_page=10`);
      setNews(data.data.items);
      setLastPage(data.data.pagination?.last_page || 1);
    } catch (error) {
      console.error("Error fetching news:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch news!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews(page);
  }, [page]);

  function createFn() {
    modals.open({
      children: <CreateNews getNews={getNews} />,
    });
  }

  function updateFn(id) {
    modals.open({
      children: <UpdateNews id={id} getNews={getNews} />,
    });
  }

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteNews
          id={id}
          news={news}
          setNews={setNews}
          getNews={getNews}
        />
      ),
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.news")}</Title>
        <Button onClick={createFn}>{t("actions.create")}</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Table
          style={{
            fontSize: "12px",
            tableLayout: "auto",
          }}
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
              <Table.Th>Tags</Table.Th>
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
                <Table.Td>{el.title?.[language]}</Table.Td>
                <Table.Td>{el.short_content?.[language]}</Table.Td>
                <Table.Td
                  style={{
                    maxWidth: "250px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {el.content?.[language]}
                </Table.Td>
                <Table.Td>
                  <div style={{ borderBottom: "1px solid black" }}>
                    Name: {el.author?.full_name?.[language]}
                  </div>
                  <div style={{ borderBottom: "1px solid black" }}>
                    Phone: {el.author?.phone}
                  </div>
                  <div>Birth Date: {el.author?.birth_date}</div>
                </Table.Td>
                <Table.Td>
                  <div>Name: {el.tags?.[0]?.name}</div>
                  <div>Description: {el.tags?.[0]?.description}</div>
                </Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button size="xs" color="red" onClick={() => deleteFn(el.id)}>
                      {t("actions.delete")}
                    </Button>
                    <Button size="xs" onClick={() => updateFn(el.id)}>
                      {t("actions.update")}
                    </Button>
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
