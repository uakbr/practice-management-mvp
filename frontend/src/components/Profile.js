import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../state/authContext';
import { UserContext } from '../state/userContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { TextField, Button, Typography } from '@material-ui/core';

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(authState.token);
        setUserProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Get Profile Error:', error);
        // Handle error (e.g., show notification)
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(formData, authState.token);
      setUserProfile(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update Profile Error:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">User Profile</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update Profile
      </Button>
    </form>
  );
};

export default Profile;