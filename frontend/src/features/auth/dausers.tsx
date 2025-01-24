import { useNavigate } from "react-router-dom"
import { fetchDeleteAllUser, fetchProfile, logout } from "../../api/authApi"
import { Alert, AlertTitle, Button, Grid2 } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import {  mdiHomeAccount, mdiAccountTie, mdiDeleteCircleOutline, } from '@mdi/js';
import { useEffect, useState } from "react";
import { UserProps } from "../../types/types";
import { enqueueSnackbar } from "notistack";


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



const DaUsers: React.FC = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<UserProps>({
        username: "",
        email: "",
        password: "",
        is_active: true,
        is_staff: false,
        is_superuser: false
    })

    const handleClick = async()=>{
        try{
            const data = await fetchDeleteAllUser();
            enqueueSnackbar(data.alldelete, { variant: 'success' });
            console.log(data)
            logout()
            navigate("/home", {replace: true})
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchProfile()
                setFormData(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
            }
        }
        getMessage()
    }, [])

    return(
        <>
            {error && <Alert severity="warning"><AlertTitle>Warning</AlertTitle>{error}</Alert>}
            {!error && <>
            {formData.is_superuser?<>
            <Stack direction="row" spacing={2}>
                <Avatar  sx={{ width: 25, height: 25 }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    Delete all users
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
                <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >
                    <Icon path={mdiDeleteCircleOutline} size={1} title={"Logout"} style={{padding:"3px"}}  />
                </Typography>
            </Breadcrumbs>
            <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
                <Grid2 size={{ xs: 12,  sm: 12, md: 12 }}>
                    <Item sx={{paddingTop:13, paddingBottom: 15}}>
                        <Icon path={mdiDeleteCircleOutline} size={2} title={"Logout"} color={"rgb(206, 55, 55)"} spin /><br/><br/>
                        
                        <Typography variant="subtitle2">
                            Are you sure you want to delete all users permanently?<br/>
                            Once done, you will no longer be able to recover them. <br/>
                            Do you want to continue?
                        </Typography><br/>
                        <Link to={"/security"} style={{marginRight:20, fontSize: 16,}} color="error" >No </Link>
                        <Button type="submit" variant="outlined" size="small" color="error" onClick={handleClick}> Yes</Button>
                    </Item>
                </Grid2>
            </Grid2>
            </>:<Alert severity="warning"><AlertTitle>Warning</AlertTitle>You do not have permission to delete all users!<br/>Please contact the admin.</Alert>}
            </>}
        </>
    )
}

export default DaUsers