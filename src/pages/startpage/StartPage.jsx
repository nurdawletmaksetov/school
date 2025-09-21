import React, { use, useEffect, useState } from 'react'
import './startpage.scss'
import { Album, ArrowRight, BookOpen, Calendar, Clock, File, MapPin, Users } from 'lucide-react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
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
  const navigation = useNavigate();


  const teacherClick = () => {
    navigation('/teachers');
  }

  const navClick = () => {
    navigation('/support');
  }

  const docClick = () => {
    navigation('/rules');
  }

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
                      {t("home-page.welcome")}
                    </h1>
                    <p className='welcome-pharaghrap'>
                      {t("home-page.welcome-text")}
                    </p>
                  </div>
                  <div className="welcome-buttons">
                    <button onClick={navClick} className='connect-withus-btn'>
                      {t("home-page.contact-us")} <ArrowRight color='#FFFFFF' width={16} />
                    </button>
                    <Link to={"/about"} onClick={handleClick} className='welcome-others-btn'>
                      {t("actions.find-more")}
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
                    {t("home-page.last-news")}
                  </h3>
                  <Link to={"/news"} onClick={handleClick}>
                    <button>
                      {t("actions.see-all")} <ArrowRight size={14} />
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
                                {t("news-page.read-more")} <ArrowRight size={14} />
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
                    {t("home-page.fast-links")}
                  </h3>
                </div>
                <div className="lnews-right-bottom">
                  <Link to={"/schedule"} onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Calendar />
                    </div>
                    <p>{t("home-page.quick-links.schedule")}</p>
                  </Link>
                  <ScrollLink className="lnews-righ-btm-list" onClick={docClick} to="documents" smooth={true} duration={500}>
                    <div className="lnews-icons">
                      <File />
                    </div>
                    <p>{t("home-page.quick-links.documents")}</p>
                  </ScrollLink>
                  <Link to='/teachers' onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Users />
                    </div>
                    <p>{t("home-page.quick-links.teachers")}</p>
                  </Link>
                  <Link to="education" onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <BookOpen />
                    </div>
                    <p>{t("home-page.quick-links.course")}</p>
                  </Link>
                  <Link to="gallery" onClick={handleClick} className="lnews-righ-btm-list">
                    <div className="lnews-icons">
                      <Album />
                    </div>
                    <p>{t("home-page.quick-links.gallery")}</p>
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
                  <div className="teachers-top-heading">
                    <h1>{t("home-page.quick-links.teachers")}</h1>
                    <p>
                      {t("home-page.teachers-text")}
                    </p>
                  </div>
                  <Link to={'/teachers'}>
                    <button onClick={handleClick} className='teachers-top-button'>{t("actions.see-all")} <ArrowRight size={14} /></button>
                  </Link>
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
                        {t("about-page.about-title")}
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
                    {t("home-page.find-more-about-us")} <ArrowRight color='#FFFFFF' size={14} />
                  </Link>
                </div>
                <div className="our-school-right">
                  <div className="ourschool-right-top">
                    <h3>{t("home-page.upcoming-events")}</h3>
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
                <h1>{t("home-page.quick-links.gallery")}</h1>
                <Link onClick={handleClick} to={"/gallery"}>
                  <button>
                    {t("gallery.view-all-photos")} <ArrowRight size={14} color='#CBD5E1' />
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