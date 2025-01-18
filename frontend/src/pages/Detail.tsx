import {useEffect, useState} from "react"
import { fetchDetail } from "../api/authApi"
import { useParams } from "react-router-dom"

type UserProps={
    username: string,
    email: string,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean, 
}
type RouteParams = {
    id: string
}

const Detail = () => {
    const [user, setUser] = useState<UserProps>();
    const [error, setError] = useState("");
    const {id} = useParams<RouteParams>();

    useEffect(()=>{
        const getUser = async () => {
            try{
                const data = await fetchDetail(id)
                setUser(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
                console.error(error)
            }
        }
        getUser()
    }, [])

    return (
        <>
            <h2>Details</h2>
            <h5>User :  {user?.username}</h5>
            <h5>Email : {user?.email}</h5>
            <h5>Is_Active : {user?.is_active ? "Active": "Inactive"}</h5>
            <h5>Is_Staff : {user?.is_staff ? "User": "Non-user"}</h5>
            <h5>Is_SuperUser : {user?.is_superuser ? "Admin": "Non-admin"}</h5>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>OK</p>}
        </>
    )
}

export default Detail