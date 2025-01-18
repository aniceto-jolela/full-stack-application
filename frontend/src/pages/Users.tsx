import {useEffect, useState} from "react"
import { fetchUsers } from "../api/authApi"
import { Link } from "react-router-dom";

type User = {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
};

const Users = () => {
     const [users, setUsers] = useState<User[]>([])
     const [error, setError] = useState<string | null>(null)
    
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
        }, [])
    
        return (
            <>
                <h2>Users</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!error && (
                    <>
                    <Link to={'create'}>Add</Link> | 
                    <Link to={'eliminated'}>Eliminated</Link>
                    <table border={1}>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>User name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Details</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0?(
                                users.map((user)=>(
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_active ? "Active": "Inative"}</td>
                                        <td><Link to={`detail/${user.id}/`}>Detail</Link> </td>
                                    </tr>
                                ))
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

export default Users