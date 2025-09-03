import React from 'react'
import { Container } from '../../components/container/container'
import '../Education/education.scss'
import { Clock } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

const Education = () => {
  const { darkMode } = useOutletContext();
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
                <div className="edu-activity-main">
                  <div className="activity-main-top">
                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>Chess Club</h4>
                          <p>
                            Develop strategic thinking and
                            problem-solving skills
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Mondays and Wednesdays, 15:00 - 16:30
                        </p>
                      </div>
                    </div>

                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>Robotics Team</h4>
                          <p>
                            Learn programming and
                            engineering through robotics
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Tuesdays and Thursdays, 15:00 - 17:00
                        </p>
                      </div>
                    </div>

                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>Debate Club</h4>
                          <p>
                            Improve public speaking and
                            critical thinking skills
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Fridays, 14:30 - 16:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="activity-main-btm">
                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>School Choir</h4>
                          <p>
                            Develop musical talents and
                            perform at school events
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Tuesdays and Thursdays, 15:00 - 16:30
                        </p>
                      </div>
                    </div>

                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>Science Olympiad</h4>
                          <p>
                            Prepare for science
                            competitions and olympiads
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Wednesdays, 15:00 - 17:00
                        </p>
                      </div>
                    </div>

                    <div className="activities-box">
                      <div className="actities-img">
                      </div>
                      <div className="activities-box-right">
                        <div className="act-box-top">
                          <h4>Sports Teams</h4>
                          <p>
                            Soccer, basketball, volleyball,
                            and athletics
                          </p>
                        </div>
                        <p>
                          <Clock size={10} /> Various times, see coach for details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default Education