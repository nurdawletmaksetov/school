import { Flex, Grid, Pagination } from '@mantine/core'
import { useEffect, useState } from 'react'
import { OneNews } from '../one-news/one-news'
import { api } from '../../../api/api';

export const AllNews = ({ darkMode }) => {
    const [news, setNews] = useState([]);
    const [activePage, setActivePage] = useState(1)
    const ITEMS_PER_PAGE = 8;

    async function getNews() {
        const { data } = await api.get('/news');
        setNews(data.data.items ?? []);
    }

    useEffect(() => {
        getNews();
    }, [])

    const paginatedNews = (news || []).slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

    return (
        <div className={`all-news${darkMode ? ' dark' : ''}`}>
            <Grid gutter="sm">
                {paginatedNews.map((item) => (
                    <Grid.Col
                        span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                        key={item.id}>
                        <OneNews
                            darkMode={darkMode}
                            id={item.id}
                            image={item.cover_news}
                            date={item.created_at}
                            title={item.title}
                            body={item.short_content}
                        />
                    </Grid.Col>
                ))}
            </Grid>

            <Flex justify={'center'}>
                <Pagination
                    color={darkMode ? "dark" : "#EFF6FF"}
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
