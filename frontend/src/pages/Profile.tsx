import {useEffect, useState} from "react"
import { fetchProfile, fetchUpdateUser } from "../api/authApi"

type UserProps={
    username: string,
    email?: string,
    password?: string,
    is_active: boolean,
    is_staff?: boolean,
    is_superuser?: boolean, 
}

const Profile = () => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [FormData, setFormData] = useState<UserProps>({
        username: "",
        email: "",
        is_active: true,
        is_staff: false,
        is_superuser: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value, type, checked} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: type === "checkbox"? checked: value,
        }))
    }
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const updateUser = await fetchUpdateUser(FormData);
            setSuccessMessage("User update successfully!");
            console.log("Update User:", updateUser);
            
        } catch (error) {
            setError("Failed to update user. Please try again.");
            console.error(error);
        }

    }

    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchProfile()
                setFormData(data)
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
            <h5>User :  {FormData.username}</h5>
            <h5>Email : {FormData.email}</h5>
            <h5>Is_Active : {FormData.is_active ? "Active": "Inactive"}</h5>
            <h5>Is_Staff : {FormData.is_staff ? "User": "Non-user"}</h5>
            <h5>Is_SuperUser : {FormData.is_superuser ? "Admin": "Non-admin"}</h5>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>OK</p>}

            <h2>UPDATE USER</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User: 
                    <input 
                        type="text"
                        name="username"
                        value={FormData.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Email: 
                    <input 
                        type="email"
                        name="email"
                        value={FormData.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>
                    Password: 
                    <input 
                        type="password"
                        name="password"
                        value={FormData.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>
                    Is_Active: 
                    <input 
                        type="checkbox"
                        name="is_active"
                        checked={FormData.is_active}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Is_Staff: 
                    <input 
                        type="checkbox"
                        name="is_staff"
                        checked={FormData.is_active}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>
                    Is_Superuser: 
                    <input 
                        type="checkbox"
                        name="is_superuser"
                        checked={FormData.is_active}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    )
}

export default Profile