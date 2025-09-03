import React, { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer/Footer'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet context={{ darkMode }} />
      <Footer darkMode={darkMode} />
    </>
  )
}

export default Layout;