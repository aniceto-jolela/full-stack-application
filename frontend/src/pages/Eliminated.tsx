import {useEffect, useState} from "react"
import { fetchRecoverUser, fetchUsers } from "../api/authApi"

import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid2 } from "@mui/material";
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiHomeAccount, mdiAccountMultiple, mdiAccountTie, mdiAccountCircle, mdiAccountCancel, mdiAccountEditOutline, mdiInformationVariantBoxOutline } from '@mdi/js';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import Breadcrumbs from '@mui/material/Breadcrumbs';

type User = {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
  

const Eliminated = () => {
  const [users, setUsers] = useState<User[]>([])
       const [error, setError] = useState<string | null>(null)
       const [userData] = useState({
       confirm: "recover",
       is_active: true,
    })
      
    useEffect(()=>{
        const getUser = async () => {
            try{
                const data = await fetchUsers()
                setUsers(data)
            }catch(error){
                console.error(error)
                setError("Failed to fetch users. Please try again.");
            }
        }
        getUser()
    }, [users])

    const handleRecoverUser = async (id: number | undefined) =>{
        try {
            const confirm = window.confirm("Are you sure you want to recover this user?")
            if(confirm){
                const data = await fetchRecoverUser(id, userData)
                console.log("User recover:", data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
    <>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && (
        <>
            <Stack direction="row" spacing={2}>
            <Avatar  sx={{ width: 25, height: 25 }}>
                <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
            </Avatar>
            <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                <Icon path={mdiAccountTie} size={1} title={"Super user"}  />
            </Avatar>
            <Typography variant="h6" gutterBottom>
                Eliminated 
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
                    <Icon path={mdiAccountCancel} size={1} title={"Account-cancel"} style={{padding:"3px"}} spin />
                </Typography>
            </Breadcrumbs>
            <Box sx={{ flexGrow: 1, }}>
                <Item>
                    <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 8 }} >
                        <Grid2  size={12} >
                            <List >
                                {users.length > 0?(
                                    users.map((user)=>(
                                    <>
                                        {!user.is_active?(<>
                                        <ListItem alignItems="flex-start" key={user.id}>
                                            <ListItemAvatar>
                                                <Avatar alt="User">
                                                    <Icon path={mdiAccountCircle} size={2} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary={user.username}
                                            secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'inherit', display: 'inline' }}
                                                >
                                                    {user.id}
                                                </Typography>
                                                {" — "}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'inherit', display: 'inline' }}
                                                >
                                                     {user.is_active ? "Active": "Inative"} | 
                                                </Typography>
                                                <Button color="warning" onClick={()=>handleRecoverUser(user.id)} sx={{textTransform: "capitalize"}}>Recover</Button>
                                               
                                            </>
                                            }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        </>):null}
                                    </>))
                                ):(
                                    <p>Not found.</p>
                                )}
                            </List>
                        </Grid2>
                    </Grid2>
                </Item>
            </Box>
        </>)}
    </>)
}

export default Eliminated