import React from 'react'
import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title, Loader, Text, Pagination, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import CreateSchoolHours from '../futures/SchoolHours/Create';
import DeleteSchoolHourse from '../futures/SchoolHours/Delete';
import UpdateSchoolHourse from '../futures/SchoolHours/Update';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
const SchoolHours = () => {
  const [schoolhours, setSchoolHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [lastPage, setLastPage] = useState(1);
  const currentLang = "ru";

  const getSchoolHours = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/school-hours?page=${page}&per_page=10`);
      setSchoolHours(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching schoolhours:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch school hours!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchoolHours(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateSchoolHours getSchoolHours={getSchoolHours} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateSchoolHourse id={id} getSchoolHours={getSchoolHours} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteSchoolHourse
          id={id}
          schoolhours={schoolhours}
          setSchoolHours={setSchoolHours}
        />
      ),
    });
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.schoolhours")}</Title>
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
              <Table.Th>Work day</Table.Th>
              <Table.Th>Holiday</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {schoolhours.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>{el.title[currentLang]}</Table.Td>
                <Table.Td>{el.workday[currentLang]}</Table.Td>
                <Table.Td>{el.holiday[currentLang]}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button color="red" size='xs' onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
                    <Button size='xs' onClick={() => updateFn(el.id)}>{t("actions.update")}</Button>
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

export default SchoolHours