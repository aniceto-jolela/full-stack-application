import {useEffect, useState} from "react"
import { useParams, Link } from "react-router-dom"
import { fetchDetail, fetchUpdateAnyUser } from "../api/authApi"
import { Grid2, Alert, AlertTitle, Paper, FormControlLabel, Stack, TextField, Button, Checkbox, styled, Breadcrumbs, Avatar, Typography } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiHomeAccount, mdiAccountMultiple, mdiAccountTie } from '@mdi/js';
import { PasswordTooltip } from "../components/PasswordTooltip";
import { ErrorUser, RouteParams } from "../types/types";



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


const UpdateAnyUser = () => {
    const [error, setError] = useState("");
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
    const { enqueueSnackbar } = useSnackbar();
    const {id} = useParams<RouteParams>();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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

        try {
            const updateUser = await fetchUpdateAnyUser(id, formData);
            setErrorUsername({username:"", password:""})
            enqueueSnackbar(`( ${updateUser.user.username} ), update successfully!`, { variant: 'success' });
            
        } catch (error: any) {
            enqueueSnackbar('Failed to update user. Please try again.', { variant: 'error' });
            setErrorUsername({username:"", password:""})
            if (error.response?.data?.username){
                setErrorUsername((prev)=>({...prev, username: error.response.data.username[0]}))
            }
            if(error.response?.data?.password){
                setErrorUsername((prev)=>({...prev, password: error.response.data.password[0]}))
            }
        }
    }


    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchDetail(id)
                setFormData(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
            }
        }
        getMessage()
    }, [])

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Avatar  sx={{ width: 25, height: 25 }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    Update User
                </Typography>
            </Stack><br/><br/>
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
                    <Icon path={mdiAccountEditOutline} size={1} title={"Update User"} style={{padding:"3px"}} spin />
                </Typography>
            </Breadcrumbs>
            <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >

            <Grid2 size={{ xs: 12,  sm: 12, md: 12 }}>
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
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                color="secondary" 
                                onChange={handleChange}
                                autoComplete="current-password"
                                size="small"
                                error={errorUsername?.password ? true : false}
                            /><br/>
                            <PasswordTooltip />
                            {errorUsername ? <p style={{ color: "red" }}>{errorUsername.password}</p>:<p></p>}
                                <FormControlLabel sx={{marginLeft: -1}}  control={<Checkbox checked={formData.is_active} required onChange={handleChange} name="is_active" color="secondary" />} label=": Is_Active" />
                                <FormControlLabel   control={<Checkbox checked={formData.is_staff} onChange={handleChange} name="is_staff" color="secondary"/>} label=": Is_Staff" />
                                <br/>
                                <FormControlLabel sx={{marginLeft: -12}} control={<Checkbox checked={formData.is_superuser} onChange={handleChange} name="is_superuser" color="secondary" />} label=": Is_Superuser" />
                            <br/><br/>
                            <Button type="submit" sx={{marginLeft: -19}} variant="outlined" size="small" color="secondary">Submit</Button>
                        
                        </Item>
                        </form>
                    </Grid2>
            </Grid2>
            {error && <p><Alert severity="warning"><AlertTitle>Warning</AlertTitle>{error}</Alert></p>}
        </>
    )
}

export default UpdateAnyUser