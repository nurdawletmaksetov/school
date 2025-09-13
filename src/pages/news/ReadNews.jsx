import { Flex, Image, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Container } from '../../components/container/container';
import { ArrowLeft } from 'lucide-react';

const ReadNews = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const { id } = useParams();
    const { darkMode } = useOutletContext();

    const goBack = () => navigate(-1);

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setNews(data));
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
                    <>
                        <div className="read-news">
                            <div className="back-btn">
                                <button onClick={goBack} className='back-btn'><ArrowLeft size={14} /> Назад к новостям</button>
                            </div>
                            <div className="news-main">
                                <h1>{news.title}</h1>
                                <Image
                                    radius="md"
                                    width={"100%"}
                                    height={400}
                                    src={news.image || news.thumbnail || `https://picsum.photos/300/200?random=${id}`}
                                />
                                <p>{news.body}</p>
                                <Text className='data-author'>{news.id} as a data - {news.author} NURDAWLET </Text>
                            </div>
                        </div>
                    </>
                </Container>
            </section>
        </main>
    )
}

export default ReadNews;
