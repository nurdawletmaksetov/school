import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "../components/loader/PageLoader";
import NotFound from "../pages/NotFound/NotFound";

const Layout = lazy(() => import("../pages/Layout"));
const StartPage = lazy(() => import("../pages/startpage/StartPage"));
const About = lazy(() => import("../pages/about/About"));
const Education = lazy(() => import("../pages/education/Education"));
const Schedule = lazy(() => import("../pages/schedule/Schedule"));
const Rules = lazy(() => import("../pages/rules/Rules"));
const Teachers = lazy(() => import("../pages/Teachers/Teachers"));
const Support = lazy(() => import("../pages/support/Support"));
const News = lazy(() => import("../pages/news/News"));
const ReadNews = lazy(() => import("../pages/news/ReadNews"));
const Gallery = lazy(() => import("../pages/gallery/Gallery"));
const SeeGallery = lazy(() => import("../pages/gallery/SeeGallery"));

const AdminLayout = lazy(() => import("../dashboard/AdminLayout"));
const User = lazy(() => import("../dashboard/pages/User"));
const School = lazy(() => import("../dashboard/pages/School"));
const Position = lazy(() => import("../dashboard/pages/Position"));
const Album = lazy(() => import("../dashboard/pages/Album"));
const Employee = lazy(() => import("../dashboard/pages/Employee"));
const AdminNews = lazy(() => import("../dashboard/pages/AdminNews"));
const Document = lazy(() => import("../dashboard/pages/Document"));
const Value = lazy(() => import("../dashboard/pages/Value"));
const AdminRules = lazy(() => import("../dashboard/pages/Rules"));
const SchoolHours = lazy(() => import("../dashboard/pages/SchoolHours"));
const Target = lazy(() => import("../dashboard/pages/Target"));
const History = lazy(() => import("../dashboard/pages/History"));
const Information = lazy(() => import("../dashboard/pages/Information"));
const Vacancy = lazy(() => import("../dashboard/pages/Vacancy"));
const AdminSchedule = lazy(() => import("../dashboard/pages/AdminSchedule"));
const FAQ = lazy(() => import("../dashboard/pages/FAQ"));
const Club = lazy(() => import("../dashboard/pages/Club"));

const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<PageLoader />}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <StartPage />
                    </Suspense>
                ),
            },
            {
                path: "/teachers",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Teachers />
                    </Suspense>
                ),
            },
            {
                path: "/about",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/education",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Education />
                    </Suspense>
                ),
            },
            {
                path: "/schedule",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Schedule />
                    </Suspense>
                ),
            },
            {
                path: "/rules",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Rules />
                    </Suspense>
                ),
            },
            {
                path: "/news",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <News />
                    </Suspense>
                ),
            },
            {
                path: "/news/:id",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <ReadNews />
                    </Suspense>
                ),
            },
            {
                path: "/support",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Support />
                    </Suspense>
                ),
            },
            {
                path: "/gallery",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Gallery />
                    </Suspense>
                ),
            },
            {
                path: "gallery/:id",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <SeeGallery />
                    </Suspense>
                )
            }
        ],
    },
    {
        path: "*",
        element: (
            <NotFound />
        )
    },
    {
        path: "login",
        element: (
            <Suspense fallback={<PageLoader />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: "register",
        element: (
            <Suspense fallback={<PageLoader />}>
                <Register />
            </Suspense>
        ),
    },
    {
        path: "admin",
        element: (
            <Suspense fallback={<PageLoader />}>
                <AdminLayout />
            </Suspense>
        ),
        children: [
            {
                path: "school",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <School />
                    </Suspense>
                ),
            },
            {
                path: "position",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Position />
                    </Suspense>
                ),
            },
            {
                path: "album",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Album />
                    </Suspense>
                ),
            },
            {
                path: "user",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <User />
                    </Suspense>
                ),
            },
            {
                path: "employee",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Employee />
                    </Suspense>
                ),
            },
            {
                path: "news",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminNews />
                    </Suspense>
                ),
            },
            {
                path: "document",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Document />
                    </Suspense>
                ),
            },
            {
                path: "rules",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminRules />
                    </Suspense>
                ),
            },
            {
                path: "value",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Value />
                    </Suspense>
                ),
            },
            {
                path: "club",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Club />
                    </Suspense>
                )
            },
            {
                path: "faq",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <FAQ />
                    </Suspense>
                ),
            },
            {
                path: "hours",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <SchoolHours />
                    </Suspense>
                ),
            },
            {
                path: "target",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Target />
                    </Suspense>
                ),
            },
            {
                path: "history",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <History />
                    </Suspense>
                ),
            },
            {
                path: "information",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Information />
                    </Suspense>
                )
            },
            {
                path: "vacancy",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Vacancy />
                    </Suspense>
                )
            },
            {
                path: "admin-schedule",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminSchedule />
                    </Suspense>
                )
            },
        ],
    },
]);
