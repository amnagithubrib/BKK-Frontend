import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AgentModalForm = ({
  open,
  onClose,
  onSubmit,
  agentNumber,
  setAgentNumber,
  agentPin,
  setAgentPin,
  agentName,
  setAgentName,
  isEditMode,
}) => {
  const validateNumber = (value) => /^\d{11}$/.test(value);
  const validateFields = () => {
    return (
      validateNumber(agentNumber) &&
      agentName.trim().length > 0 &&
      !isNaN(agentPin) &&
      parseInt(agentPin, 10) > 0
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? 'Edit Agent' : 'Add Agent'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Agent Number"
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 99999999999 },
            style: { appearance: 'textfield' },
            disableUnderline: true,
          }}
          error={!validateNumber(agentNumber)}
          helperText={!validateNumber(agentNumber) ? 'Agent number must be 11 digits' : ''}
        />
        <TextField
          label="Agent Pin"
          value={agentPin}
          onChange={(e) => setAgentPin(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            style: { appearance: 'textfield' },
            disableUnderline: true,
          }}
          error={isNaN(agentPin) || parseInt(agentPin, 10) <= 0}
          helperText={isNaN(agentPin) || parseInt(agentPin, 10) <= 0 ? 'Agent pin must be a positive number' : ''}
        />
        <TextField
          label="Agent Name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            disableUnderline: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={!validateFields()}>
          {isEditMode ? 'Save Changes' : 'Add Agent'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentModalForm;
