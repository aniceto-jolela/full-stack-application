import { useState } from "react"
import { login } from "../../api/authApi"

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({username:"", password:""})
    const [error, setError] = useState("")

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
            await login(credentials)
        }catch(err){
            setError("Invalid credentials")
            console.log(err)
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login