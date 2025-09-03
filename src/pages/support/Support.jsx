import { ChevronDown, CircleQuestionMark, MapPin, Phone } from 'lucide-react';
import { Container } from '../../components/container/container';
import '../support/support.scss'
import { useOutletContext } from 'react-router-dom';
const Support = () => {
    const { darkMode } = useOutletContext();
    return (
        <>
            <main className={`support-dark${darkMode ? ' dark' : ''}`}>
                <section>
                    <Container>
                        <div className="support">
                            <div className="support-heading">
                                <h1>Поддержка и FAQ</h1>
                                <p>Найдите ответы на часто задаваемые вопросы и получите необходимую информацию о нашей школе.</p>
                            </div>
                            <div className="support-main">
                                <div className="support-top">
                                    <div className="support-top-headline">
                                        <h4>
                                            <CircleQuestionMark size={20} /> Часто задаваемые вопросы
                                        </h4>
                                    </div>
                                    <div className="support-bottom">
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    What are the school hours?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    How do I enroll my child in the school?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    What is the school's attendance policy?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    How can parents get involved in the school?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    What extracurricular activities are available?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    How does the school handle bullying?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    What technology resources are available to students?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                        <details name='support'>
                                            <summary>
                                                <p>
                                                    How are students assessed and graded?
                                                </p>
                                                <ChevronDown size={16} />
                                            </summary>
                                            <div className="detail">
                                                <p>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ad sapiente
                                                    voluptatibus beatae accusantium minima!
                                                </p>
                                            </div>
                                        </details>
                                    </div>
                                </div>
                                <div className="support-contact-us">
                                    <div className="support-contact-us-headline">
                                        <h3>
                                            Контактная информация
                                        </h3>
                                    </div>
                                    <div className="support-contact-us-main">
                                        <div className="support-contact-main-top">
                                            <div className="support-map support-boxes">
                                                <div className="support-box-icon">
                                                    <MapPin size={40} />
                                                </div>
                                                <div className="support-box-info">
                                                    <h4>Адрес</h4>
                                                    <p>123 School Street, City, Country</p>
                                                </div>
                                            </div>
                                            <div className="support-phone support-boxes">
                                                <div className="support-box-icon">
                                                    <Phone size={40} />
                                                </div>
                                                <div className="support-box-info">
                                                    <h4>Телефон</h4>
                                                    <p>
                                                        +1 234 567 891
                                                    </p>
                                                    <p>
                                                        +1 234 567 890
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="support-email support-boxes">
                                                <div className="support-box-icon">
                                                    <MapPin size={40} />
                                                </div>
                                                <div className="support-box-info">
                                                    <h4>Email</h4>
                                                    <p>
                                                        info@politechnicum.edu
                                                    </p>
                                                    <p>
                                                        support@politechnicum.edu
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="support-contact-main-btm">
                                            <div className="support-work-hour-headline">
                                                <h4>
                                                    Часы работы
                                                </h4>
                                            </div>
                                            <div className="support-work-hour-btm">
                                                <div className="swork-hour-left">
                                                    <h5>
                                                        Администрация
                                                    </h5>
                                                    <div className="swork-hour-ph">
                                                        <p>
                                                            Понедельник - Пятница: 8:00 - 17:00
                                                        </p>
                                                        <p>
                                                            Суббота - Воскресенье: Закрыто
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="swork-hour-right">
                                                    <h5>
                                                        Учебные часы
                                                    </h5>
                                                    <div className="swork-hour-ph">
                                                        <p>
                                                            Понедельник - Пятница: 8:00 - 15:30
                                                        </p>
                                                        <p>
                                                            Суббота - Воскресенье: Закрыто
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
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

export default Support;