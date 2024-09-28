// Insurance upload form with OCR functionality
import React, { useState, useContext } from 'react';
import { uploadInsurance } from '../services/userService';
import { AuthContext } from '../state/authContext';

const UploadInsurance = () => {
  const { authState } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [insuranceData, setInsuranceData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadInsurance(formData, authState.token);
      setInsuranceData(response.data.insurance);
      alert('Insurance uploaded successfully');
    } catch (error) {
      console.error('Upload Insurance Error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Upload Insurance</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {insuranceData && (
        <div>
          <h3>Extracted Insurance Data:</h3>
          <p>Provider Name: {insuranceData.providerName}</p>
          <p>Policy Number: {insuranceData.policyNumber}</p>
          <p>Verification Status: {insuranceData.verificationStatus}</p>
        </div>
      )}
    </div>
  );
};

export default UploadInsurance;