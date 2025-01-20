import { useState } from "react"
import { login } from "../../api/authApi"

import { Box, Button, Grid2, TextField } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
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
    padding: theme.spacing(7),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({username:"", password:""})
    const [error, setError] = useState("")
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
            await login(credentials)
        }catch(err: any){
            setError("Invalid credentials")
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
    }

    return(
        <>

<Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
            <Grid2  size={{ xs: 12, sm: 12, md: 12 }} >
                Login
            <form onSubmit={handleSubmit}>
                <Item>
                        <TextField
                            required
                            type="text"
                            name="username"
                            color="secondary" 
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            id="outlined-required"
                            label="Username"
                            defaultValue="Username"
                            size="small"
                            error={errorUsername?.username ? true : false}
                        />
                        {errorUsername && <p style={{ color: "red" }}>{errorUsername.username}</p>}
                        <br/><br/>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            color="secondary" 
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            autoComplete="current-password"
                            size="small"
                            error={errorUsername?.password ? true : false}
                        />
                        {errorUsername && <p style={{ color: "red" }}>{errorUsername.password}</p>}
                        <br/><br/>
                        <Typography sx={{marginLeft: 7, marginBottom:-2}} variant="subtitle2"  >
                            * Password must be at least 8 characters long.
                        </Typography>
                        <Typography sx={{marginLeft: 4, marginBottom:-2}} variant="subtitle2" ><br/>
                            * Password must contain at least one digit.
                        </Typography>
                        <Typography sx={{marginLeft: 14, marginBottom:-2}} variant="subtitle2" ><br/>
                            * Password must contain at least one uppercase letter.
                        </Typography>
                        <Typography sx={{marginLeft: 14, marginBottom:-2}} variant="subtitle2" ><br/>
                            * Password must contain at least one lowercase letter.
                        </Typography>
                        <Typography sx={{marginLeft: 14, marginBottom:-2}} variant="subtitle2" ><br/>
                            * Password must contain at least one special character.
                        </Typography>
                        <br/><br/>
                        <Button type="submit" sx={{marginLeft: -19}} variant="outlined" size="small" color="secondary">Submit</Button>
                </Item>
            </form>
            </Grid2>
            </Grid2>
        </>
    )
}

export default Login