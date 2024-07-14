import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faMapMarkerAlt, faLocationArrow, faHandshake, faPlusCircle, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = () => {
    const location = useLocation();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAdmin, isPartner } = useAuth();

    if (location.pathname === "/") {
        return null;
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getMenuItems = () => {
        if (isAdmin()) {
            return adminMenuItems;
        } else if (isPartner()) {
            return partnerMenuItems;
        } else {
            return []; 
        }
    };

    const drawerContent = (
        <List sx={{ paddingTop: 18 }}>
            {getMenuItems().map((item, index) => (
                <ListItem
                    button
                    component={Link}
                    to={item.path}
                    key={index}
                    selected={location.pathname === item.path}
                    sx={{
                        pl: 3,
                        mb: 2,
                        '&.Mui-selected': {
                            backgroundColor: '#88C800',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: '#76B400',
                        },
                        '&:hover': {
                            backgroundColor: '#88C800',
                        },
                    }}
                    onClick={() => isSmallScreen && setMobileOpen(false)}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                        <FontAwesomeIcon icon={item.icon} style={{ color: '#fff', fontSize: '20px' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.text}
                        sx={{
                            color: '#fff',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            '& .MuiTypography-root': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            {isSmallScreen && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, ml: 1, mt: 1, color: 'white', position: 'fixed', zIndex: 1300 }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </IconButton>
            )}
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                open={isSmallScreen ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box', backgroundColor: '#568203' },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

const adminMenuItems = [
    { text: 'HOME', icon: faHome, path: '/create-partners' },
    { text: 'PARTNERS', icon: faHandshake, path: '/partners' },
];

const partnerMenuItems = [
    { text: 'HOME', icon: faHome, path: '/dashboard' },
    { text: 'USERS', icon: faUsers, path: '/users' },
    { text: 'ZONE', icon: faMapMarkerAlt, path: '/zones' },
    { text: 'LOCATION', icon: faLocationArrow, path: '/location' },
    { text: 'AGENTS', icon: faHandshake, path: '/agents' },
    // { text: 'CREATE ZONE', icon: faPlusCircle, path: '/create-zone' },
    { text: 'CREATE FORM', icon: faFileAlt, path: '/form' },
];

export default Sidebar;
