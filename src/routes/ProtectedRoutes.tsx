import { Navigate, Outlet } from "react-router-dom";
import { IElementProps } from "../types/propType";

// Protected Routes are route for every pages that is prohibited for any logged in users
const ProtectedRoutes = ({ isAuthenticated }: IElementProps) => {
    return !isAuthenticated ? <Outlet/> : <Navigate replace to='/'/>
}

export default ProtectedRoutes;