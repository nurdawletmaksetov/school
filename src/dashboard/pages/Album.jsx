import { useEffect, useState } from "react";
import { Button, Flex, Group, Pagination, Stack, Table, Title, Loader, Text, Notification } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import UpdateAlbum from "../futures/Album/Update";
import CreateAlbum from "../futures/Album/Create";
import DeleteALbum from "../futures/Album/Delete";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  async function getAlbums(page = 1) {
    setLoading(true);
    try {
      const { data } = await api.get(`/albums?page=${page}&per_page=10`);
      setAlbums(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching albums:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch albums!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAlbums(page);
  }, [page]);

  function createFn() {
    modals.open({
      title: "Create",
      children: <CreateAlbum getAlbums={getAlbums} />,
    });
  }

  function updateFn(id) {
    modals.open({
      title: "Update",
      children: <UpdateAlbum id={id} albums={albums} setAlbums={setAlbums} getAlbums={getAlbums} />,
    });
  }

  function deleteFn(id) {
    modals.open({
      children: <DeleteALbum id={id} albums={albums} setAlbums={setAlbums} getAlbums={getAlbums} />,
    });
  }

  return (
    <Stack p={20}>
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.album")}</Title>
        <Button onClick={createFn}>{t("actions.create")}</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Table
          style={{
            fontSize: '12px',
            tableLayout: 'auto',
          }}
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Picture</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {albums
              .filter((album) => album && album.id)
              .map((album) => (
                <Table.Tr key={album.id}>
                  <Table.Td>{album.id}</Table.Td>
                  <Table.Td>{album.title[language]}</Table.Td>
                  <Table.Td>
                    {album.photos && album.photos.length > 0 ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        {album.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo.path}
                            alt={photo.name}
                            width={80}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: "6px" }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span>No photos</span>
                    )}
                  </Table.Td>
                  <Table.Td>{album.description[language]}</Table.Td>
                  <Table.Td>
                    <Flex gap={10}>
                      <Button size="xs" color="red" onClick={() => deleteFn(album.id)}>
                        {t("actions.delete")}
                      </Button>
                      <Button size="xs" onClick={() => updateFn(album.id)}>{t("actions.update")}</Button>
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
};

export default Album;
