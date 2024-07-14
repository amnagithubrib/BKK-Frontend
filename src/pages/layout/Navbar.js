import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.webp';
const LogoImage = styled('img')(({ theme }) => ({
  height: '70px',
  marginRight: theme.spacing(2),
  objectFit: 'contain',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    height: '50px',
    marginRight: 0, 
  },
}));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('partner');
    navigate('/');
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#568203' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, flexGrow: 1 }}>
          <LogoImage src={logo} alt="Logo" />
          <Typography variant="h5" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <b>Dashboard</b>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, justifyContent: { xs: 'flex-end', sm: 'flex-end' }, alignItems: 'center' }}>
          <IconButton size="large" sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton size="large" edge="end" sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}>
            <AccountCircleIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: '#fcb900',
              color: '#fcb900',
              marginLeft: 2,
              '&:hover': {
                backgroundColor: '#fcb900',
                color: 'black',
              },
            }}
            onClick={handleLogout}
          >
            <b>Logout</b>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

