import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { api } from "../App";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${api}/api/users/login`,
        data
      );
      
      const receivedToken = response.data.token;
      localStorage.setItem("authToken", receivedToken);
      setErrors("");
      setSuccess(response.data.message);
      const title = response.data.title;
      if (title) {
        navigateTo("/dashboard");
      } else {
        navigateTo(`/userTitle`);
      }
    } catch (error) {
      setErrors(error.response.data.message);
      setSuccess("");
    }
  };

  return (
    <Container component="" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#F6C927" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="#F6C927">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          color="#F6C927"
        >
          <TextField
            margin="normal"
            color="primary"
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
                placeholder: "#FF5733",
                background: "#21213E",
              },
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            color="primary"
            required
            fullWidth
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              placeholder: "Password",
              style: {
                color: "#F6C927",
                placeholder: "#FF5733",
                background: "#21213E",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{ color: "#21213E" }}
                label="Primary"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Typography component="p" variant="p" color="error">
            {errors}
          </Typography>
          <Typography component="p" variant="p" color="green">
            {success}
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
