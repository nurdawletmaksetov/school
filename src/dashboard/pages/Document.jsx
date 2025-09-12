import { useEffect, useState } from "react";
import { Button, Flex, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import UploadDocument from "../futures/Document/Upload";
import DeleteDocument from "../futures/Document/Delete";
import UpdateDocument from "../futures/Document/Update";

function Document() {
  const [documents, setDocuments] = useState([]);
  const currentLang = "ru";

  async function getDocuments() {
    try {
      const { data } = await api.get("/documents");
      setDocuments(data.data.items);
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    getDocuments();
  }, []);

  const createFn = () => {
    modals.open({
      children: <UploadDocument getDocuments={getDocuments} />,
    });
  };

  const updateFn = (id) => {
    modals.open({
      children: <UpdateDocument id={id} getDocuments={getDocuments} />,
    });
  };

  const deleteFn = (id) => {
    modals.open({
      children: (
        <DeleteDocument
          id={id}
          documents={documents}
          setDocuments={setDocuments}
        />
      ),
    });
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/documents/download/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "document");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Stack p={20} w="100%">
      <Flex justify="space-between" align="center">
        <Title>Documents</Title>
        <Button onClick={createFn}>Upload</Button>
      </Flex>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Download</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {documents.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td>{el.name}</Table.Td>
              <Table.Td>{el.description}</Table.Td>
              <Table.Td>
                <Button onClick={() => handleDownload(el.id, el.name)}>Download</Button>
              </Table.Td>
              <Table.Td>
                <Flex gap={10}>
                  <Button onClick={() => deleteFn(el.id)}>Delete</Button>
                  <Button
                    onClick={() => {
                      console.log("Update clicked, id:", el.id);
                      updateFn(el.id);
                    }}
                  >
                    Update
                  </Button>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack >
  );
}


export default Document;
