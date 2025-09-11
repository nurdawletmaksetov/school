import React, { useState, useEffect } from 'react';
import { Flex, Loader, Stack, Table, Title, Button, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import UpdateSchool from '../futures/School/Update';
import { api } from '../../api/api';

const School = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentLang = 'en';

  async function getSchools() {
    setLoading(true);
    try {
      const { data } = await api.get(`/schools/1`);
      setSchools(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (error) {
      console.error("Error fetching schools:", error);
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
        <Title>School</Title>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Table
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
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {schools
              .map((school) => (
                <Table.Tr key={school.id}>
                  <Table.Td>{school.name?.[currentLang] || "No name"}</Table.Td>
                  <Table.Td>{school.history?.[currentLang] || "No history"}</Table.Td>
                  <Table.Td>{school.phone}</Table.Td>
                  <Table.Td>{school.location}</Table.Td>
                  <Table.Td>{school.description?.[currentLang] || "No description"}</Table.Td>
                  <Table.Td>
                    <Group>
                      <Button onClick={() => updateFn(school.id)}>Update</Button>
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
