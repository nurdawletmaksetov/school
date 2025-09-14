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

    // if (!isAuth) {
    // return <Navigate to="/login" />;
    // }

    return (
        <Flex>
            <Sidebar />

            <Stack style={{ flex: 1, height: "100vh" }}>
                <Header />
                <Container
                    fluid
                    style={{
                        height: "calc(100vh - 62px)",
                        overflowY: "auto",
                        width: "100%",
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
