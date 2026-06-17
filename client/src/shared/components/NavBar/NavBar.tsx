import Button from "../Button/Button";
import {useNavigate} from "react-router-dom"

function NavBar() {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate("login")
    }
    const navigateToLandingPage = () => {
        navigate("")
    } 
    return (
        <nav className="bg-purple-900 flex justify-between items-center h-20 mx-auto px-4 text-white">
            <h1 onClick={() => navigateToLandingPage()} className="text-lg font-bold">Task Macro</h1>
            <Button text={"Signup"} color={"secondary"} action={handleSignup}></Button>
            {/* <button>Logout</button> */}
        </nav>
    )
}

export default NavBar;