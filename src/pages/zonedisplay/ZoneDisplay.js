import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CreateZoneForm from '../createzone/CreateZoneForm';

const ZoneDisplay = () => {
  const [zones, setZones] = useState([]);
  const [newPolygons, setNewPolygons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partnerName, setPartnerName] = useState('');
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const partnerData = localStorage.getItem('partner');
    if (partnerData) {
      const partner = JSON.parse(partnerData);
      console.log(partner.name);
      setPartnerName(partner.name);
    }

    const fetchZones = async () => {
      setIsLoading(true);
      setError(null);
        
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
        const response = await axios.get('http://192.168.12.144:3001/zones', config);
        setZones(response.data);
      } catch (error) {
        console.error('Error fetching zones:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const storedPolygons = localStorage.getItem('newPolygons');
    if (storedPolygons) {
      setNewPolygons(JSON.parse(storedPolygons));
    }

    fetchZones();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePolygonCreated = (geoJson) => {
    const updatedPolygons = [...newPolygons, geoJson];
    setNewPolygons(updatedPolygons);
    localStorage.setItem('newPolygons', JSON.stringify(updatedPolygons));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h6">Error fetching zones:</Typography>
        {error.message && <Typography variant="body1">{error.message}</Typography>}
      </Box>
    );
  }

  const formatCoordinates = (coordinates) => {
    return coordinates[0].map(coord => `[${coord[0]}, ${coord[1]}]`).join(', ');
  };

  return (
    <Box display="flex" flexDirection="column" width="80vw">
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box flex={1} p={3} pt={10} overflow="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} pt={3}>
          <Typography variant="h4">Zones</Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ bgcolor: '#fcb900', '&:hover': { bgcolor: '#fcb900' } }}>
            Create Zone
          </Button>
        </Box>
        <TableContainer component={Paper} style={{ height: isMediumScreen ? 'auto' : 'calc(100vh - 150px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Partner Name</TableCell>
                <TableCell>Locations</TableCell>
                <TableCell>Coordinates</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell>{zone.name}</TableCell>
                  <TableCell>{zone.partner ? zone.partner.name : partnerName}</TableCell>
                  <TableCell>
                    {zone.locations
                      ? zone.locations.map((location) => location.name).join(', ')
                      : 'N/A'}
                  </TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              ))}
              {newPolygons.map((polygon, index) => (
                <TableRow key={index}>
                  <TableCell>New Polygon {index + 1}</TableCell>
                  <TableCell>{partnerName}</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>{formatCoordinates(polygon.geometry.coordinates)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CreateZoneForm open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} onPolygonCreated={handlePolygonCreated} />
    </Box>
  );
};

export default ZoneDisplay;
