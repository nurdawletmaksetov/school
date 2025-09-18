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
      const { data } = await api.get('/clubs');
      setEducation(data.data.items);
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
                <h1>Образование</h1>
                <p>
                  Наша школа предлагает комплексную образовательную программу,
                  разработанную для развития всесторонне развитых учеников с прочной
                  академической основой и практическими навыками.
                </p>
              </div>
              <div className="education-activities">
                <div className="edu-activity-heading">
                  <h3>Внеклассные активности</h3>
                </div>
                {loading ? (
                  <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Loader variant="dots" size="lg" />
                  </Flex>
                ) : (
                  <div className="edu-activity-main">
                    {education.map((el) => (
                      <div className="activities-box">
                        <img
                          className="actities-img"
                          src={el.photo.path}
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