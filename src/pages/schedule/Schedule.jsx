import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container/container'
import '../schedule/schedule.scss'
import { FileSpreadsheet } from 'lucide-react'
import { Button, Flex, Loader, Select, Text } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/api'
import axios from 'axios'
import { notifications } from '@mantine/notifications'

const Schedule = () => {
    const [selectedClass, setSelectedClass] = useState('')
    const [date, setDate] = useState(new Date())
    const { darkMode } = useOutletContext()
    const [schedule, setSchedule] = useState([])
    const [loading, setLoading] = useState(false)
    const { t, i18n } = useTranslation()
    const language = i18n.language

    async function getSchedule() {
        setLoading(true)
        try {
            const { data } = await api.get('/main/schedule')
            setSchedule(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSchedule()
    }, [])

    const handleDownload = async (downloadUrl, fileName) => {
        try {
            const response = await axios.get(downloadUrl, { responseType: 'blob' })
            const blob = new Blob([response.data])
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName || 'schedule')
            document.body.appendChild(link)
            link.click()
            link.remove()

            setTimeout(() => window.URL.revokeObjectURL(url), 1000)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <main className={`schedule-dark${darkMode ? ' dark' : ''}`}>
                <section>
                    <Container>
                        <div className="schedule">
                            <div className="schedule-headline">
                                <h1>Расписание занятий</h1>
                                <p>
                                    Скачайте расписание занятий для нужного класса в удобном формате (PDF, Excel, CSV или JSON).
                                </p>
                            </div>
                            <div className="schedule-bottom">
                                <div className="download-schedule-container">
                                    <div className="download-schedule">
                                        <div className="download-schedule-heading">
                                            <h1>
                                                <FileSpreadsheet size={17} className='doc-icons' /> Скачать расписание занятий
                                            </h1>
                                            <p>
                                                Выберите класс и формат для скачивания расписания
                                            </p>
                                        </div>
                                        <div className="schedule-select">
                                            <Flex gap={7} align={'center'} justify={"center"}>
                                                <label className='select-label' htmlFor="select-class">
                                                    Выберите класс:
                                                </label>
                                                <Select
                                                    id='select-class'
                                                    placeholder="Pick class"
                                                    w={160}
                                                    h={40}
                                                    radius={'lg'}
                                                    data={schedule.schedules?.map((item) => ({
                                                        value: item.download_url,
                                                        label: item.name
                                                    }))}
                                                    value={selectedClass}
                                                    onChange={(val) => setSelectedClass(val)}
                                                />
                                            </Flex>

                                            <Text style={{
                                                fontFamily: "Inter",
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: darkMode ? "#CBD5E1" : '#020817'
                                            }}>
                                                Выбран класс: {schedule.schedules?.find(s => s.download_url === selectedClass)?.name || 'не выбран'}
                                            </Text>
                                            <Button
                                                onClick={() => {
                                                    if (!selectedClass) {
                                                        notifications.show({
                                                            title: "Error",
                                                            message: "Please select a class",
                                                            color: "red",
                                                        })
                                                        return
                                                    }
                                                    const selected = schedule.schedules.find(s => s.download_url === selectedClass)
                                                    handleDownload(selected.download_url, `${selected.name}.pdf`)
                                                }}
                                                radius={9999}
                                                style={{ background: darkMode ? '#121f36' : '#2563EB' }}
                                                leftSection={<IconDownload size={14} />}
                                            >
                                                Скачать расписание
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="schedule-inf">
                                        <p>
                                            Последнее обновление расписаний: {new Date(date).toLocaleDateString()}
                                        </p>
                                        <p>
                                            При обнаружении ошибок обращайтесь в учебную часть
                                        </p>
                                    </div>
                                </div>

                                <div className="dostupniy-schedule">
                                    <div className="dostupniy-schedule-heading">
                                        <h3>Доступные расписания</h3>
                                        <p>Список всех доступных для скачивания расписаний</p>
                                    </div>
                                    {loading ? (
                                        <Flex justify={'center'} align={'center'} h={'100%'}>
                                            <Loader size={50} />
                                        </Flex>
                                    ) : (
                                        <div className="dostupniy-schedule-main">
                                            {schedule.schedules?.map((el) => (
                                                <div
                                                    className="schedule-class-box"
                                                    key={el.id}
                                                    onClick={() => handleDownload(el.download_url, `${el.name}.pdf`)}
                                                >
                                                    <h4>
                                                        <FileSpreadsheet size={20} className='doc-icons' />
                                                        {el.name}
                                                    </h4>
                                                    <p>Нажмите для скачивания</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

export default Schedule
