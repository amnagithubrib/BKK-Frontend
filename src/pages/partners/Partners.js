// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../layout/Navbar';
// import Sidebar from '../layout/Sidebar';
// import { Box, Typography, CircularProgress, Card, CardContent, Grid } from '@mui/material';

// const PartnersList = () => {
//     const [partners, setPartners] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPartners = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('Token not found');
//                 }

//                 const config = {
//                     headers: { Authorization: `Bearer ${token}` }
//                 };
//                 const response = await axios.get('http://localhost:3001/partners', config);
//                 setPartners(response.data.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError('Error fetching partners');
//                 setLoading(false);
//             }
//         };

//         fetchPartners();
//     }, []);

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//                 <Typography variant="h6" color="error">{error}</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box display="flex">
//             <Navbar />
//             <Box display="flex" flex={1}>
//                 <Sidebar />
//                 <Box flex={1} p={3} pt={14}>
//                     <Typography variant="h4" gutterBottom align="center">Partners List</Typography>
//                     <Grid container spacing={3} justifyContent="center">
//                         {partners.map(partner => (
//                             <Grid item xs={12} sm={6} md={4} key={partner.id}>
//                                 <Card
//                                     sx={{
//                                         minWidth: 275,
//                                         maxWidth: 400,
//                                         width: '100%',
//                                         height: '100%', // Ensure each card has equal height
//                                         display: 'flex',
//                                         paddingRight:'70px',
//                                         flexDirection: 'column',
//                                         justifyContent: 'space-between'
//                                     }}
//                                 >
//                                     <CardContent>
//                                         <Typography variant="h5" gutterBottom>{partner.name}</Typography>
//                                         <Typography variant="body1">
//                                             <strong>Email: </strong>{partner.email}
//                                         </Typography>
//                                         <Typography variant="body1">
//                                             <strong>Password: </strong>{partner.password}
//                                         </Typography>
//                                         <Typography variant="body1">
//                                             <strong>Address: </strong>{partner.address}
//                                         </Typography>
//                                     </CardContent>
//                                     {/* You can add additional content or actions here */}
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default PartnersList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import { Box, Typography, CircularProgress, Card, CardContent, Grid } from '@mui/material';

const PartnersList = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:3001/partners', config);
                setPartners(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching partners');
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

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
                    <Typography variant="h4" gutterBottom align="center">Partners List</Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {partners.map(partner => (
                            <Grid item xs={12} sm={9} md={4} key={partner.id}>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        maxWidth: 400,
                                        width: '100%',
                                        height: '100%', // Ensure each card has equal height
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        marginBottom: 3, // Add margin bottom for spacing between cards
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>{partner.name}</Typography>
                                        <Typography variant="body1">
                                            <strong>Email: </strong>{partner.email}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Password: </strong>{partner.password}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Address: </strong>{partner.address}
                                        </Typography>
                                    </CardContent>
                                    {/* You can add additional content or actions here */}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default PartnersList;
