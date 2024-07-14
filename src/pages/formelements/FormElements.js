import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';

const FormElementForm = () => {
  const [formElements, setFormElements] = useState([
    { elementLabel: '', elementType: 'text', isRequired: false, options: [{ optionText: '', optionValue: '' }] }
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOptionChange = (formIndex, optionIndex, field, value) => {
    const newFormElements = [...formElements];
    newFormElements[formIndex].options[optionIndex][field] = value;
    setFormElements(newFormElements);
  };

  const addOption = (formIndex) => {
    const newFormElements = [...formElements];
    newFormElements[formIndex].options.push({ optionText: '', optionValue: '' });
    setFormElements(newFormElements);
  };

  const removeOption = (formIndex, optionIndex) => {
    const newFormElements = [...formElements];
    newFormElements[formIndex].options.splice(optionIndex, 1);
    setFormElements(newFormElements);
  };

  const addFormElement = () => {
    setFormElements([
      ...formElements,
      { elementLabel: '', elementType: 'text', isRequired: false, options: [{ optionText: '', optionValue: '' }] }
    ]);
  };

  const removeFormElement = (index) => {
    const newFormElements = [...formElements];
    newFormElements.splice(index, 1);
    setFormElements(newFormElements);
  };

  const validateForm = () => {
    const newErrors = {};
    formElements.forEach((formElement, formIndex) => {
      if (!formElement.elementLabel.trim()) {
        newErrors[`elementLabel${formIndex}`] = 'Element label is required';
      }
      if (['checkbox', 'radio', 'dropdown'].includes(formElement.elementType)) {
        formElement.options.forEach((option, optionIndex) => {
          if (!option.optionText.trim()) {
            newErrors[`optionText${formIndex}-${optionIndex}`] = 'Option text is required';
          }
          if (!option.optionValue.trim()) {
            newErrors[`optionValue${formIndex}-${optionIndex}`] = 'Option value is required';
          }
        });
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = formElements.map(({ elementLabel, elementType, isRequired, options }) => ({
        elementLabel,
        elementType,
        isRequired,
        options: options.filter(option => option.optionText.trim() !== '' && option.optionValue.trim() !== '')
      }));

      const response = await axios.post('http://192.168.12.144:3001/form', formData, config);
      console.log('Response:', response.data);

      if (response.data.success) {
        setMessage('Form elements created successfully');
        setFormElements([{ elementLabel: '', elementType: 'text', isRequired: false, options: [{ optionText: '', optionValue: '' }] }]);
        setErrors({});
      } else {
        setMessage('Failed to create form elements: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error creating form elements:', error);
      setMessage('An error occurred while creating the form elements.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: { xs: 5, sm: 7, md: 9, lg: 10 }, pl: { sm: 3, md: 4, lg: 5 } }}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
        <Box
          sx={{
            maxWidth: 500,
            margin: 'auto',
            padding: { xs: 2, sm: 3, md: 4 },
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create New Form Elements
          </Typography>
          <form onSubmit={handleSubmit}>
            {formElements.map((formElement, formIndex) => (
              <Box key={formIndex} sx={{ mb: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label={`Element Label ${formIndex + 1}`}
                      value={formElement.elementLabel}
                      onChange={(e) => {
                        const newFormElements = [...formElements];
                        newFormElements[formIndex].elementLabel = e.target.value;
                        setFormElements(newFormElements);
                      }}
                      fullWidth
                      required
                      error={!!errors[`elementLabel${formIndex}`]}
                      helperText={errors[`elementLabel${formIndex}`]}
                      sx={{ marginBottom: '5px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      value={formElement.elementType}
                      onChange={(e) => {
                        const newFormElements = [...formElements];
                        newFormElements[formIndex].elementType = e.target.value;
                        setFormElements(newFormElements);
                      }}
                      fullWidth
                      sx={{ marginBottom: '5px' }}
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="radio">Radio</MenuItem>
                      <MenuItem value="switch">Switch</MenuItem>
                      <MenuItem value="image">Image</MenuItem>
                      <MenuItem value="audio">Audio</MenuItem>
                      <MenuItem value="video">Video</MenuItem>
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="time">Time</MenuItem>
                      <MenuItem value="dropdown">Dropdown</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formElement.isRequired}
                          onChange={(e) => {
                            const newFormElements = [...formElements];
                            newFormElements[formIndex].isRequired = e.target.checked;
                            setFormElements(newFormElements);
                          }}
                          sx={{ marginRight: '10px' }}
                        />
                      }
                      label="Is Required"
                      sx={{ marginBottom: '5px' }}
                    />
                  </Grid>
                  {['checkbox', 'radio', 'dropdown'].includes(formElement.elementType) && (
                    <Grid item xs={12}>
                      {formElement.options.map((option, optionIndex) => (
                        <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                          <TextField
                            type="text"
                            label={`Option Text ${optionIndex + 1}`}
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(formIndex, optionIndex, 'optionText', e.target.value)}
                            fullWidth
                            required
                            error={!!errors[`optionText${formIndex}-${optionIndex}`]}
                            helperText={errors[`optionText${formIndex}-${optionIndex}`]}
                            sx={{ flex: 1, marginRight: '10px' }}
                          />
                          <TextField
                            type="text"
                            label={`Option Value ${optionIndex + 1}`}
                            value={option.optionValue}
                            onChange={(e) => handleOptionChange(formIndex, optionIndex, 'optionValue', e.target.value)}
                            fullWidth
                            required
                            error={!!errors[`optionValue${formIndex}-${optionIndex}`]}
                            helperText={errors[`optionValue${formIndex}-${optionIndex}`]}
                            sx={{ flex: 1, marginRight: '10px' }}
                          />
                          <Button
                            type="button"
                            onClick={() => removeOption(formIndex, optionIndex)}
                            variant="contained"
                            color="secondary"
                            sx={{ flexShrink: 0 }}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}
                      <Button
                        type="button"
                        onClick={() => addOption(formIndex)}
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: '5px' }}
                      >
                        Add Option
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            ))}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  type="button"
                  onClick={addFormElement}
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: '10px' }}
                >
                  Add Form Element
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ marginTop: '20px', '&:hover': { backgroundColor: '#1976d2' } }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Form Elements'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                {message && (
                  <Typography variant="body1" sx={{ marginTop: '10px' }}>
                    {message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default FormElementForm;


