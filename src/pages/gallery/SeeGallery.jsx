import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import { Flex, Image, Loader, Skeleton } from '@mantine/core'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'tabler-icons-react';
import { api } from '../../api/api';
import "./gallery.scss"

const SeeGallery = () => {
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { darkMode } = useOutletContext();
    const { i18n } = useTranslation();
    const language = i18n.language || 'ru';


    const goBack = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        navigate(-1);
    }

    async function getAlbum() {
        try {
            const { data } = await api.get('/albums');
            const item = data.data.items.find((a) => a.id == id);
            setAlbum(item ?? null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAlbum();
    }, [id]);

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" size="lg" />
            </Flex>
        );
    }

    if (!album) {
        return (
            <Flex justify="center" align="center" style={{ height: "200px" }}>
                <Loader variant="dots" size="lg" />
            </Flex>
        )
    }

    return (
        <main className={`gallery-dark${darkMode ? ' dark' : ''}`}>
            <section>
                <Container>
                    <div className="gallery">
                        <button onClick={goBack} className='back-btn'>
                            <ArrowLeft size={14} /> Назад
                        </button>

                        <div className="see-gallery-main">
                            {album.photos?.length ? (
                                <div className="see-gallery-photos">
                                    {album.photos.map((photo) => (
                                        <div key={photo.id} className="photo-wrapper">
                                            <img
                                                src={photo.path}
                                                alt={photo.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Skeleton height={192} width={366} radius="md" />
                            )}

                            <div className='gallery-heading'>
                                <h2>{album.title[language]}</h2>
                                <p>{album.description[language]}</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>

    )
}

export default SeeGallery
