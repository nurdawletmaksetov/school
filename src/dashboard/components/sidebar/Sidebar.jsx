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
import { useTranslation } from "react-i18next";


export const Sidebar = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const links = [
        {
            to: "school", label: t("sidebar.school"),
            icon: <Building size={16} />
        },
        {
            to: "position", label: t("sidebar.position"),
            icon: <Briefcase size={16} />
        },
        {
            to: "album", label: t("sidebar.album"),
            icon: <ImageIcon size={16} />
        },
        {
            to: "user", label: t("sidebar.user"),
            icon: <User size={16} />
        },
        {
            to: "employee", label: t("sidebar.employee"),
            icon: <Users size={16} />
        },
        {
            to: "news", label: t("sidebar.news"),
            icon: <Newspaper size={16} />
        },
        {
            to: "document", label: t("sidebar.document"),
            icon: <FileText size={16} />
        },
        {
            to: "rules", label: t("sidebar.rules"),
            icon: <BookOpen size={16} />
        },
        {
            to: "club", label: t("sidebar.club"),
            icon: <Users size={16} />
        },
        {
            to: "value", label: t("sidebar.value"),
            icon: <Star size={16} />
        },
        {
            to: "faq", label: "FAQ",
            icon: <IconFlagQuestion size={16} />
        },
        {
            to: "hours", label: t("sidebar.schoolhours"),
            icon: <Clock size={16} />
        },
        {
            to: "target", label: t("sidebar.target"),
            icon: <Target size={16} />
        },
        {
            to: "history", label: t("sidebar.history"),
            icon: <BookOpen size={16} />
        },
        {
            to: "information", label: t("sidebar.information"),
            icon: <File size={16} />
        },
        {

            to: "vacancy", label: t("sidebar.vacancy"),
            icon: <FileText size={16} />
        },
        {
            to: "admin-schedule", label: t("sidebar.schedule"),
            icon: <FileText size={16} />
        }
    ];

    return (
        <Stack
            gap={20}
            h="100vh"
            w="180px"
            p={12}
            style={{ borderRight: "1px solid #2C2E33" }}
        >
            <Title order={4} align="center" style={{ fontSize: 16 }}>
                {t("politechnicum")}
            </Title>

            <ScrollArea w={"auto"} h={"100%"} scrollbarSize={"hidden"} scrollbars="y">
                <Stack gap={6}>
                    {links.map((item) => (
                        <NavLink
                            key={item.to}
                            label={item.label}
                            component={Link}
                            to={item.to}
                            bdrs={4}
                            leftSection={item.icon}
                            active={location.pathname.includes(item.to)}
                            styles={(theme) => ({
                                active: {
                                    backgroundColor: theme.colors.blue[7],
                                    color: "white",
                                },
                                root: {
                                    padding: "6px 10px",
                                },
                                label: {
                                    fontSize: 14,
                                },
                            })}
                        />
                    ))}
                </Stack>
            </ScrollArea>
        </Stack>
    );
};
