import React, { useEffect, useState } from 'react'
import '../news/news.scss'
import { Container } from '../../components/container/container'
import { SearchInput } from '../../components/search-input/SearchInput'
import { SearchResultsList } from '../../components/search-input/SearchResultsList'
import { AllNews } from '../../components/news/all-news/all-news'
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const News = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();
  const { t } = useTranslation();

  return (
    <>
      <main className={`news-dark${darkMode ? ' dark' : ''}`}>
        <section>
          <Container>
            <div className="school-news">
              <div className="school-news-headline">
                <h1>{t("news-page.news-title")}</h1>
                <p>{t("news-page.news-p")}</p>
              </div>
              <div className="news-search">
                <div className="news-search">
                  <div className="search-bar-container">
                    <SearchInput setResults={setResults} darkMode={darkMode} />
                    <SearchResultsList darkMode={darkMode} results={results} onSelect={(item) => navigate(`/news/${item.id}`)} />
                  </div>
                </div>
              </div>
              <div className="news-posts">
                <AllNews darkMode={darkMode} />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

export default News