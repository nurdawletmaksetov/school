import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea, Badge } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateVacancy from "../futures/Vacancy/Create";
import UpdateVacancy from "../futures/Vacancy/Update";
import DeleteVacancy from "../futures/Vacancy/Delete";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Vacancy = () => {
  const [vacancy, setVacancy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t } = useTranslation();
  const currentLang = "ru";

  const getVacancy = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/vacancies?page=${page}&per_page=10`);
      setVacancy(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching vacancy:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch vacancy!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVacancy(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateVacancy getVacancy={getVacancy} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateVacancy id={id} getVacancy={getVacancy} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteVacancy
          id={id}
          vacancy={vacancy}
          setVacancy={setVacancy}
        />
      ),
    });
  };

  return (
    <>
      <Stack p={20} w="100%">
        <Flex justify="space-between" align="center">
          <Title>{t("sidebar.vacancy")}</Title>
          <Button onClick={() => createFn()}>{t("actions.create")}</Button>
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
                <Table.Th>Content</Table.Th>
                <Table.Th>Active</Table.Th>
                <Table.Th>Salary(sum)</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {vacancy.map((el) => (
                <Table.Tr key={el.id}>
                  <Table.Td>{el.id}</Table.Td>
                  <Table.Td>{el.title[currentLang]}</Table.Td>
                  <Table.Td>{el.content[currentLang]}</Table.Td>
                  <Table.Td>
                    {el.active ? (
                      <Badge variant="light" color="green">Active</Badge>
                    ) : (
                      <Badge variant="light" color="red">Inactive</Badge>
                    )}
                  </Table.Td>
                  <Table.Td>{el.salary}</Table.Td>
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

export default Vacancy