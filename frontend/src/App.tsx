import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/AuthProvider";
import FinestRoutes from "./pages/FinestRoutes";
import MedDog from "./pages/MedDog";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/registration" element={<RegisterPage/>}/>
                    <Route path="/finestroutes" element={<FinestRoutes/>}/>
                    <Route path="/meddog" element={<MedDog/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
