import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from './PageWrapper.module.css' 

function PageWrapper() {
    return (
        <>
            <NavBar/>
            <main className={`${style.mainSectionBg} relative flex justify-center items-center bg-purple-300 isolate min-h-screen pt-12 px-4`}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default PageWrapper;