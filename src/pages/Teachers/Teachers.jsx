import React, { useEffect, useState } from 'react'
import "./Teachers.scss"
import { Container } from '../../components/container/container'
import { useOutletContext } from 'react-router-dom';
import { Card, Flex, Image, Loader, Text } from '@mantine/core';
import { api } from '../../api/api';
import { useTranslation } from 'react-i18next';

const Teachers = () => {
    const { darkMode } = useOutletContext();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const { t, i18n } = useTranslation();
    const language = i18n.language || 'ru';

    const fetchTeachers = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/employees?page=${page}&per_page=10`);
            setTeachers(data.data.items);
            setLastPage(data.data.pagination.last_page);
        } catch (error) {
            console.error("Error fetching Employee:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers(page);
    }, [page])

    return (
        <>
            <main className={`teachers-dark${darkMode ? ' dark' : ''}`}>
                <section>
                    <Container>
                        <div className="teachers-page">
                            <h1>Meet Our Community</h1>
                            {loading ? (
                                <Flex justify="center" align="center" h={200}>
                                    <Loader size={50} color="blue" />
                                </Flex>
                            ) : (

                                <div className="teachers-main">
                                    {teachers.map((el) => (
                                        <Card
                                            key={el.id}
                                            bdrs={16}
                                            w={280}
                                            h={"auto"}
                                            bd={darkMode ? "1px solid #1E293B" : "1px solid #E2E8F0"}
                                            shadow="sm"
                                            padding="xl"
                                            style={{
                                                backgroundColor: darkMode ? "#1E293B" : "#fff",
                                                color: darkMode ? "#fff" : "#000",
                                            }}
                                        >
                                            <Card.Section>
                                                <Image
                                                    src={el.photo?.path}
                                                    h={200}
                                                    alt="TEACHER"
                                                />
                                            </Card.Section>

                                            <Text ta="center" fw={500} size="lg" mt="md" c={darkMode ? "white" : "black"}>
                                                {el.full_name[language]}
                                            </Text>

                                            <Text ta="center" c={darkMode ? "blue.4" : "blue"} size="sm">
                                                {el.position.name[language]}
                                            </Text>

                                            <Text c={darkMode ? "gray.4" : "dimmed"} ta="center" size="sm">
                                                {el.position?.description[language]}
                                            </Text>
                                            <Text c={darkMode ? "gray.4" : "dimmed"} ta="center" size="sm">
                                                {el.phone}
                                            </Text>
                                            <Text c={darkMode ? "gray.4" : "dimmed"} ta="center" size="sm">
                                                {el.email}
                                            </Text>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

export default Teachers