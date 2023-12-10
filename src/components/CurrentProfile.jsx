import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, ListItemIcon, Container, Box, CssBaseline } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { api } from "../App";

const CurrentProfile = () => {
  const navigateTo = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
        const response = await axios.get(`${api}/api/users/me`);

        // Check if the response status is OK (200)
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { firstName, lastName, email, title } = response.data.result;

        // Set profile data from the response
        setProfileData({ firstName, lastName, email, title });
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = () => {
    // Navigate to the '/UpdateProfile' route
    navigateTo('/updateProfile');
  };

  if (error) {
    // Render an error message if there was an issue fetching the data
    return (
      <div>
        <Typography variant="h4">Error</Typography>
        <Typography variant="body1">{error}</Typography>
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: "#F6C927"
        }}
      >
        <Typography variant="h4">My Profile</Typography>
        <Typography variant="body1">First Name: {profileData.firstName}</Typography>
        <Typography variant="body1">Last Name: {profileData.lastName}</Typography>
        <Typography variant="body1">Email: {profileData.email}</Typography>
        <Typography variant="body1">Title: {profileData.title}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          sx={{ mt: 3, mb: 2 }}
        >
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
};

export default CurrentProfile;
