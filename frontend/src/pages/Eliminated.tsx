import {useEffect, useState} from "react"
import { fetchRecoverUser, fetchUsers } from "../api/authApi"

type User = {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
};

const Eliminated = () => {
  const [users, setUsers] = useState<User[]>([])
       const [error, setError] = useState<string | null>(null)
       const [userData] = useState({
       confirm: "recover",
       is_active: true,
    })
      
    useEffect(()=>{
        const getUser = async () => {
            try{
                const data = await fetchUsers()
                setUsers(data)
            }catch(error){
                console.error(error)
                setError("Failed to fetch users. Please try again.");
            }
        }
        getUser()
    }, [users])

    const handleRecoverUser = async (id: number | undefined) =>{
        try {
            const confirm = window.confirm("Are you sure you want to recover this user?")
            if(confirm){
                const data = await fetchRecoverUser(id, userData)
                console.log("User recover:", data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h2>Eliminated</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error && (
                <>
                <table border={1}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>User name</td>
                            <td>Role</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0?(
                            users.map((user)=>(<>
                                {!user.is_active?(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.is_active ? "Active": "Inative"}</td>
                                    <td><button onClick={()=>handleRecoverUser(user.id)}>Recover</button></td>
                                </tr>):null}
                            </>))
                        ):(
                            <tr>
                                <td colSpan={4}> Not found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </>
            )}
        </>
    )
}

export default Eliminated