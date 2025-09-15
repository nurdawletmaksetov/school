import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import { Container, Flex, Loader, Stack } from "@mantine/core";
import { AuthContext } from "../context/auth-context";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {
    const { isAuth, loading } = useContext(AuthContext);
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    };
    if (loading) {
        return (
            <Flex justify="center" align="center" w="100%" h="100vh">
                <Loader size="lg" />
            </Flex>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <Flex>
            <Sidebar />

            <Stack style={{ flex: 1, height: "100vh" }}>
                <Header onLanguageChange={handleLanguageChange} />
                <Container
                    fluid
                    style={{
                        height: "calc(100vh - 62px)",
                        overflowY: "auto",
                        width: "100%",
                    }}
                    p={20}
                >
                    <Outlet context={{ language: currentLanguage }} />
                </Container>
            </Stack>
        </Flex>
    );
};

export default AdminLayout;
