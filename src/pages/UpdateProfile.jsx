import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { api } from "../App";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import {useLocation} from 'react-router-dom';


const UpdateProfile = () => {
  const navigateTo = useNavigate();
  const allowedTitles = [
    "developer",
    "project manager",
    "product manager",
    "designer",
    "Other",
  ];

  const location = useLocation();
  

  // State variables for form fields
  const [reload, setReload] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordModified, setIsPasswordModified] = useState(false);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${api}/api/users/me`);

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { firstName, lastName, email, title } = response.data.result[0];

        // Set the form fields with the existing user data
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setTitle(title);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error appropriately, e.g., display an error message
      }
    };
    fetchUserData();
  }, []); 

  const handleSoftDelete = async () => {
    try {
      // Send a delete request to soft delete the user profile
      await axios.put(`${api}/api/users/deleteProfile`);
      // Set isDeleted to true to prevent further data fetching
      localStorage.removeItem("authToken");
      navigateTo("/");
      // Optional: You may want to redirect or show a confirmation message
      console.log("User profile soft deleted");
    } catch (error) {
      console.error("Error soft deleting user profile:", error);
      // Handle the error appropriately, e.g., display an error message
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      // Validate email format
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        setErrors("Invalid email format");
        setSuccess("");
        return;
      }

      // Validate password length
      if (password.length < 8 && password !== "") {
        setErrors("Password must be at least 8 characters long");
        setSuccess("");
        return;
      }

      // Check if the passwords match
      if (password !== confirmPassword) {
        setErrors("The passwords don't match");
        setSuccess("");
        return;
      }

      // Prepare the data to be sent in the put request
      const data = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(title && { title }),
        ...(isPasswordModified && password !== "" && { password }),
      };

      // Send a put request to update the user profile
      const responsePut = await axios.put(
        `${api}/api/users/profileUpdate`,
        data
      );
      setSuccess(responsePut.data.message);
      console.log(responsePut);

      // Navigate based on changes
      if (isPasswordModified || email !== "") {
        // Redirect to the sign-in page if email or password has changed
        navigateTo("/");
      } else {
        // Otherwise, continue to the home page
        navigateTo("/dashboard");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      console.log("Server response data:", error.response.data);
      // Handle the error appropriately, e.g., display an error message
    }
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
        }}
      >
        <Typography component="h1" variant="h5" color="#F6C927">
          Edit Profile
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleUpdate}
          sx={{ mt: 3 }}
          color="#F6C927"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                inputProps={{
                  placeholder: "First Name",
                  style: {
                    color: "#F6C927",
                    placeholder: "primary",
                    background: "#21213E",
                  },
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                inputProps={{
                  placeholder: "Last Name",
                  style: {
                    color: "#F6C927",
                    placeholder: "pramery",
                    background: "#21213E",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{
                  placeholder: "Email Address",
                  style: {
                    color: "#F6C927",
                    placeholder: "pramery",
                    background: "#21213E",
                  },
                }}
              />
              {errors &&
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                  email
                ) && (
                  <Typography component="p" variant="p" color="error">
                    Invalid email format
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
              <FormControl
                sx={{ background: "#21213E", color: "#F6C927", width: "100%" }}
              >
                <InputLabel id="demo-single-checkbox-label">Select</InputLabel>
                <Select
                  labelId="demo-single-checkbox-label"
                  id="demo-single-checkbox"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  input={
                    <OutlinedInput label="Title" style={{ color: "#F6C927" }} />
                  }
                >
                  {allowedTitles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordModified(true);
                }}
                inputProps={{
                  placeholder: "New Password",
                  style: {
                    color: "#F6C927",
                    placeholder: "pramery",
                    background: "#21213E",
                  },
                }}
              />
              {errors && isPasswordModified && password.length < 8 && (
                <Typography component="p" variant="p" color="error">
                  Password must be at least 8 characters long
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                inputProps={{
                  placeholder: "Confirm Password",
                  style: {
                    color: "#F6C927",
                    placeholder: "pramery",
                    background: "#21213E",
                  },
                }}
              />
              {errors && isPasswordModified && password !== confirmPassword && (
                <Typography component="p" variant="p" color="error">
                  The passwords don't match
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "#ff0f0f" }} // Red background for delete button
        onClick={handleClickOpen}
        /* onClick={handleSoftDelete} */
      >
        Delete Me
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSoftDelete}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UpdateProfile;
