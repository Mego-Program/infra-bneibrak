import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  ListItemIcon,
  Container,
  Box,
  CssBaseline,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { v4 as uuidv4 } from "uuid";
import { cl } from "../App";

const CurrentProfile = () => {
  const navigateTo = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileInputVisible, setFileInputVisible] = useState(false);

  const imageUrl = uploadedImageUrl || ""; // Use an empty string if uploadedImageUrl is null

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/megobb/image/upload?upload_preset=fu3u8uef&public_id=${uuidv4()}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      console.log(cloudinaryData);

      const imageUrl = cl.url(cloudinaryData.public_id, { secure: true });

      const image = {
        profilePicture: imageUrl,
      };

      // Make a PUT request to update the server with the imageUrl using axios
      await axios.put("http://localhost:5000/api/users/profileUpdate", image);
      console.log("Server updated with imageUrl:", image);
      setUploadedImageUrl(imageUrl);
      setFileInputVisible(false); // Hide the file input after uploading
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddPhotoClick = () => {
    setFileInputVisible(true); // Show the file input when AddPhoto is clicked
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me");

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { firstName, lastName, email, title } = response.data.result[0];
        let profilePicture = null;

        // Check if profilePicture exists
        if (response.data.result[0].profilePicture) {
          // If it exists, set uploadedImageUrl
          profilePicture = response.data.result[0].profilePicture;
          setUploadedImageUrl(profilePicture);
        }

        setProfileData({ firstName, lastName, email, title, profilePicture });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again later.");
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = () => {
    navigateTo("/updateProfile");
  };

  const getInitials = () => {
    const firstInitial =
      profileData.firstName && profileData.firstName.length > 0
        ? profileData.firstName[0]
        : "U";
    return firstInitial.toUpperCase();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#F6C927",
        }}
      >
        <Badge
          badgeContent={
            <IconButton onClick={handleAddPhotoClick}>
              <AddPhotoAlternateOutlinedIcon style={{ color: "#fff" }} />
            </IconButton>
          }
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Avatar
            alt={profileData.firstName ? profileData.firstName[0] : "U"}
            style={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #F6C927",
              fontSize: "4rem",
              overflow: "hidden", // Added line
              position: "relative", // Added line
            }}
          >
            {profileData.profilePicture ? (
              <img
                src={profileData.profilePicture}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              getInitials()
            )}
          </Avatar>
        </Badge>
        {isFileInputVisible && (
          <>
            <input type="file" onChange={handleFileUpload} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Image
            </Button>
          </>
        )}
        <Typography variant="h4">My Profile</Typography>
        <Typography variant="body1">
          First Name: {profileData.firstName}
        </Typography>
        <Typography variant="body1">
          Last Name: {profileData.lastName}
        </Typography>
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
