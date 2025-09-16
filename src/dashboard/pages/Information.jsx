import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import DeleteInformation from "../futures/Information/Delete";
import UpdateInformation from "../futures/Information/Update";
import CreateInformation from "../futures/Information/Create";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Information = () => {
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";
  const { t } = useTranslation();

  const getInformation = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/informations?page=${page}&per_page=10`);
      setInformation(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching information:", error)
      notifications.show({
        title: "Error",
        message: "Failed to fetch information!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInformation(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateInformation getInformation={getInformation} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateInformation id={id} getInformation={getInformation} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteInformation
          id={id}
          information={information}
          setInformation={setInformation}
        />
      ),
    });
  };

  return (
    <>
      <Stack p={20} w="100%">
        <Flex justify="space-between" align="center">
          <Title>{t("sidebar.information")}</Title>
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
                <Table.Th>Count</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {information.map((el) => (
                <Table.Tr key={el.id}>
                  <Table.Td>{el.id}</Table.Td>
                  <Table.Td>{el.title[currentLang]}</Table.Td>
                  <Table.Td>{el.count}</Table.Td>
                  <Table.Td>{el.description[currentLang]}</Table.Td>
                  <Table.Td>
                    <Flex gap={10}>
                      <Button color="red" size="xs" onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
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
    </>
  )
}

export default Information