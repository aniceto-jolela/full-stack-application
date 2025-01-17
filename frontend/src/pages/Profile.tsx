import {useEffect, useState} from "react"
import { fetchProfile } from "../api/authApi"

type UserProps={
    username: string,
    email: string,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean, 
}

const Profile = () => {
    const [user, setUser] = useState<UserProps>()
    const [error, setError] = useState("");

    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchProfile()
                setUser(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
                console.error(error)
            }
        }
        getMessage()
    }, [])

    return (
        <>
            <h2>Profile</h2>
            <h5>User :  {user?.username}</h5>
            <h5>Email : {user?.email}</h5>
            <h5>Is_Active : {user?.is_active ? "Active": "Inactive"}</h5>
            <h5>Is_Staff : {user?.is_staff ? "User": "Non-user"}</h5>
            <h5>Is_SuperUser : {user?.is_superuser ? "Admin": "Non-admin"}</h5>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>OK</p>}
        </>
    )
}

export default Profile