import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./Components/Login";
import RegisterForm from "./Components/Register";
import Phishing from "./Components/Phishing";
import ProtectedRoute from "./Components/Route";


const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={"/phishing"}/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/phishing" element={<ProtectedRoute element={<Phishing/>}/>}/>
            </Routes>
        </Router>
    );
};

export default App;