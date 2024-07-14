import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import Sidebar from '../layout/Sidebar';

const CreatePartnersPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePartner = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('http://192.168.12.144:3001/CreatePartners', formData, config);

      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Partner created successfully!' });
        setFormData({ name: '', email: '', password: '', address: '' });
      } else {
        setAlert({ type: 'error', message: response.data.message || 'Failed to create partner.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred while creating the partner.' });
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: 4, m: 10 }}>
          <Typography variant="h4" gutterBottom>
            Create Partner
          </Typography>
          {alert.message && (
            <Alert severity={alert.type} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleCreatePartner}>
            <TextField
              name="name"
              label="Partner Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatePartnersPage;
