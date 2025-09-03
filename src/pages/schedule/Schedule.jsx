import React, { useState } from 'react'
import { Container } from '../../components/container/container'
import '../schedule/schedule.scss'
import { FileSpreadsheet } from 'lucide-react'
import { Button, Flex, Select, Text } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useOutletContext } from 'react-router-dom'

const Schedule = () => {
    const [value, setValue] = useState(['']);
    const [date, setDate] = useState(new Date());
    const { darkMode } = useOutletContext();
    const downloadFileAtURL = (url) => {
        if (!value === value.value) {
            alert('You need to select a class before downloading.');
            return;
        } else {
            const link = document.createElement('a');
            link.href = url;
            link.download = url.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
                                                Выберите класс и формат для скачивания
                                                расписания
                                            </p>
                                        </div>
                                        <div className="schedule-select">
                                            <Flex gap={7} align={'center'} justify={"center"}>
                                                <label className='select-label' htmlFor="select-class">
                                                    Выберите класс:
                                                </label>
                                                <Select
                                                    // style={{ background: darkMode ? '#121f36' : "#fff" }}
                                                    id='select-class'
                                                    placeholder="Pick value"
                                                    w={120}
                                                    h={40}
                                                    radius={'lg'}
                                                    data={['1/1 Comp', '1/2 Comp', '2/1 Comp', '2/2 Comp',
                                                        '1/1 A-D', '1/2 A-D', '1/3 A-D', '1/4 A-D', '1/1 A-E',
                                                        '1/2 A-E', '1/3 A-E', '1/4 A-E', '1/1 A-K', '1/2 A-K',
                                                        '1/3 A-K', '1/4 A-K', '2/1 A-D', '2/2 A-D', '2/3 A-D',
                                                        '2/4 A-D', '2/1 A-E', '2/2 A-E', '2/3 A-E',
                                                        '2/4 A-E', '2/1 A-K', '2/2 A-K', '2/3 A-K', '2/4 A-K',
                                                        '1/1 T', '2/1 T', '1/1 X', '2/1 X', '1/1 Q', '2/1 Q']}
                                                    value={value ? value.value : null}
                                                    onChange={(_value, option) => setValue(option)}
                                                />
                                            </Flex>

                                            <Text style={{ fontFamily: "Inter", size: '14px', fontWeight: '500', color: darkMode ? "#CBD5E1" : '#020817' }}>
                                                Выбран класс: {value.value}
                                            </Text>
                                            <Button onClick={() => downloadFileAtURL('/schedule.pdf')} radius={9999} style={{ background: darkMode ? '#121f36' : '#2563EB' }} leftSection={<IconDownload size={14} />}>Скачать расписание</Button>
                                        </div>
                                    </div>
                                    <div className="schedule-inf">
                                        <p>
                                            Последнее обновление расписаний:  {new Date(date).toLocaleDateString(setDate)}
                                        </p>
                                        <p>
                                            При обнаружении ошибок обращайтесь в
                                            учебную часть
                                        </p>
                                    </div>
                                </div>

                                <div className="dostupniy-schedule">
                                    <div className="dostupniy-schedule-heading">
                                        <h3>
                                            Доступные расписания
                                        </h3>
                                        <p>
                                            Список всех доступных для скачивания
                                            расписаний
                                        </p>
                                    </div>
                                    <div className="dostupniy-schedule-main">
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/1 Axbarat-Texnologiyalari
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/2 Axbarat-Texnologiyalari
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/1 Axbarat-Texnologiyalari
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/2 Axbarat-Texnologiyalari
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/1 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/2 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/3 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/4 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/1 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/2 Avto-Divigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/3 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/4 Avto-Dvigatel...
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/1 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/2 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/3 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/4 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/1 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/2 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/3 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/4 Avto-Electrik
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/1 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                11/2 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/3 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                1/4 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/1 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/2 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/3 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                        <div className="schedule-class-box">
                                            <h4>
                                                <FileSpreadsheet size={20} className='doc-icons' />
                                                2/4 Avto-Kuzov
                                            </h4>
                                            <p>
                                                Нажмите для выбора
                                            </p>
                                        </div>
                                    </div>
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