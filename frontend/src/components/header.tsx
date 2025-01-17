import { Link, Outlet } from "react-router-dom"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const Header = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
      };

      const DrawerList = (
        <Box sx={{ width: 200,}} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['Home', 'About', 'Profile', 'Users' ,'Security', 'Login', 'Logout'].map((text, index) => {
              const isActive = location.pathname.toLowerCase() === `/${text.toLowerCase()}`
              return(
              <ListItem key={text} disablePadding>
                <ListItemButton 
                sx={{
                  backgroundColor: isActive? 
                  'hsl(210, 100%, 96%)': 'inherit', 
                  '&:hover':{backgroundColor: 'lightgray'},
                  paddingLeft: isActive? 4: 'auto',
                  marginRight: -2,
                  marginLeft: -2,
                  }}>
                 <Link 
                    to={`/${text.toLowerCase()}`}
                    style={{
                      textDecoration: 'none',
                      paddingLeft: 20,
                      paddingTop: 15,
                      marginTop: -15,
                      width: '100%',
                      
                      color: isActive ? 'hsl(210, 100%, 42%)' : 'black',
                    }}
                    >{text}</Link>
                </ListItemButton>
              </ListItem>
            )})}
          </List>
          <Divider />
        </Box>
      );
    
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Toolbar sx={{ 
              backgroundColor: 'whitesmoke',
              opacity: '0.9', 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              }} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}
                    edge="start"
                    sx={[{mr: 2,},open && { display: 'none' },]}
                    >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer open={open} onClose={toggleDrawer(false)} >
                {DrawerList}
            </Drawer>
            <Container   sx={{
              flex: 1,
                
                marginTop: (theme) => `calc(${theme.spacing(8)} + 16px)`,
                padding: 2,
              }}>
              <Outlet />
            </Container>
        </Box>
      );

}

export default Header