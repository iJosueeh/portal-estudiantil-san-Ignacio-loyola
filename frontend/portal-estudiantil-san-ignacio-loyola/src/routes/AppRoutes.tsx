import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../modules/auth/pages/Login";
import { DashboardPage } from "../modules/student/pages/DashboardPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    )
}