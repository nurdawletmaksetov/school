import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Menu, UnstyledButton, Image, Flex } from '@mantine/core';
import classes from './LanguagePicker.module.scss';
import { useTranslation } from 'react-i18next';

const data = [
    { label: 'Karakalpak', image: 'https://kkmi.uz/wp-content/uploads/2024/08/qq.jpg', value: 'kk' },
    { label: 'Uzbek', image: 'https://flagcdn.com/uz.svg', value: 'uz' },
    { label: 'Russian', image: 'https://flagcdn.com/ru.svg', value: 'ru' },
    { label: 'English', image: 'https://flagcdn.com/us.svg', value: 'en' },
];

export function LanguagePicker() {
    const [opened, setOpened] = useState(false);
    const { i18n } = useTranslation();

    const [selected, setSelected] = useState(
        data.find(item => item.value === i18n.language) || data[0]
    );

    const handleSelect = (item) => {
        setSelected(item);
        i18n.changeLanguage(item.value);
    };

    const items = data.map((item) => (
        <Menu.Item
            key={item.value}
            leftSection={<Image src={item.image} w={22} h={22} radius={"100%"} />}
            onClick={() => handleSelect(item)}
        >
            {item.label}
        </Menu.Item>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton onChange={(e) => i18n.changeLanguage(e.target.value)} className={classes.control} data-expanded={opened || undefined}>
                    <Flex gap="xs" align={"center"}>
                        <Image src={selected.image} w={22} h={22} radius={"100%"} />
                        <span className={classes.label}>{selected.label}</span>
                    </Flex>
                    <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    );
}
