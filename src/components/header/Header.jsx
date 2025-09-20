import { ChevronDown, Globe, Languages, MenuIcon, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles/Header.scss";
import { Container } from "../container/container";
import { Button, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
export const Header = ({ darkMode, setDarkMode }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const languages = [
    { value: "kk", label: "QARAQALPAQ" },
    { value: "ru", label: "РУССКИЙ" },
    { value: "en", label: "ENGLISH" },
    { value: "uz", label: "UZBEK" },
  ];

  const goToAdmin = () => {
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHamburgerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



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
                  aria-label="Toggle menu"
                />
                <label htmlFor="cheked" className="hamburger-label">
                  <MenuIcon />
                </label>
                {hamburgerOpen && (
                  <div
                    ref={menuRef}
                    className={`hamburger-menu${hamburgerOpen ? " open" : ""}`}
                  >
                    <input
                      onClick={toggleHamburger}
                      type="checkbox"
                      id="menu-toggle"
                      style={{ display: "none" }}
                      aria-label="Close menu"
                    />
                    <label htmlFor="menu-toggle" className="menu-label">
                      <X size={20} />
                    </label>
                    <ul className="menu-list">
                      {[
                        { to: "/", label: t("home") },
                        { to: "/about", label: t("about") },
                        { to: "/education", label: t("education") },
                        { to: "/schedule", label: t("schedule") },
                        { to: "/rules", label: t("rules") },
                        { to: "/news", label: t("news") },
                        { to: "/gallery", label: t("gallery.gallery-title") },
                        { to: "/support", label: t("support") },
                      ].map((item) => (
                        <NavLink
                          key={item.to}
                          className="nav-link-phone"
                          onClick={handleClick}
                          to={item.to}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="logo">
                <NavLink onClick={handleClick} to="/" className="logo-icon">
                  23
                </NavLink>
                <NavLink onClick={handleClick} to="/" className="logo-text">
                  23-School of Kanlykul
                </NavLink>
              </div>
            </div>
            <div className="header-bottom">
              <ul className="desktop-menu">
                {[
                  { to: "/", label: t("home") },
                  { to: "/about", label: t("about") },
                  { to: "/education", label: t("education") },
                  { to: "/schedule", label: t("schedule") },
                  { to: "/rules", label: t("rules") },
                  { to: "/news", label: t("news") },
                  { to: "/support", label: t("support") },
                ].map((item) => (
                  <li key={item.to}>
                    <NavLink
                      onClick={handleClick}
                      className="nav-link"
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="header-right">
              <ul className="header-right-list">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Menu shadow="md" width={140}>
                    <Menu.Target>
                      <Button variant="transparent" p={4}>
                        <Languages color={darkMode ? "#fff" : "#000"} size={20} />
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      {languages.map((lang) => (
                        <Menu.Item
                          key={lang.value}
                          onClick={() => i18n.changeLanguage(lang.value)}
                        >
                          {lang.label}
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </div>
                {/* </li> */}
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
