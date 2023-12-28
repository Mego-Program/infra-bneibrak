import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";


export default function Navigating() {
  return (
    <Box
      sx={{
        p: "0px 30px",
        color: "white",
        bgcolor: "#21213E",
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vh",
      }}
    >
      {/* Left side content */}
      <Box
        sx={{
          pt: "2%",
          pr: "2%",
          width: "65%",
          height: "100%"
        }}
      >
    
          <h1 style={{marginTop:"25%"}}>
          Welcome to ToDo App{" "}
          </h1>
         
      </Box>

      {/* Right side content - Sign In and Sign Up links */}
      <Box
        sx={{
          p: "0px",
          minHeight: "100vh",
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#121231",
        }}
      >
        <Box sx={{ margin: "20px", width: "40%", height: "60px" }}>
          {/* Sign In link */}
          <NavLink to="login" style={{ color: "#F6C927" }}>
            <Button
              sx={{
                bgcolor: "#F6C927",
                border: "solid 2px #F6C927",
                width: "100%",
                height: "100%",
                "&:hover": { bgcolor: "#21213E" },
              }}
            >
              <h2 style={{ color: "white" }}>Sign In</h2>
            </Button>
          </NavLink>
        </Box>
        <Box sx={{ margin: "20px", width: "40%", height: "60px" }}>
          <NavLink to="register" style={{ color: "#F6C927" }}>
            <Button
              sx={{
                bgcolor: "#F6C927",
                border: "solid 2px #F6C927",
                width: "100%",
                height: "100%",
                "&:hover": { bgcolor: "#21213E" },
              }}
            >
              {/* Sign Up link */}
              <h2 style={{ color: "white" }}>Sign Up</h2>
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
