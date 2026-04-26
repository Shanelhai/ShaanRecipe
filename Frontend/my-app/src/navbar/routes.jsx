import React from "react";
import Home from "../allcomponent/home/home";
import About from "../allcomponent/about/about";
import Contact from "../allcomponent/contact/contact";
import Userdetials from "../allcomponent/userdetails/userdetails";
import Footer from "../allcomponent/footer/footer";
import Privacy from "../allcomponent/privacy/privacy";
import Register from "../dashboard/register";
import Login from "../dashboard/login";
import Dashboard from "../dashboard/dashboard";
import Recipes from "../allcomponent/foodrecipe/recipes";
import Recipedetails from "../allcomponent/foodrecipe/recipedetails/recipedetails";


const ROUTES = {

    Home: {
        path: "/",
        element: <Home />,
    },
    About: {
        path: "/about",
        element: <About />,
    },
    Recipes: {
        path: "/recipes",
        element: <Recipes />,
    },
    Recipedetails: {
        path: "/recipedetails/:id",
        element: <Recipedetails />,
    },
    Contact: {
        path: "/contact",
        element: <Contact />,
    },
    Register: {
        path: "/register",
        element: <Register />,
    },
    Login: {
        path: "/login",
        element: <Login />,
    },
    Footer: {
        path: "/footer",
        element: <Footer />,
    },
    Privacy: {
        path: "/privacy",
        element: <Privacy />,
    },
    Userdetials: {
        path: "/userdetails",
        element: <Userdetials />,
    },
    Dashboard: {
        path: "/dashboard",
        element: <Dashboard />,
    },
}

export default ROUTES;