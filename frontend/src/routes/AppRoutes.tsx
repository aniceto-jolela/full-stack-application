import {createBrowserRouter} from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/Home"))
const About = lazy(() => import("../pages/About"))
import ErrorPage from "../pages/ErrorPage";
import Header from "../components/header";
import Security from "../pages/Security";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import Login from "../features/auth/Login";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        errorElement: <ErrorPage />,
        children:[
            {path: "/", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>},
            {path: "/about", element: <Suspense fallback={<div>Loading...</div>} ><About /></Suspense>},
            {path: "/login", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>},
            {path: "/security", element: <Suspense fallback={<div>Loading...</div>}><Security /></Suspense>},
            {path: "/profile", element: <Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>},
            {path: "/users", element: <Suspense fallback={<div>Loading...</div>}><Users /></Suspense>}
        ]
    },
]);

export default AppRoutes;