import { useState } from "react"
import { login } from "../../api/authApi"
import { Button, Grid2, TextField } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { PasswordTooltip } from "../../components/PasswordTooltip";
import { ErrorUser } from "../../types/types";


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
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        try{
            await login(credentials)
            setErrorUsername({username:"", password:""})
            setCredentials({username:"", password:""})
        }catch(err: any){
            enqueueSnackbar('Invalid credentials. Please try again.', { variant: 'error' });
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
                        size="small"
                        error={errorUsername?.username ? true : false}
                    />
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.username}</p>: <p></p>}
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
                    <PasswordTooltip/>
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.password}</p>:<p></p>}
                    <Button type="submit" sx={{marginLeft: -19}} variant="outlined" size="small" color="secondary">Submit</Button>
                </Item>
            </form>
            </Grid2>
        </Grid2>
        </>
    )
}

export default Login