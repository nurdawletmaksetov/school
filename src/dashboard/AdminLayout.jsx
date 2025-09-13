import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import { Container, Flex, Loader, Stack } from "@mantine/core";
import { AuthContext } from "../context/auth-context";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {
    const { isAuth, loading } = useContext(AuthContext);
    const { t } = useTranslation();

    if (loading) {
        return (
            <Flex justify="center" align="center" w="100%" h="100vh">
                <Loader size="lg" />
            </Flex>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Flex>
            <Sidebar style={{ width: 250, minWidth: 250, maxWidth: 250 }} />

            <Stack style={{ flex: 1, height: "100vh" }}>
                <Header />
                <Container
                    fluid
                    style={{
                        height: "calc(100vh - 62px)",
                        overflowY: "auto",
                        width: "100%"
                    }}
                    p={20}
                >
                    <Outlet />
                </Container>
            </Stack>
        </Flex>
    );

};

export default AdminLayout;
