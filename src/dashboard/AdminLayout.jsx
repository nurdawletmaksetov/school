import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/Header'
import { Container, Flex, Loader, Stack } from '@mantine/core'
import { AuthContext } from '../context/auth-context'

const AdminLayout = () => {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Flex>
                <Sidebar />
                <Stack>
                    <Header />
                    <Container fluid w='100%'>
                        <Outlet />
                    </Container>
                </Stack>
            </Flex>
        </>
    )
}

export default AdminLayout