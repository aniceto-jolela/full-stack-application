import {useEffect, useState} from "react"
import { fetchDetail, fetchUpdateAnyUser } from "../api/authApi"
import { useParams } from "react-router-dom"

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiHomeAccount, mdiAccountMultiple, mdiAccountTie } from '@mdi/js';
import { Grid2, TextField, Button } from "@mui/material";



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

const UpdateAnyUser = () => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState<ErrorUser>();
    const {id} = useParams<RouteParams>();

    const [formData, setFormData] = useState<UserProps>({
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
            const updateUser = await fetchUpdateAnyUser(id, formData);
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
                                defaultValue="Username"
                                size="small"
                                error={errorUsername?.username ? true : false}
                            />
                            {errorUsername && <p style={{ color: "red" }}>{errorUsername.username}</p>}
                            <br/><br/>
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
                            /><br/><br/>
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
                            <br/><br/>
                                <FormControlLabel sx={{marginLeft: -1}}  control={<Checkbox checked={formData.is_active} onChange={handleChange} name="is_active" color="secondary" />} label=": Is_Active" />
                               
                                <FormControlLabel   control={<Checkbox checked={formData.is_staff} onChange={handleChange} name="is_staff" color="secondary"/>} label=": Is_Staff" />
                                <br/>
                                <FormControlLabel sx={{marginLeft: -10}} control={<Checkbox checked={formData.is_superuser} onChange={handleChange} name="is_superuser" color="secondary" />} label=": Is_Superuser" />
                            <br/><br/>
                            <Button type="submit" sx={{marginLeft: -19}} variant="outlined" size="small" color="secondary">Submit</Button>
                        
                        </Item>
                        </form>
                    </Grid2>
            </Grid2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    )
}

export default UpdateAnyUser