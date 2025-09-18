import { Flex, Image, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Container } from '../../components/container/container';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../api/api';
import './news.scss'
import { useTranslation } from 'react-i18next';

const ReadNews = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const { id } = useParams();
    const { darkMode } = useOutletContext();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const language = i18n.language || 'ru';

    const goBack = () => navigate(-1);

    async function getNews() {
        const { data } = await api.get('/news');
        const item = data.data.items.find((n) => n.id == id);
        setNews(item ?? null);
    }

    useEffect(() => {
        getNews();
    }, [id]);

    if (!news) return (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
            <Loader variant="dots" size="lg" />
        </Flex>
    );

    return (
        <main className={`read-news-dark${darkMode ? ' dark' : ''}`}>
            <section>
                <Container>
                    <div className="read-news">
                        <div className="back-btn">
                            <button onClick={goBack} className='back-btn'>
                                <ArrowLeft size={14} /> {t("news-page.back-btn")}
                            </button>
                        </div>
                        <div className="news-main">
                            <h1>{news.title?.[language]}</h1>
                            <Image
                                radius="md"
                                width="100%"
                                height={400}
                                src={news.cover_image?.path || `https://picsum.photos/300/200?random=${id}`}
                            />
                            <p>{news.content?.[language]}</p>
                            <Text className='data-author'>
                                {news.created_at} - {news.author.full_name[language]}
                            </Text>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}

export default ReadNews;
