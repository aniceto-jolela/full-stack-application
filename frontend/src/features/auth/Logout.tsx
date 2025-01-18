import { useNavigate } from "react-router-dom"
import { logout } from "../../api/authApi"

const Logout: React.FC = () => {
    const navigate = useNavigate()

    const handleClick =()=>{
        logout()
        navigate("/home", {replace: true})
    }

    return(
        <div>
            <h2>Logout</h2>
            <h6>Are you sure ?</h6>
            <button onClick={handleClick}>Yes</button>
        </div>
    )
}

export default Logout