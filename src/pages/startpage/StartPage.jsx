import React, { useState } from 'react'
import './startpage.scss'
import { Album, ArrowRight, BookOpen, Calendar, Clock, File, MapPin, Users } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import { Container } from '../../components/container/container'
import { Button, Modal } from '@mantine/core'
import { Element, Link as ScrollLink } from 'react-scroll'
import { useDisclosure } from '@mantine/hooks'


const StartPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { darkMode } = useOutletContext();

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
                  <div className="lnews-box">
                    <img src="/win.jpg" />
                    <div className="lnews-box-right">
                      <div className="lnews-inf-top">
                        <div className='inf-top'>
                          <div className="lnews-date">
                            <p>
                              <Calendar size={14} /> 5 мая 2025
                            </p>
                          </div>
                          <div className="lnews-texts">
                            <h3>
                              Объявлены победители школьной олимпиады
                            </h3>
                            <p>
                              Поздравляем всех участников и
                              победителей нашей ежегодной
                              школьной олимпиады.
                            </p>
                          </div>
                        </div>
                        <div className="lnews-read-more">
                          <Link to="/" className='lnews-link'>
                            Читать далее <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lnews-box">
                    <img src="/pc-class.jpg" />
                    <div className="lnews-box-right">
                      <div className="lnews-inf-top">
                        <div className='inf-top'>
                          <div className="lnews-date">
                            <p>
                              <Calendar color="#6B7280" size={14} /> 28 апреля 2025
                            </p>
                          </div>
                          <div className="lnews-texts">
                            <h3>
                              Открытие нового
                              компьютерного класса
                            </h3>
                            <p>
                              Мы рады сообщить об открытии нашей
                              новой современной компьютерной
                              лаборатории.
                            </p>
                          </div>
                        </div>
                        <div className="lnews-read-more">
                          <Link to="/" className='lnews-link'>
                            Читать далее <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lnews-box">
                    <img src="/education-png.png" />
                    <div className="lnews-box-right">
                      <div className="lnews-inf-top">
                        <div className='inf-top'>
                          <div className="lnews-date">
                            <p>
                              <Calendar size={14} /> 15 апреля 2025
                            </p>
                          </div>
                          <div className="lnews-texts">
                            <h3>
                              Расписание родительских
                              собраний
                            </h3>
                            <p>
                              Опубликовано расписание
                              предстоящих родительских собраний.
                            </p>
                          </div>
                        </div>
                        <div className="lnews-read-more">
                          <Link to="/" className='lnews-link'>
                            Читать далее <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <Link to="education" onClick={handleClick} className="lnews-righ-btm-list">
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
                  <div className="our-teachers-left">
                    <div className="teacher-card">
                      <img src="/sarah.png" />
                      <div className="teacher-info">
                        <h3>Dr. Sarah Johnson</h3>
                        <p>Principal</p>
                      </div>
                    </div>
                    <div className="teacher-card">
                      <img src="/michael.png" />
                      <div className="teacher-info">
                        <h3>Prof. Michael Chen</h3>
                        <p>Mathematics</p>
                      </div>
                    </div>
                  </div>
                  <div className="our-teachers-right">
                    <div className="teacher-card">
                      <img src="/emily.png" />
                      <div className="teacher-info">
                        <h3>Dr. Emily Rodriguez</h3>
                        <p>Science</p>
                      </div>
                    </div>
                    <div className="teacher-card">
                      <img src="/david.png" />
                      <div className="teacher-info">
                        <h3>Prof. David Kim</h3>
                        <p>Literature</p>
                      </div>
                    </div>
                  </div>
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
                        <div className="howmany-students school-info-boxes">
                          <h3>500+</h3>
                          <p>Учеников</p>
                        </div>
                        <div className="howmany-teachers school-info-boxes">
                          <h3>50+</h3>
                          <p>Учителей</p>
                        </div>
                      </div>
                      <div className="info-box-btm">
                        <div className="howmant-class school-info-boxes">
                          <h3>20+</h3>
                          <p>Классов</p>
                        </div>
                        <div className="our-school-stage school-info-boxes">
                          <h3>25+</h3>
                          <p>Лет опыта</p>
                        </div>
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
                <img src="/engine.jpg" />
                <img src="/military.jpg" />
                <img src="/nawriz.jpg" />
                <img src="/win2.jpg" />
                <img src="/jol-hareketi.jpg" />
                <img src="/sport-girls.jpg" />
              </div>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default StartPage