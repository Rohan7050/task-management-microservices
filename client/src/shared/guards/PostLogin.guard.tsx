import {Navigate, Outlet} from "react-router-dom";

export default function PostLoginGuard() {
    const isLogin = localStorage.getItem('isLogin');
    return isLogin ? <Outlet/> : <Navigate to='/login' replace/> 
}