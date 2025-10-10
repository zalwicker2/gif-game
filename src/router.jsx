import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/lobby',
        element: <Lobby />
    }
]

export default function AppRouter() {
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />
}