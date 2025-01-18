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

import Logout from "../features/auth/Logout";
import AuthRedirect, { AuthRedirectRoot } from "../components/authRedirect";
import Eliminated from "../pages/Eliminated";
import Detail from "../pages/Detail";
import Create from "../pages/Create";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        errorElement: <ErrorPage />,
        children:[
            {path: "/", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>},
            {path: "/home", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>},
            {path: "/about", element: <Suspense fallback={<div>Loading...</div>} ><About /></Suspense>},
            {path: "/login", element: (<AuthRedirectRoot><Suspense fallback={<div>Loading...</div>}><Login /></Suspense></AuthRedirectRoot>)},
            {path: "/logout", element: (<AuthRedirect><Suspense fallback={<div>Loading...</div>}><Logout/></Suspense></AuthRedirect>)},
            {path: "/security", element: (<AuthRedirect><Suspense fallback={<div>Loading...</div>}><Security /></Suspense></AuthRedirect>),},
            {path: "/profile", element: (<AuthRedirect><Suspense fallback={<div>Loading...</div>}><Profile /></Suspense></AuthRedirect>)},
            {path: "/users", element: <AuthRedirect><Suspense fallback={<div>Loading...</div>}><Users /></Suspense></AuthRedirect>},
            {path: "/users/create", element: <AuthRedirect><Suspense fallback={<div>Loading...</div>}><Create /></Suspense></AuthRedirect>},
            {path: "/users/detail/:id/", element: <AuthRedirect><Suspense fallback={<div>Loading...</div>}><Detail /></Suspense></AuthRedirect>},
            {path: "/users/eliminated", element: <AuthRedirect><Suspense fallback={<div>Loading...</div>}><Eliminated /></Suspense></AuthRedirect>}
        ]
    },
]);

export default AppRoutes;