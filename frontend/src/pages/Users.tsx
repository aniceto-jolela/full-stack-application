import {useEffect, useState} from "react"
import { fetchDeleteUser, fetchUsers } from "../api/authApi"
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid2 } from "@mui/material";



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';



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
            <h2>Users</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error && (
            <>
                <Link to={'create'}>Add</Link> | 
                <Link to={'eliminated'}>Eliminated</Link>

                <Box sx={{ flexGrow: 1, backgroundColor: "orange" }}>
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
                                                        sx={{ color: 'green', display: 'inline' }}
                                                    >
                                                        {user.is_active && "Active"}
                                                    </Typography>
                                                    {" — "}
                                                    <Link to={`detail/${user.id}/`} style={{color: "#c13fe6"}}> Details</Link> | 
                                                    <Link to={`edit/${user.id}/`} style={{color: "#3fb8e6"}}> Edit</Link> | 
                                                    <Button color="error" onClick={()=>handleDelete(user.id)}>Delete</Button>
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