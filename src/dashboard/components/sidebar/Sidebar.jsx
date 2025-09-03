import { Flex, Stack, Title, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
    Building,
    Users,
    Image as ImageIcon,
    User,
    Briefcase,
    Newspaper,
    FileText,
    Home,
    BookOpen,
    Star,
} from "lucide-react";

const links = [
    { to: "school", label: "School", icon: <Building size={18} /> },
    { to: "position", label: "Position", icon: <Briefcase size={18} /> },
    { to: "album", label: "Album", icon: <ImageIcon size={18} /> },
    { to: "user", label: "User", icon: <User size={18} /> },
    { to: "employee", label: "Employee", icon: <Users size={18} /> },
    { to: "news", label: "News", icon: <Newspaper size={18} /> },
    { to: "document", label: "Document", icon: <FileText size={18} /> },
    { to: "main", label: "Main", icon: <Home size={18} /> },
    { to: "rules", label: "Rules", icon: <BookOpen size={18} /> },
    { to: "value", label: "Value", icon: <Star size={18} /> },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <Stack
            gap={30}
            h="100vh"
            w="240px"
            p={20}
            style={{ borderRight: "1px solid #2C2E33" }}
        >
            <Title order={3} align="center">
                Polytechnic
            </Title>

            <Stack gap={8}>
                {links.map((item) => (
                    <NavLink
                        key={item.to}
                        label={item.label}
                        component={Link}
                        to={item.to}
                        bdrs={6}
                        leftSection={item.icon}
                        active={location.pathname.includes(item.to)}
                        styles={(theme) => ({
                            active: {
                                backgroundColor: theme.colors.blue[7],
                                color: "white",
                            },
                        })}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
