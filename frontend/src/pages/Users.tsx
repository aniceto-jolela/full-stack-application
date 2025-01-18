import {useEffect, useState} from "react"
import { fetchDeleteUser, fetchUsers } from "../api/authApi"
import { Link } from "react-router-dom";

type UserProps = {
    confirm?: string;
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean; 
};

const Users = () => {
     const [users, setUsers] = useState<UserProps[]>([])
     const [error, setError] = useState<string | null>(null)
     const [userData] = useState({
             confirm: "delete",
             is_active: false,
             is_staff: false,
             is_superuser: false
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

     const handleDelete = async(id: number | undefined)=>{
        try {
            const confirm = window.confirm("Are you sure you want to delete this user?");
            if(confirm){
                const data = await fetchDeleteUser(id, userData)
                console.log("User deleted:", data);
            }
            
        } catch (error) {
            console.error("Error deleting user:", error);
        }
     }   
    
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
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0?(
                                users.map((user)=>(
                                    <>
                                    {user.is_active?(
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_active ? "Active": "Inative"}</td>
                                        <td><Link to={`detail/${user.id}/`}>Detail</Link> </td>
                                        <td><Link to={`edit/${user.id}/`}>Edit</Link> </td>
                                        <td><button onClick={()=>handleDelete(user.id)}>Delete</button></td>
                                    </tr>):null}
                                    </>
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