import {useState} from "react"
import { fetchCreateUser } from "../api/authApi"
import { Box, Stack, TextField } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type ErrorUser = {
    username?: string,
    password?: string
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

const Create = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      });
    const [error, setError] = useState("");
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
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
        } catch (err: any) {
          setError("Failed to create user. Please try again.");
          
          setErrorUsername({username:"", password:""})
          if (err.response?.data?.username){
              setErrorUsername((prev)=>({...prev, username: err.response.data.username[0]}))
          }
          if(err.response?.data?.password){
              setErrorUsername((prev)=>({...prev, password: err.response.data.password[0]}))
          }
          console.log("Have =>", err.response)   
          console.log(err);
        }
      };

    return (
        <>
            <h2>Create</h2>
            <Stack sx={{justifyContent: "center", alignItems: "center"}}  spacing={{ xs: 8, sm: 8, md: 8 }} direction="row" >
            <form onSubmit={handleSubmit}>
                <Item>
                <TextField
                    required
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    id="outlined-required"
                    label="Username"
                    defaultValue="Username"
                    size="small"
                />
                {errorUsername && <p style={{ color: "red" }}>{errorUsername.username}</p>}
                </Item>
            <br />
            <Item>
                <TextField
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="outlined-basic"
                    label="Email"
                    defaultValue="Email"
                    size="small"
                />
            </Item>

            <br />
            <Item>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    size="small"
                />
                
                {errorUsername && <p style={{ color: "red" }}>{errorUsername.password}</p>}
            </Item>
            <br />
            <button type="submit">Submit</button>
            </form>
           
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </Stack>
        </>
    )
}

export default Create