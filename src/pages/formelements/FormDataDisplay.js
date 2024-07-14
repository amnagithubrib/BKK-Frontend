import React from 'react';
const FormDataDisplay = ({ formData }) => {
  return (
    <div className="form-data-display">
      <h3>Form ID: {formData.elementId}</h3>
      <h3>Label: {formData.elementLabel}</h3>
      <h3>Type: {formData.elementType}</h3>
      <h4>Option Elements:</h4>
      <ul>
        {formData.options.map((option, index) => (
          <li key={index}>
            <strong>Option Text:</strong> {option.optionText}, <strong>Option Value:</strong> {option.optionValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDataDisplay;
