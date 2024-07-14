import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import { Box, Typography, CircularProgress, Card, CardContent, Grid } from '@mui/material';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.get('http://192.168.12.144:3001/locations', config);
                setLocations(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching locations');
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    console.log("Component Rendered");

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex">
            <Navbar />
            <Box display="flex" flex={1}>
                <Sidebar />
                <Box flex={1} p={3} pt={14}> 
                    <Typography variant="h4" gutterBottom align="center">Locations List</Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {locations.map(location => (
                            <Grid item xs={12} sm={6} md={4} key={location.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>{location.name}</Typography>
                                        <Typography variant="body1">
                                            <strong>Longitude: </strong>{location.longitude}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Latitude: </strong>{location.latitude}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Locations;
