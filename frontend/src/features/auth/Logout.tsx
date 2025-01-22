import { useNavigate } from "react-router-dom"
import { logout } from "../../api/authApi"
import { Button, Grid2 } from "@mui/material"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import {  mdiHomeAccount, mdiLogout, mdiAccountTie, mdiAccountQuestion } from '@mdi/js';


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



const Logout: React.FC = () => {
    const navigate = useNavigate()

    const handleClick =()=>{
        logout()
        navigate("/home", {replace: true})
    }

    return(
        <>

            <Stack direction="row" spacing={2}>
                <Avatar  sx={{ width: 25, height: 25 }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Avatar sx={{ bgcolor: deepPurple[300], marginTop:"20px" }}>
                    <Icon path={mdiAccountTie} size={1} title={"User"}  />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    User Logout
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
                    <Icon path={mdiLogout} size={1} title={"Logout"} style={{padding:"3px"}}  />
                </Typography>
            </Breadcrumbs>
            <Grid2 container rowSpacing={2} columnSpacing={{ xs: 3, sm: 2, md: 2 }}  >
                <Grid2 size={{ xs: 12,  sm: 12, md: 12 }}>
                    <Item sx={{paddingTop:13, paddingBottom: 15}}>
                        <Icon path={mdiLogout} size={2} title={"Logout"} color={"rgb(206, 55, 55)"} spin /><br/><br/>
                        
                        <Typography variant="subtitle2">
                            Are you sure you want to finish the session 
                            <Icon path={mdiAccountQuestion} size={1} style={{paddingTop:6, marginBottom:-3}} color={"rgb(206, 55, 55)"} />
                        </Typography><br/>
                        <Button type="submit" variant="outlined" size="small" color="secondary" onClick={handleClick}>Yes</Button>
                    </Item>
                </Grid2>
            </Grid2>
        </>
    )
}

export default Logout