import { useEffect, useState } from "react";
import { Button, Flex, Loader, Pagination, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { api } from "../../api/api";
import UploadDocument from "../futures/Document/Upload";
import DeleteDocument from "../futures/Document/Delete";
import UpdateDocument from "../futures/Document/Update";
import { useTranslation } from "react-i18next";

function Document() {
  const [documents, setDocuments] = useState([]);
  const currentLang = "ru";
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  async function getDocuments() {
    setLoading(true);
    try {
      const { data } = await api.get(`/documents?page=${page}&per_page=10`);
      setDocuments(data.data.items);
      setLastPage(data.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching news:", error)
      notifications.show({
        title: "Error",
        message: "Failed to fetch news!",
        color: "red",
      });
    } finally {
      setLoading(false);
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
        <Title>{t("sidebar.document")}</Title>
        <Button onClick={createFn}>{t("actions.upload")}</Button>
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
                  <Button size="xs" variant="outline" onClick={() => handleDownload(el.id, el.name)}>Download</Button>
                </Table.Td>
                <Table.Td>
                  <Flex gap={10}>
                    <Button size="xs" color="red" onClick={() => deleteFn(el.id)}>{t("actions.delete")}</Button>
                    <Button
                      size="xs"
                      onClick={() => {
                        console.log("Update clicked, id:", el.id);
                        updateFn(el.id);
                      }}
                    >
                      {t("actions.update")}
                    </Button>
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
    </Stack >
  );
}


export default Document;
