import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import RegisterCompany from './pages/RegisterCompany.jsx';
import Products from './pages/Products.jsx';
import Clients from './pages/Clients.jsx';
import Employees from './pages/Employees.jsx';
import Sales from './pages/Sales.jsx';
import Reports from './pages/Reports.jsx';
import MainMenu from './pages/MainMenu.jsx';
import Profile from './pages/Profile.jsx';
import injectContext from "./store/appContext";
import UserApproval from './pages/UserApproval.jsx';
import PruebaSales_ from './pages/PruebaSales_.jsx';
import ProductsEntry from './pages/ProductsEntry.jsx';
import ProductsMenu from './pages/ProductsMenu.jsx'; 

import States from './pages/States.jsx';


const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<RegisterCompany />} path="/register-company" />
                        <Route element={<MainMenu />} path="/main-menu" />
                        <Route element={<ProductsMenu />} path="/products-menu" /> 
                        <Route element={<Products />} path="/products" />
                        <Route element={<ProductsEntry />} path="/products-entry" /> 
                        <Route element={<Clients />} path="/clients" />
                        <Route element={<Employees />} path="/employees" />
                        <Route element={<Sales />} path="/sales" />
                        <Route element={<Reports />} path="/reports" />
                        <Route element={<Profile />} path="/profile" /> 
                        <Route element={<PruebaSales_ />} path="/PruebaSales" />
                        <Route element={<UserApproval />} path="/user-approval" />
                        <Route element={<States />} path="/states" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
