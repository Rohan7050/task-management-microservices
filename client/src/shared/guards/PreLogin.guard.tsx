import {Navigate, Outlet} from "react-router-dom";

export default function PreLoginGuard() {
    const isLogin = localStorage.getItem('isLogin');
    return !isLogin ? <Outlet/> : <Navigate to='/board' replace/> 
}