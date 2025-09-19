import { Flex, Grid, Loader, Pagination } from '@mantine/core'
import { useEffect, useState } from 'react'
import { OneNews } from '../one-news/one-news'
import { api } from '../../../api/api';
import { useTranslation } from 'react-i18next';

export const AllNews = ({ darkMode }) => {
    const [news, setNews] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const ITEMS_PER_PAGE = 8;
    const { i18n } = useTranslation();
    const language = i18n.language;

    async function getNews() {
        setLoading(true);
        try {
            const { data } = await api.get('/news');
            setNews(data.data.items ?? []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNews();
    }, []);

    const paginatedNews = news.slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

    return (
        <div className={`all-news${darkMode ? ' dark' : ''}`}>
            {loading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                </Flex>
            ) : (

                <Grid gutter="sm">
                    {paginatedNews.map((item) => (
                        <Grid.Col
                            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                            key={item.id}
                        >
                            <OneNews
                                darkMode={darkMode}
                                id={item.id}
                                image={item.cover_image}
                                date={item.created_at}
                                title={item.title?.[language] ?? ""}
                                body={item.short_content?.[language] ?? ""}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
            <Flex justify="center">
                <Pagination
                    color={darkMode ? "dark" : "blue"}
                    total={Math.ceil(news.length / ITEMS_PER_PAGE)}
                    value={activePage}
                    onChange={setActivePage}
                    mt="xl"
                    size="xl"
                    radius="xl"
                />
            </Flex>
        </div>
    )
}
