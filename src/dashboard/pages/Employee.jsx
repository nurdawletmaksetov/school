import React, { useEffect, useState } from 'react'
import { Button, Flex, Stack, Table, Title } from '@mantine/core';
import { api } from '../../api/api';
import CreateEmployee from '../futures/Employee/Create';
import UpdateEmployee from '../futures/Employee/Update';
import DeleteEmployee from '../futures/Employee/Delete';
import { modals } from '@mantine/modals';

const Employee = () => {
  const currentLang = "ru";
  const [employee, setEmployee] = useState([]);

  async function getEmployee() {
    try {
      const { data } = await api.get("/employees")
      setEmployee(data.data.items);
    } catch (error) {
      console.error("Error fetching Employee:", error);
    }
  }

  useEffect(() => {
    getEmployee();
  }, []);

  function createFn() {
    modals.open({
      children: (
        <CreateEmployee
          getEmployee={getEmployee}
        />
      )
    })
  }

  function updateFn(id) {
    modals.open({
      children: (
        <UpdateEmployee
          id={id}
          employee={employee}
          setEmployee={setEmployee}
        />
      )
    })
  }
  function deleteFn(id) {
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
        <Title>Employee</Title>
        <Button onClick={createFn}>Create</Button>
      </Flex>
      <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Photo</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>Birth Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {employee.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td><img src={el.photo?.path} alt={el.full_name[currentLang]} /></Table.Td>
              <Table.Td>{el.full_name[currentLang]}</Table.Td>
              <Table.Td>{el.phone}</Table.Td>
              <Table.Td>{el.email}</Table.Td>
              <Table.Td>{el.position[currentLang]}</Table.Td>
              <Table.Td>{el.birth_date}</Table.Td>
              <Table.Td>
                <Flex gap={10}>
                  <Button onClick={() => deleteFn(el.id)}>Delete</Button>
                  <Button onClick={() => updateFn(el.id)}>Update</Button>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  )
}

export default Employee