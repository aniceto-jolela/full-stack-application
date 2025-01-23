import { useState } from "react"
import { login } from "../../api/authApi"
import { Button, Grid2, TextField } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import Icon from '@mdi/react';
import { mdiAccountLock, mdiLock, mdiAccount } from '@mdi/js';
import { ErrorUser } from "../../types/types";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
}));


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username:"", password:""})
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        try{
            await login(credentials, navigate)
            setErrorUsername({username:"", password:""})
            setCredentials({username:"", password:""})
        }catch(err: any){
            setErrorUsername({username:"", password:""})
          if (err.response?.data?.error){
            enqueueSnackbar(`${err.response?.data?.error}`, { variant: 'error' });
          }
          
        }
    }

    return(
        <>
        <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 12 }} sx={{justifyContent:"center", marginTop: 7,}}>
            <Grid2  size={{ xs: 12, sm: 8, md: 6 }} >
            <Icon path={mdiAccountLock} size={1} style={{marginBottom: -4}} color="#884ea0" />
                
            <form onSubmit={handleSubmit}>
                <Item sx={{paddingBottom: 11, paddingTop:10}}>
                    <Icon path={mdiAccount} size={1} style={{marginBottom: -15, padding:3}} />
                    <TextField
                        required
                        type="text"
                        name="username"
                        color="secondary" 
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        id="outlined-required"
                        label="Username"
                        size="small"
                        error={errorUsername?.username ? true : false}
                    />
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.username}</p>: <p></p>}
                    <Icon path={mdiLock} size={1} style={{marginBottom: -15, padding:4}} />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        color="secondary" 
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        autoComplete="current-password"
                        size="small"
                        error={errorUsername?.password ? true : false}
                    /><br/>
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.password}</p>:<p></p>}
                    <Button type="submit" sx={{marginLeft: -16}} variant="outlined" size="small" color="secondary">Submit</Button>
                </Item>
            </form>
            </Grid2>
        </Grid2>
        </>
    )
}

export default Login