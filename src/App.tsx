import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./Components/Login";
import RegisterForm from "./Components/Register";
import Phishing from "./Components/Phishing";
import ProtectedRoute from "./Components/Route";


const App: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const cookies = document.cookie.split(";").reduce((acc: Record<string, string>, cookie) => {
            const [name, value] = cookie.trim().split("=");
            acc[name] = value;
            return acc;
        }, {});

        if (cookies.token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={authenticated ? "/home" : "/login"}/>}/>
                <Route path="/login" element={<LoginForm onLoginSuccess={function (username: string): void {
                    throw new Error("Function not implemented.");
                }}/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/home" element={<h1>Home Page</h1>}/>
                <Route path="/phishing" element={<ProtectedRoute element={<Phishing />} />} />
            </Routes>
        </Router>
    );
};

export default App;