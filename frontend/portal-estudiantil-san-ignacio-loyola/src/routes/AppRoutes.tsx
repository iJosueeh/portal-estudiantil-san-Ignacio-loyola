import { Routes, Route} from "react-router-dom";
import { Login } from "../modules/login/pages/Login";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}