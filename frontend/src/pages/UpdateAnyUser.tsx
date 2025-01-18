import {useEffect, useState} from "react"
import { fetchDetail, fetchUpdateAnyUser } from "../api/authApi"
import { useParams } from "react-router-dom"

type UserProps={
    username: string,
    email?: string,
    password?: string,
    is_active: boolean,
    is_staff?: boolean,
    is_superuser?: boolean, 
}
type RouteParams = {
    id: string
}

const UpdateAnyUser = () => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {id} = useParams<RouteParams>();

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
            const updateUser = await fetchUpdateAnyUser(id, FormData);
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
                const data = await fetchDetail(id)
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
                        checked={FormData.is_staff}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>
                    Is_Superuser: 
                    <input 
                        type="checkbox"
                        name="is_superuser"
                        checked={FormData.is_superuser}
                        onChange={handleChange}
                    />
                </label>
                <br/><br/>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    )
}

export default UpdateAnyUser