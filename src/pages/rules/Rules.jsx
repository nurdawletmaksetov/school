import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container';
import '../rules/rules.scss'
import { ChevronDown, Clock, Download, FileText, Shield } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { api } from '../../api/api';
import { Flex, Loader, Skeleton } from '@mantine/core';
import axios from 'axios';
import { Element } from 'react-scroll';

const Rules = () => {
  const { darkMode } = useOutletContext();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRules() {
    setLoading(true);
    try {
      const { data } = await api.get('/main/rules');
      setRules(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRules();
  }, []);

  const handleDownload = async (downloadUrl, fileName) => {
    try {
      const response = await axios.get(downloadUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <main className={`rules-dark${darkMode ? ' dark' : ''}`}>
        <section>
          <Container>
            <div className="rules-documents">
              <div className="rules-documents-heading">
                <h1>
                  {t("rules-documents.rules-documents-title")}
                </h1>
                <p>
                  {t("rules-documents.rules-documents-p")}
                </p>
              </div>
              <div className="school-rules">
                <div className="rules-left">
                  <div className="rules-left-heading">
                    <h3>
                      <Shield size={24} className='rules-icon' />
                      {t("rules-documents.rules-title")}
                    </h3>
                  </div>
                  {loading ? (
                    <Flex justify="center" align="center" style={{ height: "200px" }}>
                      <Loader variant="dots" />
                    </Flex>
                  ) : (
                    <div className="rules-left-details">
                      {
                        rules.rules?.map((el) => (
                          <details name='rules'>
                            <summary>
                              <p>
                                {el.title[language]}
                              </p>
                              <ChevronDown size={16} color='#130428' />
                            </summary>
                            <div className="detail">
                              <p>
                                {el.text[language]}
                              </p>
                            </div>
                          </details>
                        ))
                      }

                    </div>
                  )}
                </div>
                <div className="rules-right">
                  <div className="rules-right-heading">
                    <h3>
                      <Clock size={24} className='rules-icon' />
                      {t("rules-documents.shoolhours-title")}
                    </h3>
                  </div>
                  {loading ? (
                    <Flex justify="center" align="center" style={{ height: "200px" }}>
                      <Loader variant="dots" />
                    </Flex>
                  ) : (
                    <div className="rules-main">
                      {rules.school_hours?.map((el) => (
                        <div className="school-times">
                          <h4>
                            {el.title}
                          </h4>
                          <h4>Workday</h4>
                          <p>
                            {el.workday}
                          </p>
                          <h4>Holiday</h4>
                          <p>
                            {el.holiday}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Element name='documents'>
                <div className="school-documents">
                  <div className="documents-heading">
                    <h3>{t("rules-documents.documents-title")}</h3>
                  </div>
                  <div className="documents-boxes">
                    {loading ? (
                      <Flex justify="center" align="center" style={{ height: "200px" }}>
                        <Loader variant="dots" />
                      </Flex>
                    ) : (

                      <div className="documents-left">
                        {rules.documents?.map((el) => (
                          <div className="documents-box">
                            <div className="doc-box-icon">
                              <div className="icon-doc">
                                <FileText size={32} />
                              </div>
                            </div>
                            <div className="doc-right">
                              <div className="doc-right-name">
                                <h4>{el.name}</h4>
                                <p>
                                  {el.description}
                                </p>
                              </div>
                              <div className="doc-downlowad">
                                <p className='doc-size'>
                                  {el.size} • {el.type}
                                </p>
                                <button onClick={() => handleDownload(el.download_url, el.name)}>
                                  <Download size={16} />{t("actions.download")}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Element>
            </div>
          </Container>
        </section>
      </main >
    </>
  )
}

export default Rules;