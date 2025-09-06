import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import { Container, Flex, Loader, Stack } from "@mantine/core";
import { AuthContext } from "../context/auth-context";

const AdminLayout = () => {
    const { isAuth, loading } = useContext(AuthContext);

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
            <Sidebar />
            <Stack>
                <Header />
                <Container
                    fluid
                    w="100%"
                    h="calc(100vh - 62px)"
                    p={20}
                    style={{ overflowY: "auto" }}
                >
                    <Outlet />
                </Container>
            </Stack>
        </Flex>
    );
};

export default AdminLayout;
