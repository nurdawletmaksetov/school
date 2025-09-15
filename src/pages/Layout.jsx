import React, { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer/Footer'
import { useTranslation } from 'react-i18next'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onLanguageChange={handleLanguageChange} />
      <Outlet context={{ darkMode }} language={currentLanguage} />
      <Footer darkMode={darkMode} />
    </>
  )
}

export default Layout;