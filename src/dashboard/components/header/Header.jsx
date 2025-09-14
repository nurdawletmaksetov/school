import { ActionIcon, Button, Flex, Text } from '@mantine/core';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import { useContext } from 'react';
import { LanguagePicker } from '../../../components/LanguageModule/LanguagePicker';
import { useTranslation } from 'react-i18next';

export const Header = ({ sidebarWidth = 180 }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);

    return (
        <Flex
            h={62}
            w={`calc(100vw - ${sidebarWidth}px)`}
            style={{ borderBottom: "1px solid black" }}
            px={20}
            align="center"
            justify="flex-end"
            gap={20}
        >
            <LanguagePicker />

            <Button
                onClick={() => logout(() => navigate("/", { replace: true }))}
                variant="default"
                style={{ border: "1px solid gray", background: "whitesmoke" }}
                size="md"
            >
                {t("logout")}
            </Button>

            <Flex align="center" gap={10} p={6} style={{ background: "whitesmoke", borderRadius: 6, border: "1px solid gray" }}>
                <ActionIcon radius={50} p={4}>
                    <User />
                </ActionIcon>
                <Text>Nurdawlet</Text>
            </Flex>
        </Flex>
    );
};
