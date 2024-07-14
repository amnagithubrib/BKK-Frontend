import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import FormElementForm from '../formelements/FormElements';
import FormDataDisplay from '../formelements/FormDataDisplay';

const FormManager = () => {
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState(1);

  const addFormElement = (formData) => {
    setForms([...forms, { ...formData, id: formId }]);
    setFormId(formId + 1);
  };

  return (
    <Box sx={{ pt: { xs: 5, sm: 7, md: 9, lg: 10 }, pl: { sm: 3, md: 4, lg: 5 } }}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
        <Typography variant="h4" gutterBottom>
          Manage Forms
        </Typography>
        <FormElementForm onSubmit={addFormElement} />
        {forms.length > 0 && (
          <Box sx={{ mt: 5 }}>
            {forms.map((form) => (
              <FormDataDisplay key={form.id} formData={form} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FormManager;
