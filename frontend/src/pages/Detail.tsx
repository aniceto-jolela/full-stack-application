import {useEffect, useState} from "react"
import { fetchDetail } from "../api/authApi"
import { useParams } from "react-router-dom"
import { Grid2 } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCardAccountDetails, mdiHomeAccount, mdiAccountMultiple, mdiAccountTie, mdiCardAccountDetailsOutline } from '@mdi/js';


type UserProps={
    username: string,
    email: string,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean, 
}
type RouteParams = {
    id: string
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



const Detail = () => {
    const [user, setUser] = useState<UserProps>();
    const [error, setError] = useState("");
    const {id} = useParams<RouteParams>();

    useEffect(()=>{
        const getUser = async () => {
            try{
                const data = await fetchDetail(id)
                setUser(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
                console.error(error)
            }
        }
        getUser()
    }, [])

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Avatar  sx={{ width: 25, height: 25 }}>
                    <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
                </Avatar>
                <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                    <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    Detail
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
                    <Icon path={mdiCardAccountDetails} size={1} title={"Detail"} style={{padding:"3px"}} spin />
                </Typography>
            </Breadcrumbs>
                <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
                    <Grid2 size={{ xs: 12,  sm: 6, md: 5 }}>
                        <Item>
                            <Avatar sx={{ bgcolor: deepPurple[200], width: 170, height:200, }} variant="rounded"  >
                                <Icon path={mdiCardAccountDetailsOutline} size={3} />
                            </Avatar>  
                        </Item>
                    </Grid2>
                    <Grid2  size={{ xs: 12,  sm: 6, md: 7 }} >
                        <Item >
                            <Typography  variant="subtitle1" gutterBottom>
                                User : {user?.username}
                            </Typography>
                            <Typography  variant="subtitle1" gutterBottom>
                                Email : {user?.email}
                            </Typography>
                            <Typography  variant="subtitle1" gutterBottom color="error">
                                | Role |
                            </Typography>
                            <Typography  variant="subtitle1" gutterBottom>
                                Is_Active : <span style={{color: user?.is_active?"green": ""}}>{user?.is_active ? "Active": "Inactive"}</span> 
                            </Typography>
                            <Typography  variant="subtitle1" gutterBottom>
                                Is_Staff : <span style={{color: user?.is_staff?"green": ""}}>{user?.is_staff ? "User": "Non-user"}</span>
                            </Typography>
                            <Typography  variant="subtitle1" gutterBottom>
                                Is_SuperUser : <span style={{color: user?.is_superuser?"green": ""}}>{user?.is_superuser ? "Admin": "Non-admin"}</span>
                            </Typography>
                        </Item>
                    </Grid2>
                </Grid2>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    )
}

export default Detail