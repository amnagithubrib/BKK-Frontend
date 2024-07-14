import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import AgentsForm from './AgentsForm';
import './agents.css'; 

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agentNumber, setAgentNumber] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPin, setAgentPin] = useState('');
  const [editAgentId, setEditAgentId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://192.168.12.144:3001/getAllAgents', config);
        setAgents(response.data.data);
      } catch (error) {
        setError('Error fetching agents');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://192.168.12.144:3001/deleteAgent/${id}`, config);
      setAgents(agents.filter((agent) => agent.id !== id));
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        number: parseInt(agentNumber, 10),
        name: agentName,
        pin: parseInt(agentPin, 10),
      };
      await axios.put(`http://192.168.12.144:3001/updateAgent/${id}`, data, config);
      const updatedAgents = agents.map((agent) => {
        if (agent.id === id) {
          return { ...agent, number: agentNumber, name: agentName, pin: agentPin };
        }
        return agent;
      });
      setAgents(updatedAgents);
      setEditAgentId(null);
      setAgentNumber('');
      setAgentName('');
      setAgentPin('');
      setShowModal(false);
    } catch (error) {
      console.error('Error editing agent:', error);
    }
  };

  const handleAddAgent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        number: parseInt(agentNumber, 10),
        name: agentName,
        pin: parseInt(agentPin, 10),
      };
      const response = await axios.post('http://192.168.12.144:3001/createAgent', data, config);
      setAgents([...agents, response.data.data]);
      setAgentNumber('');
      setAgentName('');
      setAgentPin('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  const handleStartEdit = (agent) => {
    setEditAgentId(agent.id);
    setAgentNumber(agent.number);
    setAgentName(agent.name);
    setAgentPin(agent.pin);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleCancel = () => {
    setEditAgentId(null);
    setAgentNumber('');
    setAgentName('');
    setAgentPin('');
    setShowModal(false);
    setIsEditMode(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleEdit(editAgentId);
    } else {
      handleAddAgent();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="agents-container">
      <Navbar />
      <Box display="flex" flex={1} className="agents-content">
        <Sidebar />
        <Box flex={1} p={3} pt={20}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Agents List</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setShowModal(true);
                setIsEditMode(false);
              }}
              sx={{
                ml: 'auto',
                bgcolor: '#fcb900',
                '&:hover': {
                  bgcolor: '#fcb900',
                },
              }}
            >
              Add Account
            </Button>
          </Box>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>{agent.number}</TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleStartEdit(agent)}
                        sx={{ color: '#fcb900' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleDelete(agent.id)}
                        sx={{ color: '#88C800' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AgentsForm
            open={showModal}
            onClose={handleCancel}
            onSubmit={handleFormSubmit}
            agentNumber={agentNumber}
            setAgentNumber={setAgentNumber}
            agentName={agentName}
            setAgentName={setAgentName}
            agentPin={agentPin}
            setAgentPin={setAgentPin}
            isEditMode={isEditMode}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Agents;
