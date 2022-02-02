import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
        <NavBar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/registration" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
