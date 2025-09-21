import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import './gallery.scss'
import { Link, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Flex, Pagination, Skeleton } from '@mantine/core'
import { api } from '../../api/api'

const Gallery = () => {
    const { darkMode } = useOutletContext();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const ITEMS_PER_PAGE = 12;
    const { t } = useTranslation()
    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    useEffect(() => {
        const getAlbums = async () => {
            try {
                const { data } = await api.get('/albums');
                setAlbums(data.data.items ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getAlbums();
    }, []);


    const paginatedAlbums = albums.slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

    return (
        <>
            <main className={`gallery-dark${darkMode ? ' dark' : ''}`}>
                <section>
                    <Container>
                        <div className="gallery">
                            <div className="gallery-heading">
                                <h2>{t("gallery.gallery-title")}</h2>
                                <p>
                                    {t("gallery.gallery-p")}
                                </p>
                            </div>
                            <div className="gallery-photos-container">
                                <div className="gallery-main">
                                    {loading
                                        ? Array.from({ length: 12 }).map((_, idx) => (
                                            <Skeleton
                                                key={idx}
                                                height={214.5}
                                                width={286}
                                                radius="lg"
                                            />
                                        ))
                                        : paginatedAlbums.map((album) => (
                                            <div key={album.id} className="album-photos">
                                                {album.photos?.[0] && (
                                                    <div className="album-img-wrapper">
                                                        <Link onClick={handleClick} to={`/gallery/${album.id}`}>
                                                            <img
                                                                src={album.photos[0].path}
                                                                alt={album.photos[0].name}
                                                            />
                                                        </Link>
                                                        <div className="see-all">See All</div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <Flex justify="center">
                                <Pagination
                                    color={darkMode ? "dark" : "blue"}
                                    total={Math.ceil(albums.length / ITEMS_PER_PAGE)}
                                    value={activePage}
                                    onChange={setActivePage}
                                    mt="xl"
                                    size="xl"
                                    radius="xl"
                                />
                            </Flex>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

export default Gallery