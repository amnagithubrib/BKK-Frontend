import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Map from './Map'; 
import './CreateZoneForm.css'; 

const CreateZoneForm = ({ open, handleClickOpen, handleClose, onPolygonCreated }) => {
  const [zoneTitle, setZoneTitle] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [geoLocationData, setGeoLocationData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const locationIds = selectedLocations.map(location => location.id);
      console.log('Selected Location IDs:', locationIds);
     
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          throw new Error('Token not found');
        }
  
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
      const response = await axios.post('http://192.168.12.144:3001/zoness', {
        name: zoneTitle,
        type: "shape",  
        geoLocationData, 
        partnerId: 1,
        locationIds
      },config);

      if (response.status === 201) {
        alert('Zone created successfully!');
        handleClose();
      } else {
        alert('Failed to create zone!');
      }
    } catch (error) {
      console.error('Error creating zone:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Failed to create zone: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        alert('Failed to create zone: No response from server.');
      } else {
        console.error('Error message:', error.message);
        alert(`Failed to create zone: ${error.message}`);
      }
    }
  };

  const locations = [
    { id: 1, label: 'Location 1' },
    { id: 2, label: 'Location 2' },
    { id: 3, label: 'Location 3' }
  ];

  const handlePolygonCreated = (geoJson) => {
    setGeoLocationData(geoJson);
    onPolygonCreated(geoJson);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Zone</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Zone Title"
              variant="outlined"
              value={zoneTitle}
              onChange={(e) => setZoneTitle(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Select
              isMulti
              options={locations}
              onChange={setSelectedLocations}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              value={selectedLocations}
              placeholder="Select locations"
            />
          </Box>
          <Box mb={2} style={{ paddingTop: '100px' }}> 
            <Map onPolygonCreated={handlePolygonCreated} />
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create Zone
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateZoneForm;
