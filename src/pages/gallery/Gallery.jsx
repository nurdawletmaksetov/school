import React from 'react'
import { Container } from '../../components/container/container'
import './gallery.scss'
import { useOutletContext } from 'react-router-dom'

const Gallery = () => {
    const { darkMode } = useOutletContext();
    return (
        <>
            <main className={`gallery-dark${darkMode ? ' dark' : ''}`}>
                <section>
                    <Container>
                        <div className="gallery">
                            <div className="gallery-heading">
                                <h2>Фотогалерея</h2>
                                <p>
                                    Исследуйте нашу школьную жизнь через
                                    фотографии мероприятий, помещений и
                                    студенческих активностей.
                                </p>
                            </div>
                            <div className="gallery-main">
                                <img src="/jol-hareketi.jpg" />
                                <img src="/win2.jpg" />
                                <img src="/win.jpg" />
                                <img src="/sport-girls.jpg" />
                                <img src="/school.png" />
                                <img src="/school2.jpg" />
                                <img src="/nawriz.jpg" />
                                <img src="/military.jpg" />
                                <img src="/nnn.jpg" />
                                <img src="/new-pc.jpg" />
                                <img src="/chaxmat.jpg" />
                                <img src="/pc-class.jpg" />
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

export default Gallery