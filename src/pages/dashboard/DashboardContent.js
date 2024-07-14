import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import user1 from '../../assets/img/user1.png';
import locations from '../../assets/img/locations.png';
import partner from '../../assets/img/partner.png';
import zone from '../../assets/img/zone.webp';
import img1 from '../../assets/img/img1.jpg'; 

const DashboardContent = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    const cards = [
        { title: 'Users', img: user1, path: '/users' },
        { title: 'Locations', img: locations, path: '/location' },
        { title: 'Agents', img: partner, path: '/agents' },
        { title: 'Zones', img: zone, path: '/zones' },
    ];

    return (
        <Box
            sx={{
                ml: { xs: 0, sm: '50px' },
                position: 'relative',
                backgroundColor: 'white',
                minHeight: '100vh',
                pt: { xs: '90px', md: '100px' },
                pb: 4,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflowY: 'auto',
                backgroundImage: `url(${img1})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', 
                pl: { xs: 2, md: 10 }, 
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    px: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    <b>Welcome to the Dashboard</b>
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {cards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 2,
                                    boxShadow: 6,
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    transition: 'transform 0.4s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 10,
                                    },
                                }}
                                onClick={() => handleCardClick(card.path)}
                            >
                                <Avatar
                                    src={card.img}
                                    alt={card.title}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mb: 2,
                                        objectFit: 'contain', 
                                        backgroundColor: 'transparent', 
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                        {card.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default DashboardContent;
