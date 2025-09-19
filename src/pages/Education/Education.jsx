import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import '../Education/education.scss'
import { Clock } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/api'
import { Flex, Loader } from '@mantine/core'

const Education = () => {
  const { darkMode } = useOutletContext();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language || 'ru';

  async function getEducation() {
    setLoading(true);
    try {
      const { data } = await api.get('/main/education');
      setEducation(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEducation();
  }, []);

  return (
    <>
      <main className={`education-dark${darkMode ? ' dark' : ''}`}>
        <section>
          <Container>
            <div className="education">
              <div className="education-headline">
                <h1>{t("education-page.education-title")}</h1>
                <p>
                  {t("education-page.education-p")}
                </p>
              </div>
              <div className="education-activities">
                <div className="edu-activity-heading">
                  <h3>{t("education-page.other-activities")}</h3>
                </div>
                {loading ? (
                  <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                  </Flex>
                ) : (
                  <div className="edu-activity-main">
                    {education.activities?.map((el) => (
                      <div className="activities-box">
                        <img
                          className="actities-img"
                          src={el.photo.url}
                          alt={el.photo.name}
                        />
                        <div className="activities-box-right">
                          <div className="act-box-top">
                            <h4>{el.name[language]}</h4>
                            <p>
                              {el.text[language]}
                            </p>
                          </div>
                          <p>
                            <Clock size={10} /> {el.schedule[language]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default Education