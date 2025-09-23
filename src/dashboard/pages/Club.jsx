import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea, Image } from "@mantine/core";
import { api } from "../../api/api";
import CreateClub from "../futures/Club/Create";
import UpdateClub from "../futures/Club/Update";
import DeleteClub from "../futures/Club/Delete";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Club = () => {
  const [club, setClub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';
  const getClubs = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/clubs?page=${page}&per_page=10`);
      setClub(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch clubs!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClubs(page);
  }, [page]);


  const createFn = () => {
    modals.open({
      children: <CreateClub getClubs={getClubs} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateClub id={id} getClubs={getClubs} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteClub
          id={id}
          club={club}
          setClub={setClub}
        />
      ),
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.club")}</Title>
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
              <Table.Th>Name</Table.Th>
              <Table.Th>Text</Table.Th>
              <Table.Th>Schedule</Table.Th>
              <Table.Th>Photo</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {club.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.name[language]}</Table.Td>
                <Table.Td>{el.text[language]}</Table.Td>
                <Table.Td>{el.schedule[language]}</Table.Td>
                <Table.Td>
                  <Image
                    src={el.photo?.path}
                    alt={el.photo?.name || "photo"}
                    width={80}
                    height={60}
                    radius="md"
                    fit="cover"
                  />
                </Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button size="xs" color="red" onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
                    <Button size="xs" onClick={() => updateFn(el.id)}>{t("actions.update")}</Button>
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
  )
}

export default Club