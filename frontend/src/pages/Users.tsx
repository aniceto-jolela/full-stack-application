import {useEffect, useState} from "react"
import { fetchDeleteUser, fetchUsers } from "../api/authApi"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Grid2 } from "@mui/material";
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
import { mdiHomeAccount, mdiAccountMultiple, mdiAccountTie, mdiAccountCircle, mdiDeleteAlertOutline, mdiAccountEditOutline, mdiInformationVariantBoxOutline } from '@mdi/js';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import Breadcrumbs from '@mui/material/Breadcrumbs';



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


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
  
  //===================================================================

type UserProps = {
    confirm?: string;
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean; 
};

const Users = () => {
     const [users, setUsers] = useState<UserProps[]>([])
     const [error, setError] = useState<string | null>(null)
     const [userData] = useState({
             confirm: "delete",
             is_active: false,
             is_staff: false,
             is_superuser: false
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

     const handleDelete = async(id: number | undefined)=>{
        try {
            const confirm = window.confirm("Are you sure you want to delete this user?");
            if(confirm){
                const data = await fetchDeleteUser(id, userData)
                console.log("User deleted:", data);
            }
            
        } catch (error) {
            console.error("Error deleting user:", error);
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
                        Users 
                    </Typography>
                </Stack><br/><br/>
                <Link to={'create'}>Add </Link> | 
                <Link to={'eliminated'}> Eliminated</Link>
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
                        <Icon path={mdiAccountMultiple} size={1} title={"Users"} style={{padding:"3px"}} spin />
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
                                            {user.is_active?(<>
                                            <ListItem alignItems="flex-start" key={user.id}>
                                                <ListItemAvatar>
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    variant="dot"
                                                >
                                                    <Avatar alt="User">
                                                        <Icon path={mdiAccountCircle} size={2} />
                                                    </Avatar>
                                                </StyledBadge>
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={user.username}
                                                secondary={
                                                <><Box sx={{textAlign:"right"}}>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ color: 'green', display: 'inline' }}
                                                    >
                                                        {user.id}
                                                    </Typography>
                                                    {" — "}
                                                    <Link to={`detail/${user.id}/`} style={{color: "#c13fe6", }} > 
                                                        <Icon path={mdiInformationVariantBoxOutline} title={"Detail"} size={1} style={{marginBottom:-5}} /> | 
                                                    </Link> 
                                                    <Link to={`edit/${user.id}/`} style={{color: "#3fb8e6",}} > 
                                                        | <Icon path={mdiAccountEditOutline} title={"Edit"} size={1} style={{marginBottom:-5}} /> |
                                                    </Link>  
                                                    <IconButton color="error" aria-label="delete" onClick={()=>handleDelete(user.id)} >
                                                        <Icon path={mdiDeleteAlertOutline} title={"Delete"} size={1} style={{marginTop:-5}} />
                                                    </IconButton>
                                                    </Box>
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
        </>
    )
}

export default Users