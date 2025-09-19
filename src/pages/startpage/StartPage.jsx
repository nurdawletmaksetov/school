import React, { useEffect, useState } from 'react'
import './startpage.scss'
import { Album, ArrowRight, BookOpen, Calendar, Clock, File, MapPin, Users } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import { Container } from '../../components/container/container'
import { Button, Flex, Loader, Modal } from '@mantine/core'
import { Element, Link as ScrollLink } from 'react-scroll'
import { useDisclosure } from '@mantine/hooks'
import { api } from '../../api/api'
import { useTranslation } from 'react-i18next'


const StartPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [home, setHome] = useState({});
  const { darkMode } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  async function getHome() {
    setLoading(true);
    try {
      const { data } = await api.get('/');
      setHome(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHome();
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <>
      <main className={`main-dark${darkMode ? ' dark' : ''}`} >
        <section>
          <Container>
            <div className="welcome">
              <div className="welcome-div">
                <div className="welcome-left">
                  <div className="welcome-headings">
                    <h1 className="welcome-headline">
                      Добро пожаловать в нашу школу
                    </h1>
                    <p className='welcome-pharaghrap'>
                      Место, где знания
                      встречаются с инновациями,
                      а ученики готовятся к
                      вызовам завтрашнего дня.
                    </p>
                  </div>
                  <div className="welcome-buttons">
                    <Modal.Root opened={opened} onClose={close}>
                      <Modal.Overlay />
                      <Modal.Content>
                        <Modal.Header>
                          <Modal.Title>Phone Numb</Modal.Title>
                          <Modal.CloseButton />
                        </Modal.Header>
                        <Modal.Body>+998 (00) 000-00-00</Modal.Body>
                        <Modal.Header>
                          <Modal.Title>Email</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>example@mail.com</Modal.Body>
                      </Modal.Content>
                    </Modal.Root>
                    <button onClick={open} className='connect-withus-btn'>
                      Связаться с нами <ArrowRight color='#FFFFFF' width={16} />
                    </button>
                    <Link to={"/about"} onClick={handleClick} className='welcome-others-btn'>
                      Узнать больше
                    </Link>
                  </div>
                </div>
                <div className="welcome-right">
                  <img src="/school.png" className='school-png' />
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="latest-news">
              <div className="latest-news-left">
                <div className="lnews-topic">
                  <h3>
                    Последние новости
                  </h3>
                  <Link to={"/news"} onClick={handleClick}>
                    <button>
                      Смотреть все <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
                <div className="lnews-main">
                  {loading ? (
                    <Flex justify="center" align="center">
                      <Loader size={50} color="blue" />
                    </Flex>
                  ) : (
                    home.last_news?.slice(0, 3).map((el) => (
                      <div className="lnews-box" key={el.id}>
                        <img src={el.cover_image.path} alt={el.title[language]} />
                        <div className="lnews-box-right">
                          <div className="lnews-inf-top">
                            <div className='inf-top'>
                              <div className="lnews-date">
                                <p><Calendar size={14} /> {el.created_at}</p>
                              </div>
                              <div className="lnews-texts">
                                <h3>{el.title[language]}</h3>
                                <p>{el.short_content[language]}</p>
                              </div>
                            </div>
                            <div className="lnews-read-more">
                              <Link to={`/news/${el.id}`} onClick={handleClick} className='lnews-link'>
                                Читать далее <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="lnews-right">
                <div className="lnews-right-top">
                  <h3>
                    Быстрые ссылки
                  </h3>
                </div>
                <div className="lnews-right-bottom">
                  <Link to={"/schedule"} onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Calendar />
                    </div>
                    <p>Расписание уроков</p>
                  </Link>
                  <ScrollLink className="lnews-righ-btm-list" to="our-school" smooth={true} duration={500}>
                    <div className="lnews-icons">
                      <File />
                    </div>
                    <p>Школьные документы</p>
                  </ScrollLink>
                  <ScrollLink to='our-teachers' smooth={true} duration={500} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Users />
                    </div>
                    <p>Наши учителя</p>
                  </ScrollLink>
                  <Link to="education" onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <BookOpen />
                    </div>
                    <p>Доступные курсы</p>
                  </Link>
                  <Link to="gallery" onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Album />
                    </div>
                    <p>Фотогалерея</p>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section >
        <Element name="our-teachers">
          <section>
            <Container>
              <div className="our-teachers">
                <div className="our-teachers-top">
                  <h1>Our Teachers</h1>
                  <p>
                    Meet our dedicated team of educators committed to providing the highest quality
                    education and support for our students.
                  </p>
                </div>
                <div className="our-teachers-bottom">
                  {loading ? (
                    <Flex justify="center" align="center">
                      <Loader size={50} color="blue" />
                    </Flex>
                  ) : (
                    <div className="our-teachers-left">
                      {home.teachers?.slice(0, 4).map((el, idx) => (
                        <div className="teacher-card" key={idx}>
                          <img src={el.photo} alt={el.full_name} />
                          <div className="teacher-info">
                            <h3>{el.full_name}</h3>
                            <p>{el.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        </Element>
        <Element name="our-school">
          <section>
            <Container>
              <div className="our-school">
                <div className="our-school-left">
                  <div className="school-img">
                    <img src="/school2.jpg" />
                  </div>
                  <div className="our-school-bottom">
                    <div className="ourschool-btm-info">
                      <h3>
                        О нашей школе
                      </h3>
                      <p>
                        Наша школа предоставляет
                        качественное образование с 1998
                        года. Мы фокусируемся на развитии
                        не только академических знаний, но и
                        критического мышления, творчества
                        и социальных навыков у наших
                        учеников.
                      </p>
                    </div>
                    <div className="ourshcool-btm-info2">
                      <div className="info-box-top">
                        {home.informations?.map((el) => (
                          <div className="howmany-students school-info-boxes" key={el.id}>
                            <h3>{el.count}</h3>
                            <p>{el.title[language]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link to="/about" onClick={handleClick} className="info-read-more-link">
                    <p>
                      Узнать больше о нас <ArrowRight color='#FFFFFF' size={14} />
                    </p>
                  </Link>
                </div>
                <div className="our-school-right">
                  <div className="ourschool-right-top">
                    <h3>Upcoming Events</h3>
                  </div>
                  <div className="ourschool-btm">
                    <div className="teacher-conferience events-boxes border-bottom">
                      <h3>Parent-Teacher Conference</h3>
                      <p><Calendar color='#CBD5E1' size={14} /> May 15, 2025</p>
                      <p><Clock color='#CBD5E1' size={14} /> 4:00 PM - 7:00 PM</p>
                      <p><MapPin color='#CBD5E1' size={14} /> Main Building, Floor 2</p>
                    </div>
                    <div className="sciens-fair events-boxes border-bottom">
                      <h3>Parent-Teacher Conference</h3>
                      <p><Calendar color='#CBD5E1' size={14} /> May 20, 2025</p>
                      <p><Clock color='#CBD5E1' size={14} /> 10:00 AM - 3:00 PM</p>
                      <p><MapPin color='#CBD5E1' size={14} /> School Gymnasium</p>
                    </div>
                    <div className="end-year-consepts">
                      <h3>Parent-Teacher Conference</h3>
                      <p><Calendar color='#CBD5E1' size={14} /> June 5, 2025</p>
                      <p><Clock color='#CBD5E1' size={14} /> 6:00 PM - 8:00 PM</p>
                      <p><MapPin color='#CBD5E1' size={14} /> School Auditorium</p>
                    </div>
                  </div>
                  <div className="events-btm-div">
                    <Link to="/education" onClick={handleClick} className="all-events-link">
                      View All Events <ArrowRight size={14} color='#CBD5E1' />
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </Element>
        <section>
          <Container>
            <div className="photo-gallery">
              <div className="photo-gallery-top">
                <h1>Photo Gallery</h1>
                <Link onClick={handleClick} to={"/gallery"}>
                  <button>
                    View All Photos <ArrowRight size={14} color='#CBD5E1' />
                  </button>
                </Link>
              </div>

              <div className="photo-gallery-main">
                {loading ? (
                  Array.from({ length: 8 }).map((el) => (
                    <Flex key={el} align="center" justify="center" style={{ width: '250px', height: '250px', borderRadius: '16px' }}>
                      <Loader size={50} color="blue" />
                    </Flex>
                  ))
                ) : (
                  home.albums
                    ?.flatMap(album => album.photos ?? [])
                    .slice(0, 6)
                    .map(photo => (
                      <img
                        key={photo.id}
                        src={photo.path}
                        alt={photo.name}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '16px',
                        }}
                      />
                    ))
                )}
              </div>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default StartPage