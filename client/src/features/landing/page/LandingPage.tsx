import Button from "../../../shared/components/Button/Button";
import {useNavigate} from 'react-router-dom' 

function LandingPage() {
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate("register")
    }
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="">
                <h1 className="text-3xl font-bold text-white pb-4">Manage Your Tasks</h1>
                <p className="text-white pb-4">we help you manage your task, be productive, get things done on time.</p>
                <div className="">
                    <Button text={"Register"} color={"secondary"} action={handleRegister}></Button>
                </div>
            </div>
            <div className="">

            </div>
        </div>
    )
}

export default LandingPage;