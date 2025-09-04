import { ChevronDown, Globe, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles/Header.scss";
import { Container } from "../container/container";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
export const Header = ({ darkMode, setDarkMode }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/login");
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={`header-dark${darkMode ? " dark" : " main-header"}`}>
        <Container>
          <div className="header">
            <div className="header-left">
              <div className="menu">
                <input
                  type="checkbox"
                  onClick={toggleHamburger}
                  id="cheked"
                  className="hamburger-checkbox"
                />
                <label htmlFor="cheked" className="hamburger-label">
                  <Menu />
                </label>
                <div
                  className={`hamburger-menu${hamburgerOpen ? " open" : ""}`}
                >
                  <input
                    onClick={toggleHamburger}
                    type="checkbox"
                    id="menu-toggle"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="menu-toggle" className="menu-label">
                    <X size={20} />
                  </label>
                  <ul className="menu-list">
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/"
                    >
                      {t("home")}
                    </NavLink>
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/about"
                    >
                      {t("about")}
                    </NavLink>
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/education"
                    >
                      {t("education")}
                    </NavLink>
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/rules"
                    >
                      {t("rules")}
                    </NavLink>
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/news"
                    >
                      {t("news")}
                    </NavLink>
                    <NavLink
                      className={"nav-link-phone"}
                      onClick={handleClick}
                      to="/support"
                    >
                      {t("support")}
                    </NavLink>
                  </ul>
                </div>
              </div>
              <div className="logo">
                <NavLink onClick={handleClick} to="/" className="logo-icon">
                  N
                </NavLink>
                <NavLink onClick={handleClick} to="/" className="logo-text">
                  Nurdawlet's School
                </NavLink>
              </div>
            </div>
            <div className="header-bottom">
              <ul className="desktop-menu">
                <li>
                  <NavLink onClick={handleClick} className={"nav-link"} to="/">
                    {t("home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClick}
                    className={"nav-link"}
                    to="/about"
                  >
                    {t("about")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClick}
                    className={"nav-link"}
                    to="/education"
                  >
                    {t("education")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClick}
                    className={"nav-link"}
                    to="/rules"
                  >
                    {t("rules")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClick}
                    className={"nav-link"}
                    to="/news"
                  >
                    {t("news")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClick}
                    className={"nav-link"}
                    to="/support"
                  >
                    {t("support")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="header-right">
              <ul className="header-right-list">
                <li className="night-mode">
                  <input
                    type="checkbox"
                    id="night-mode"
                    className="mode-checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
                </li>
                <li className="language">
                  <Globe className="right-icons" />
                  <select
                    className="language-select"
                    id="language-select"
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                  >
                    <option className={"value"} value="ru">
                      Russian
                    </option>
                    <option className={"value"} value="eng">
                      English
                    </option>
                    <option className={"value"} value="qr">
                      Qaraqalpaq
                    </option>
                  </select>
                </li>
              </ul>
              <div className="admin">
                <button onClick={goToAdmin} className="admin-button">
                  Admin
                </button>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
