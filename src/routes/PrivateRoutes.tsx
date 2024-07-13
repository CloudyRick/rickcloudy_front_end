import { Outlet, Navigate } from "react-router-dom";
import { IElementProps } from "../types/propType";



const PrivateRoutes = ({ isAuthenticated } : IElementProps) => {
    return(
        isAuthenticated ? <Outlet/> : <Navigate replace to='/sign-in'/>
    )
}

export default PrivateRoutes;