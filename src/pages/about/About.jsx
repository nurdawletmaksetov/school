import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import './about.scss'
import { Award, Book, BookOpen, Command, Monitor, School, Users } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api/api'
import { Flex, Loader } from '@mantine/core'
import { useTranslation } from 'react-i18next'

const About = () => {
  const [active, setActive] = useState("mission")
  const { darkMode } = useOutletContext();
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'ru';

  async function getAbout() {
    setLoading(true);
    try {
      const { data } = await api.get('/main/about');
      setAbout(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <>
      <main className={`about-dark${darkMode ? ' dark' : ''}`} >
        <section>
          <Container>
            <div className="about-our-school">
              <div className="about-school-left">
                <h1>About Our School</h1>
                <div className="school-inf-ph">
                  <p>
                    Our school has been providing quality education since 1998. We
                    focus on developing not only academic knowledge but also critical
                    thinking, creativity, and social skills in our students.
                  </p>
                  <p>
                    We believe that every student has unique talents and abilities, and our
                    mission is to help them discover and develop these talents to their fullest
                    potential.
                  </p>
                </div>
              </div>
              <div className="about-school-right">
                <img src="/school.png" alt="School" />
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="tabs-wrapper">
              <div className="tabs">
                <button
                  className={`tab ${active === "mission" ? "active" : ""}`}
                  onClick={() => setActive("mission")}
                >
                  Mission & Vision
                </button>
                <button
                  className={`tab ${active === "history" ? "active" : ""}`}
                  onClick={() => setActive("history")}
                >
                  Our History
                </button>
                <button
                  className={`tab ${active === "values" ? "active" : ""}`}
                  onClick={() => setActive("values")}
                >
                  Core Values
                </button>
              </div>
              <div className={`tab-content ${active === "mission" ? "active" : ""}`}>
                <h3>Our Mission & Vision</h3>
                {loading ? (
                  <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader size={50} color="blue" />
                  </Flex>
                ) : (
                  <div className="tab-content-ph">
                    {about.missions?.map((el) => (
                      <div className='our-target about-history' key={el.id}>
                        <div className="target-name history-year">
                          <p>{el.name[language]}</p>
                        </div>
                        <p className='target-text history-text'>{el.description[language]}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="tab-content-ph">
                  <p>
                    <span>Vision:</span> To be recognized as a center of
                    educational excellence that prepares
                    students to thrive in a rapidly changing
                    world and make positive contributions
                    to society.
                  </p>
                </div>
              </div>
              <div className={`tab-content ${active === "history" ? "active" : ""}`}>
                <h3>Our History</h3>
                {loading ? (
                  <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader size={50} color="blue" />
                  </Flex>
                ) : (
                  <div className="tab-content-ph">
                    {about.histories?.map((el) => (
                      <div className='about-history' key={el.id}>
                        <div className="history-year">
                          <p>{el.year}</p>
                        </div>
                        <p className='history-text'>{el.text[language]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={`tab-content ${active === "values" ? "active" : ""}`}>
                <h3>Core Values</h3>
                {loading ? (
                  <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader size={50} color="blue" />
                  </Flex>
                ) : (
                  <div className="tab-content-ph">
                    {about.values?.map((el) => (
                      <div className='our-target about-history' key={el.id}>
                        <div className="target-name history-year">
                          <p>{el.name[language]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="leadership">
              <div className="leadership-headline">
                <h1>School Leadership</h1>
              </div>
              <div className="leadership-cards">
                <div className="principal-leadership leader-card">
                  <div className="leader-card-top">
                    <div className="avatar">
                      <Users size={48} />
                    </div>
                    <div className="whois">
                      <h4>John Smith</h4>
                      <p>Principal</p>
                    </div>
                  </div>
                  <div className="leader-card-btm">
                    <p>
                      With over 20 years of experience in
                      education, Mr. Smith leads our school with
                      vision and dedication.
                    </p>
                  </div>
                </div>

                <div className="academic-leadership leader-card">
                  <div className="leader-card-top">
                    <div className="avatar">
                      <BookOpen size={48} />
                    </div>
                    <div className="whois">
                      <h4>Maria Johnson</h4>
                      <p>Academic Director</p>
                    </div>
                  </div>
                  <div className="leader-card-btm">
                    <p>
                      Dr. Johnson oversees our academic
                      programs, ensuring high standards and
                      innovative teaching methods.
                    </p>
                  </div>
                </div>

                <div className="student-leadership leader-card">
                  <div className="leader-card-top">
                    <div className="avatar">
                      <Award size={48} />
                    </div>
                    <div className="whois">
                      <h4>Robert Davis</h4>
                      <p>Student Affairs</p>
                    </div>
                  </div>
                  <div className="leader-card-btm">
                    <p>
                      Mr. Davis coordinates student activities and
                      ensures a supportive environment for all
                      students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="facilityes">
              <div className="facilyties-top">
                <h1>Our Facilities</h1>
              </div>
              <div className="facilyties-bottom">
                <div className="facilyties-cards-top">
                  <div className="facilyties-card">
                    <div className="fac-card-top">
                      <School size={32} />
                      <h3>Modern Classrooms</h3>
                    </div>
                    <div className="fac-card-btm">
                      <p>
                        Equipped with the latest technology to
                        enhance the learning experience.
                      </p>
                    </div>
                  </div>
                  <div className="facilyties-card">
                    <div className="fac-card-top">
                      <Book size={32} />
                      <h3>Library</h3>
                    </div>
                    <div className="fac-card-btm">
                      <p>
                        A vast collection of books, digital
                        resources, and quiet study spaces.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="facilyties-card-bottom">
                  <div className="facilyties-card">
                    <div className="fac-card-top">
                      <Monitor size={32} />
                      <h3>Computer Labs</h3>
                    </div>
                    <div className="fac-card-btm">
                      <p>
                        State-of-the-art computer labs with the
                        latest software and hardware.
                      </p>
                    </div>
                  </div>
                  <div className="facilyties-card">
                    <div className="fac-card-top">
                      <Command size={32} />
                      <h3>Sports Facilities</h3>
                    </div>
                    <div className="fac-card-btm">
                      <p>
                        Indoor and outdoor sports facilities for
                        various activities and physical education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

export default About
