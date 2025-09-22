import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import './about.scss'
import { Award, Book, BookOpen, Command, Monitor, School, Users } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api/api'
import { Flex, Loader } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import aboutData from "../../data/about.json";
import visionData from "../../data/vision.json";
import lidershipData from "../../data/lidership.json";
import facilityData from "../../data/facilities.json";
import * as Icons from "lucide-react";

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
                <h1>{t("about-page.about-title")}</h1>
                <div className="school-inf-ph">
                  <p>{aboutData.about[0].history[language]}</p>
                  <p>{aboutData.about[0].description[language]}</p>
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
                  {t("about-page.mission-vision")}
                </button>
                <button
                  className={`tab ${active === "history" ? "active" : ""}`}
                  onClick={() => setActive("history")}
                >
                  {t("about-page.our-history")}
                </button>
                <button
                  className={`tab ${active === "values" ? "active" : ""}`}
                  onClick={() => setActive("values")}
                >
                  {t("about-page.core-values")}
                </button>
              </div>
              <div className={`tab-content ${active === "mission" ? "active" : ""}`}>
                <h3>{t("about-page.our-mission")}</h3>
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
                  {visionData.vision.map((el) => (
                    <div className='our-target about-history' key={el.id}>
                      <div className="target-name history-year">
                        <p>{el.name[language]}</p>
                      </div>
                      <p className='target-text history-text'>{el.text[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`tab-content ${active === "history" ? "active" : ""}`}>
                <h3>{t("about-page.our-history")}</h3>
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
                <h3>{t("about-page.core-values")}</h3>
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
                <h1>{t("about-page.school-lidership")}</h1>
              </div>
              <div className="leadership-cards">
                {lidershipData.lidership.map((el, index) => {
                  const IconComponent = Icons[el.icon];
                  return (
                    <div className="leader-card" key={index}>
                      <div className="leader-card-top">
                        <div className="avatar">
                          {IconComponent && <IconComponent size={48} />}
                        </div>
                        <div className="whois">
                          <h4>{el.name[language]}</h4>
                          <p>{el.position[language]}</p>
                        </div>
                      </div>
                      <div className="leader-card-btm">
                        <p>
                          {el.description[language]}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="facilityes">
              <div className="facilyties-top">
                <h1>{t("about-page.our-facilities")}</h1>
              </div>
              <div className="facilyties-bottom">
                <div className="facilyties-cards-top">
                  {facilityData.facilities.top.map((el, index) => {
                    const IconComponent = Icons[el.icon];
                    return (
                      <div className="facilyties-card" key={index}>
                        <div className="fac-card-top">
                          {IconComponent && <IconComponent size={32} />}
                          <h3>{el.name[language]}</h3>
                        </div>
                        <div className="fac-card-btm">
                          <p>{el.description[language]}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="facilyties-card-bottom">
                  {facilityData.facilities.bottom.map((el, index) => {
                    const IconComponent = Icons[el.icon];
                    return (
                      <div className="facilyties-card" key={index}>
                        <div className="fac-card-top">
                          {IconComponent && <IconComponent size={32} />}
                          <h3>{el.name[language]}</h3>
                        </div>
                        <div className="fac-card-btm">
                          <p>{el.description[language]}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default About
