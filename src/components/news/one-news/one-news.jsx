import { Card, Flex, Group, Image, Text } from '@mantine/core'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uz-UZ', options);
}

export const OneNews = ({ id, image, title, body, date, darkMode }) => {
    console.log('Image prop:', image);

    return (
        <div className={`one-news${darkMode ? ' dark' : ''}`}>
            <Card
                style={{
                    background: darkMode ? '#121f36' : '#fff',
                    color: darkMode ? '#F1F5F9' : '#020817',
                    border: darkMode ? '1px solid #1e293b' : '1px solid #334155',
                }}
                shadow="sm"
                pb={25}
                pt={0}
                radius="md"
                h="auto"
                withBorder
            >
                <Card.Section>
                    <Flex align="center" justify="center" mt={10}>
                        <Image
                            radius="md"
                            width={366}
                            height={192}
                            src={image.path || `https://picsum.photos/366/192?random=${id}`}
                            alt={title}
                        />
                    </Flex>
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text size="sm" c="dimmed">{formatDate(date)}</Text>
                </Group>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} lineClamp={1}>{title}</Text>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={3}>
                    {body}
                </Text>

                <Link to={`/news/${id}`}>
                    <Flex align="center" gap={7} mt={10}>
                        Читать далее <ArrowRight size={16} />
                    </Flex>
                </Link>
            </Card>
        </div>
    )
}
