import {useState} from "react"
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { fetchCreateUser } from "../api/authApi"
import { Button, Grid2, TextField, Paper, styled, Avatar, Stack, Typography, Breadcrumbs } from "@mui/material"
import { deepPurple } from '@mui/material/colors';
import { mdiAccountEdit, mdiHomeAccount, mdiAccountMultiple, mdiAccountTie } from '@mdi/js';
import { useSnackbar } from 'notistack';
import { PasswordTooltip } from "../components/PasswordTooltip";


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
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const newUser = await fetchCreateUser(formData);
          setErrorUsername({username:"", password:""})
          setFormData({username:"", email:"", password:""})
          enqueueSnackbar(`( ${newUser.data.user.username} ), created successfully!`, { variant: 'success' });
        } catch (err: any) {
          enqueueSnackbar('Failed to create user. Please try again.', { variant: 'error' });
          setErrorUsername({username:"", password:""})
          if (err.response?.data?.username){
              setErrorUsername((prev)=>({...prev, username: err.response.data.username[0]}))
          }
          if(err.response?.data?.password){
              setErrorUsername((prev)=>({...prev, password: err.response.data.password[0]}))
          }
        }
      };

    return (
        <>
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
                    <Icon path={mdiAccountEdit} size={1} title={"Create User"} spin style={{padding:"3px"}} />
                </Typography>
            </Breadcrumbs>
            <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
            <Grid2  size={{ xs: 12, sm: 12, md: 12 }} >
            <form onSubmit={handleSubmit}>
                <Item>
                    <TextField
                        required
                        type="text"
                        name="username"
                        color="secondary" 
                        value={formData.username}
                        onChange={handleChange}
                        id="outlined-required"
                        label="Username"
                        size="small"
                        error={errorUsername?.username ? true : false}
                    />
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.username}</p>: <p></p>}
                    <TextField
                        type="email"
                        name="email"
                        color="secondary" 
                        value={formData.email}
                        onChange={handleChange}
                        id="outlined-basic"
                        label="Email"
                        size="small"
                    />
                    <br/><br/>
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
                    /><br/>
                    <PasswordTooltip />
                    {errorUsername ? <p style={{ color: "red" }}>{errorUsername.password}</p>:<p></p>}
                    <Button type="submit" sx={{marginLeft: -19}} variant="outlined" size="small" color="secondary">Submit</Button>
                </Item>
            </form>
            </Grid2>
            </Grid2>
        </>
    )
}

export default Create