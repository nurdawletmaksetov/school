import React, { useState, useEffect } from 'react';
import { Flex, Loader, Stack, Table, Title, Button, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import UpdateSchool from '../futures/School/Update';
import { api } from '../../api/api';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

const School = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentLang = 'en';
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  async function getSchools() {
    setLoading(true);
    try {
      const { data } = await api.get(`/schools/1`);
      setSchools(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (error) {
      console.error("Error fetching schools:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch schools!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSchools();
  }, []);

  function updateFn(id) {
    modals.open({
      title: "Update",
      children: <UpdateSchool id={id} getSchools={getSchools} />,
    });
  }

  return (
    <Stack p={20}>
      <Flex justify="left" align="center">
        <Title>{t("sidebar.school")}</Title>
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
              <Table.Th>Name</Table.Th>
              <Table.Th>History</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {schools
              .map((school) => (
                <Table.Tr key={school.id}>
                  <Table.Td>{school.name?.[language] || "No name"}</Table.Td>
                  <Table.Td>{school.history?.[language] || "No history"}</Table.Td>
                  <Table.Td>{school.phone}</Table.Td>
                  <Table.Td>{school.location}</Table.Td>
                  <Table.Td>{school.email}</Table.Td>
                  <Table.Td>{school.description?.[language] || "No description"}</Table.Td>
                  <Table.Td>
                    <Group>
                      <Button size='xs' onClick={() => updateFn(school.id)}>{t("actions.update")}</Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      )}
    </Stack>
  );
};

export default School;
