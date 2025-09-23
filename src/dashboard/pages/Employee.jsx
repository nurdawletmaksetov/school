import React, { useEffect, useState } from 'react'
import { Button, Flex, Loader, Pagination, Stack, Table, Title } from '@mantine/core';
import { api } from '../../api/api';
import CreateEmployee from '../futures/Employee/Create';
import UpdateEmployee from '../futures/Employee/Update';
import DeleteEmployee from '../futures/Employee/Delete';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  const getEmployee = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/employees?page=${page}&per_page=10`);
      setEmployee(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching Employee:", error);
      notifications.show({
        title: "Error",
        message: "Failed to fetch employee!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployee(page);
  }, [page]);

  const createFn = () => {
    modals.open({
      children: <CreateEmployee getEmployee={getEmployee} />,
    })
  }

  const updateFn = (id) => {
    modals.open({
      children: (
        <UpdateEmployee
          id={id}
          getEmployee={getEmployee}
        />
      ),
    })
  }

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteEmployee
          id={id}
          employee={employee}
          setEmployee={setEmployee}
        />
      ),
    });
  }

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{t("sidebar.employee")}</Title>
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
              <Table.Th>ID</Table.Th>
              <Table.Th>Photo</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Position</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Birth Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {employee.map((el) => (
              <Table.Tr key={el.id}>
                <Table.Td>{el.id}</Table.Td>
                <Table.Td>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%"
                    }}
                    src={el.photo?.path}
                    alt={el.full_name[language]}
                  />
                </Table.Td>
                <Table.Td>{el.full_name[language]}</Table.Td>
                <Table.Td>{el.phone}</Table.Td>
                <Table.Td>{el.email}</Table.Td>
                <Table.Td>{el.position?.name[language]}</Table.Td>
                <Table.Td>{el.position?.description[language]}</Table.Td>
                <Table.Td>{el.birth_date}</Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button size='xs' color='red' onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
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

export default Employee
