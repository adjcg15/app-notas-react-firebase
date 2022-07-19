import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { HomeScreen } from '../components/home/HomeScreen'

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomeScreen /> } />
            <Route path="auth/login" element={ <LoginScreen /> } />
            <Route path="auth/register" element={ <RegisterScreen /> } />
            <Route path="*" element={ <Navigate replace to="/" /> } />
        </Routes>
    )
}
