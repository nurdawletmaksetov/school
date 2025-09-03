import React from 'react'
import { Container } from '../../components/container/container';
import '../rules/rules.scss'
import { ChevronDown, Clock, Download, FileText, Shield } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Rules = () => {
  const { darkMode } = useOutletContext();
  const downloadFileAtURL = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <main className={`rules-dark${darkMode ? ' dark' : ''}`}>
        <section>
          <Container>
            <div className="rules-documents">
              <div className="rules-documents-heading">
                <h1>
                  School Rules and Documents
                </h1>
                <p>
                  Our school maintains clear rules and
                  policies to ensure a safe,
                  respectful, and productive learning
                  environment for all students.
                </p>
              </div>
              <div className="school-rules">
                <div className="rules-left">
                  <div className="rules-left-heading">
                    <h3>
                      <Shield size={24} className='rules-icon' />
                      School Rules
                    </h3>
                  </div>
                  <div className="rules-left-details">
                    <details name='rules'>
                      <summary>
                        <p>Attendance and Punctuality</p>
                        <ChevronDown size={16} color='#130428' />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>

                    <details name='rules'>
                      <summary>
                        <p>Behavior and Discipline</p>
                        <ChevronDown size={16} />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>

                    <details name='rules'>
                      <summary>
                        <p>Uniform and Appearance</p>
                        <ChevronDown size={16} />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>

                    <details name='rules'>
                      <summary>
                        <p>Academic Integrity</p>
                        <ChevronDown size={16} />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>

                    <details name='rules'>
                      <summary>
                        <p>School Facilities and Property</p>
                        <ChevronDown size={16} />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>

                    <details name='rules'>
                      <summary>
                        <p>Electronic Devices</p>
                        <ChevronDown size={16} />
                      </summary>
                      <div className="detail">
                        <p>
                          Lorem Ipsum es simplemente el texto
                          de relleno de las imprentas y archivos
                          de texto. Lorem Ipsum ha sido el texto de
                          relleno estándar de las industrias desde
                          el año 1500, cuando un impresor
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
                <div className="rules-right">
                  <div className="rules-right-heading">
                    <h3>
                      <Clock size={24} className='rules-icon' />
                      School Hours
                    </h3>
                  </div>
                  <div className="rules-main">
                    <div className="school-times">
                      <h4>
                        Regular School Days
                      </h4>
                      <p>
                        Monday - Friday: 8:00 AM - 3:30 PM
                      </p>
                    </div>
                    <div className="school-times">
                      <h4>
                        Administration Office
                      </h4>
                      <p>
                        Monday - Friday: 8:00 AM - 5:00 PM
                      </p>
                    </div>
                    <div className="school-times">
                      <h4>
                        Library
                      </h4>
                      <p>
                        Monday - Friday: 8:00 AM - 4:30 PM
                      </p>
                    </div>
                    <div className="school-times">
                      <h4>
                        Extracurricular Activities
                      </h4>
                      <p>
                        Monday - Friday: 3:45 PM - 5:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="school-documents">
                <div className="documents-heading">
                  <h3>School Documents</h3>
                </div>
                <div className="documents-boxes">
                  <div className="documents-left">
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>School Charter</h4>
                          <p>
                            Official school charter document
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            1.2 MB • PDF
                          </p>
                          <button onClick={() => downloadFileAtURL('/school-charter.pdf')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>Code of Conduct</h4>
                          <p>
                            Detailed code of conduct for
                            students
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            1.1 MB • PDF
                          </p>
                          <button onClick={() => downloadFileAtURL('/code-of-conduct.pdf')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>Student Handbook</h4>
                          <p>
                            Complete guide for students
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            3.5 MB • PDF
                          </p>
                          <button onClick={() => downloadFileAtURL('/student-handbook.pdf')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="documents-right">
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>Parent Guide</h4>
                          <p>
                            Information for parents
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            2.8 MB • PDF
                          </p>
                          <button onClick={() => downloadFileAtURL('/parent-guide.pdf')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>Academic Calendar</h4>
                          <p>
                            School year calendar with important
                            dates
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            0.8 MB • PDF
                          </p>
                          <button onClick={() => downloadFileAtURL('/academic-calendar.pdf')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="documents-box">
                      <div className="doc-box-icon">
                        <div className="icon-doc">
                          <FileText size={32} />
                        </div>
                      </div>
                      <div className="doc-right">
                        <div className="doc-right-name">
                          <h4>Enrollment Forms</h4>
                          <p>
                            Forms required for new student
                            enrollment
                          </p>
                        </div>
                        <div className="doc-downlowad">
                          <p className='doc-size'>
                            1.5 MB • ZIP
                          </p>
                          <button onClick={() => downloadFileAtURL('/enrollment-forms.zip')}>
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </div>
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

export default Rules;