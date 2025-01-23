import { Link } from "react-router-dom";
import {Fragment, useEffect, useState} from "react"
import { styled } from '@mui/material/styles';
import { fetchProfile, fetchRecoverUser, fetchUsers } from "../api/authApi"
import { Alert, AlertTitle, Button, Grid2 } from "@mui/material";
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiHomeAccount, mdiAccountMultiple, mdiAccountTie, mdiAccountCircle, mdiAccountCancel, mdiAccountQuestionOutline } from '@mdi/js';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { UserIsActive, UserProps } from "../types/types";



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
    const [users, setUsers] = useState<UserIsActive[]>([])
    const [error, setError] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [userDialog, setUserDaialog] = useState<UserIsActive>()
    const [userData] = useState({
       confirm: "recover",
       is_active: true,
    })
    const [status, setStatus] = useState<UserProps>()
      
    useEffect(()=>{
        const getUser = async () => {
            try{
                const data = await fetchUsers()
                setUsers(data)
            }catch(error){
                setError("Failed to fetch users. Please try again.");
            }
        }
        getUser()
    }, [users])

    const handleRecoverUser = async (id: number | undefined) =>{
        try {
            if(id){
                await fetchRecoverUser(id, userData)
                setOpen(false);
                enqueueSnackbar('User recovered.', { variant: 'info' });
            }
        } catch (error: any) {
            enqueueSnackbar(`${error?.response?.data?.error}`, { variant: 'error' });
        }
    }
    const handleOpen = (id: number | undefined, username: string | undefined) => {
        setUserDaialog({id: id, username: username})
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchProfile()
                setStatus(data)
            }catch(error){
                setError("Failed to load profile. Please try again.")
            }
        }
        getMessage()
    }, [])
    

    return (
    <>
        {error && <Alert severity="warning"><AlertTitle>Warning</AlertTitle>{error}</Alert>}
        
        {!error && (
        <>{status?.is_superuser ? <>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ bgcolor: deepPurple[100]}}>
                    <Icon path={mdiAccountQuestionOutline} size={1} style={{marginBottom:-4}} />{" Recover user"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to recover this user?
                        <Typography sx={{color: "purple"}} component={"span"}>
                            <br/>({userDialog?.username})!
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" color="inherit" onClick={handleClose}>No</Button>
                    <Button variant="outlined" size="small" color="secondary" onClick={()=>handleRecoverUser(userDialog?.id)} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
            <Item>
                <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 8 }} >
                    <Grid2  size={12} >
                        <List >
                            {users.length > 0?(
                                users.map((user)=>(
                                <Fragment key={user.id}>
                                    {!user.is_active?(<>
                                    <ListItem alignItems="flex-start">
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
                                            <Button color="warning" onClick={()=>handleOpen(user.id, user.username)} sx={{textTransform: "capitalize"}}>Recover</Button>
                                        </>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    </>):null}
                                </Fragment>))
                            ):(
                                <Alert severity="info"><AlertTitle>Info</AlertTitle>Not found.</Alert>
                            )}
                        </List>
                    </Grid2>
                </Grid2>
            </Item>
            </>: <Alert severity="warning"><AlertTitle>Warning</AlertTitle>You are not allowed to view the user information.</Alert>}
        </>)}
    </>)
}

export default Eliminated