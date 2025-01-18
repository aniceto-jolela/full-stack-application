import {useState} from "react"
import { fetchCreateUser } from "../api/authApi"

type UserProps={
    username: string;
    email: string;
    password: string;
    is_active?: true;
    is_staff?: boolean;
    is_superuser?: boolean; 
}

const Create = () => {
    const [formData, setFormData] = useState<UserProps>({
        username: "",
        email: "",
        password: "",
      });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
    
        try {
          const newUser = await fetchCreateUser(formData);
          setSuccessMessage("User created successfully!");
          console.log("Created User:", newUser);
        } catch (err) {
          setError("Failed to create user. Please try again.");
          console.error(err);
        }
      };

    return (
        <>
            <h2>Create</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
            </label>
            <br />

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                   
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </label>
            <br />
            <button type="submit">Submit</button>
            </form>
           
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    )
}

export default Create