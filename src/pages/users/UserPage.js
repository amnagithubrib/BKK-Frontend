import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import Input from '../../components/input';
import Container from '../../components/Container';
import {
  Typography,
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Switch,
  Select,
  MenuItem,
} from '@mui/material';
import './UserPage.css';

const UserPage = () => {
  const [formElements, setFormElements] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const navigate = useNavigate();

  const fetchFormElements = async () => {
    try {
      const response = await axios.get('http://localhost:3001/allforms');
      setFormElements(response.data.data);
    } catch (error) {
      console.error('Error fetching form elements:', error);
    }
  };

  useEffect(() => {
    fetchFormElements();
  }, []);

  const handleChange = (elementId, value) => {
    setFieldValues((prevState) => ({
      ...prevState,
      [elementId]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1, paddingTop: '88px' }}>
        <Sidebar />
        <Container>
          <Typography variant="h4" gutterBottom>
            User Page
          </Typography>
          <Grid container spacing={2} className="elements-container">
            {formElements && formElements.length > 0 ? (
              formElements.map((element) => (
                <Grid item xs={12} key={element.id}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Element ID: {element.elementId}
                    </Typography>
                    <Box className="field-row">
                      <Typography variant="subtitle1">
                        {element.elementLabel}
                      </Typography>
                      {element.elementType === 'checkbox' ? (
                        <Box className="options-container">
                          {element.options.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  checked={
                                    fieldValues[element.elementId] ===
                                    option.optionText
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      element.elementId,
                                      e.target.checked
                                        ? option.optionText
                                        : ''
                                    )
                                  }
                                />
                              }
                              label={option.optionText}
                            />
                          ))}
                        </Box>
                      ) : element.elementType === 'radio' ? (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            {element.elementLabel}
                          </FormLabel>
                          <RadioGroup
                            value={fieldValues[element.elementId] || ''}
                            onChange={(e) =>
                              handleChange(element.elementId, e.target.value)
                            }
                          >
                            {element.options.map((option, index) => (
                              <FormControlLabel
                                key={index}
                                value={option.optionText}
                                control={<Radio />}
                                label={option.optionText}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      ) : element.elementType === 'switch' ? (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={fieldValues[element.elementId] || false}
                              onChange={(e) =>
                                handleChange(
                                  element.elementId,
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label={element.elementLabel}
                        />
                      ) : element.elementType === 'dropdown' ? (
                        <FormControl fullWidth>
                          <Select
                            value={fieldValues[element.elementId] || ''}
                            onChange={(e) =>
                              handleChange(element.elementId, e.target.value)
                            }
                          >
                            {element.options.map((option, index) => (
                              <MenuItem key={index} value={option.optionText}>
                                {option.optionText}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Input
                          type="text"
                          id={`${element.elementId}-label`}
                          value={fieldValues[element.elementId] || ''}
                          onChange={(e) =>
                            handleChange(element.elementId, e.target.value)
                          }
                          className="input-field"
                        />
                      )}
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">
                No form elements available.
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPage;
