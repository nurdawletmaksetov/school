import { Flex, Stack, Title, NavLink, ScrollArea } from "@mantine/core";
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
    Clock,
    Target,
    File,
    Check,
} from "lucide-react";
import { IconFlagQuestion } from "@tabler/icons-react";

const links = [
    {
        to: "school", label: "School", icon: <Check size={18} />,
        // icon: <Building size={18} />
    },
    {
        to: "position", label: "Position", icon: <Check size={18} />,
        //  icon: <Briefcase size={18} />
    },
    {
        to: "album", label: "Album", icon: <Check size={18} />,
        //  icon: <ImageIcon size={18} /> 
    },
    {
        to: "user", label: "User", icon: <Check size={18} />,
        // icon: <User size={18} />
    },
    { to: "employee", label: "Employee", icon: <Users size={18} /> },
    { to: "news", label: "News", icon: <Newspaper size={18} /> },
    { to: "document", label: "Document", icon: <FileText size={18} /> },
    { to: "main", label: "Main", icon: <Home size={18} /> },
    { to: "rules", label: "Rules", icon: <BookOpen size={18} /> },
    { to: "club", label: "Club", icon: <Users size={18} /> },
    { to: "value", label: "Value", icon: <Star size={18} /> },
    { to: "faq", label: "FAQ", icon: <IconFlagQuestion size={18} /> },
    { to: "hours", label: "SchoolHours", icon: <Clock size={18} /> },
    {
        to: "target", label: "Target", icon: <Check size={18} />,
        //  icon: <Target size={18} /> 
    },
    { to: "history", label: "History", icon: <BookOpen size={18} /> },
    {
        to: "information", label: "Information", icon: <Check size={18} />,
        // icon: <File size={18} />
    },
    {

        to: "vacancy", label: "Vacancy", icon: <Check size={18} />,
        // icon: <FileText size={18} />
    },
    {
        to: "admin-schedule", label: "Schedule",
        icon: <FileText size={18} />
    }
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

            <ScrollArea w={"auto"} h={"100%"} scrollbarSize={"hidden"} scrollbars="y">
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
            </ScrollArea>
        </Stack >
    );
};
