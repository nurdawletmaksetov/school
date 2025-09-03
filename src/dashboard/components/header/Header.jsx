// import { Container } from '../../components/container/container'
import { ActionIcon, Button, Flex, Select, Text, Title } from '@mantine/core'
import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import { useContext } from 'react';
export const Header = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return (
        <Flex
            h={62}
            w={"calc(100vw - 240px)"}
            style={{ borderBottom: "1px solid black" }}
            px={20}
            align={"center"}
            justify={"flex-end"}
            gap={20}
        >
            <Button onClick={() => logout(() => navigate("/", { replace: true }))}
                variant="default" bd={"1px solid gray"} bg={"whitesmoke"} size='md'>Log Out</Button>
            <Flex align={"center"} gap={10} p={6} bg={"whitesmoke"} bdrs={6} bd={"1px solid gray"}>
                <ActionIcon radius={50} p={4}>
                    <User />
                </ActionIcon>
                <Text>Nurdawlet</Text>
            </Flex>
        </Flex>
    )
}