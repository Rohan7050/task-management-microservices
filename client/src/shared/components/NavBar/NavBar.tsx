import { UserDataService } from "../../../features/auth/service/user-data.service";
import { useBoardStore } from "../../../features/boards/pages/store/board.store";
import { useAuthStore } from "../../store/auth.store";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom"

function NavBar() {
    const navigate = useNavigate();
    const {user, logout} = useAuthStore()
    const { clearBoard } = useBoardStore();
    const handleSignup = () => {
        navigate("login")
    }
    const navigateToLandingPage = () => {
        navigate("")
    } 
    const handleLogout = () => {
        UserDataService.logoutUser({});
        logout();
        navigate("")
        clearBoard();
    }
    return (
        <nav className="bg-purple-900 flex justify-between items-center h-20 mx-auto px-4 text-white">
            <h1 onClick={() => navigateToLandingPage()} className="text-lg font-bold">Task Macro</h1>
            {
                user ? <Button text={"Logout"} color={"secondary"} action={handleLogout}></Button> : <Button text={"Signup"} color={"secondary"} action={handleSignup}></Button>
            }
        </nav>
    )
}

export default NavBar;