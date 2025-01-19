import {useState} from "react"
import { fetchCreateUser } from "../api/authApi"
import { Box, Button, Grid2, TextField } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccountEdit, mdiHomeAccount, mdiAccountMultiple, mdiAccountTie } from '@mdi/js';

type ErrorUser = {
    username?: string,
    password?: string
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(10),
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
        <Box sx={{ flexGrow: 1, }}>
            <Stack direction="row" spacing={2}>
                <Avatar  sx={{ width: 25, height: 25 }}>
                    <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
                </Avatar>
                <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                    <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
                </Avatar>
                <h2>Create</h2>
            </Stack><br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    to={"/home"}
                    style={{display: "flex", alignItems: "center", color: "inherit"}}
                >
                    <Icon path={mdiHomeAccount} size={1} title={"Home"} style={{padding:"3px"}} />
                    Home
                </Link>
                <Link
                style={{ display: 'flex', alignItems: 'center', color: "inherit" }}
                to={"/Users"}
                >
                    <Icon path={mdiAccountMultiple} size={1} title={"Users"} style={{padding:"3px"}}  />
                    Users
                </Link>
                <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >
                    <Icon path={mdiAccountEdit} size={1} title={"Create User"} style={{padding:"3px"}} />
                Create user
                </Typography>
            </Breadcrumbs>
            <form onSubmit={handleSubmit}>
                <Item>
                    <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 8 }} >
                        <Grid2  size={12} >
                            <TextField
                                required
                                type="text"
                                name="username"
                                color="secondary" 
                                value={formData.username}
                                onChange={handleChange}
                                id="outlined-required"
                                label="Username"
                                defaultValue="Username"
                                size="small"
                                error={errorUsername?.username ? true : false}
                            />
                            {errorUsername && <p style={{ color: "red" }}>{errorUsername.username}</p>}
                        </Grid2>
                        <Grid2 size={{ xs: 12,  sm: 12, md: 12 }}>
                            <TextField
                                type="email"
                                name="email"
                                color="secondary" 
                                value={formData.email}
                                onChange={handleChange}
                                id="outlined-basic"
                                label="Email"
                                defaultValue="Email"
                                size="small"
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                color="secondary" 
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                size="small"
                                error={errorUsername?.password ? true : false}
                            />
                            {errorUsername && <p style={{ color: "red" }}>{errorUsername.password}</p>}
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md:12 }}>
                            <Button type="submit" variant="outlined" size="small" color="secondary">Submit</Button>
                        </Grid2>
                    </Grid2>
                </Item>
            </form>
           
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Box>
    )
}

export default Create