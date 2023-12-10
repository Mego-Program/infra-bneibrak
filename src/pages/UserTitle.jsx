import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from '@mui/material/Typography';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { api } from "../App";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allowedTitles = [
  "developer",
  "project manager",
  "product manager",
  "designer",
  "Other",
];


export default function UserClassification() {
  const [personTitle, setPersonTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
 

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonTitle(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: personTitle,
    };

    try {
      const response = await axios.post(
        `${api}/api/users/userTitle`,
        data
      );
   
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('/dashboard');;
      }, 1000);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors.join(", "));
        setSuccess("");
      } else {
        console.error("Undetected error", error.message);
      }  
    }
  };

  return (
    <div
      style={{
        background: "#21213E",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#21213E",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            marginBottom: "20px",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1em",
          }}
        >
          Please choose the <span style={{ color: "#F6C927" }}>title</span> that
          describes you:
        </h1>

        <div>
          <div style={{ background: "#F6C927", marginTop: "25px" }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-single-checkbox-label">Select</InputLabel>
              <Select
                labelId="demo-single-checkbox-label"
                id="demo-single-checkbox"
                value={personTitle}
                onChange={handleChange}
                input={<OutlinedInput label="Select" />}
                MenuProps={MenuProps}
              >
                {allowedTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2, backgroundColor: "#F6C927" }}
          >
            Submit
          </Button>
        </div>
        <Typography component="p" variant="p" color="green">
        {success}
      </Typography>
      </Box>
   
    </div>
  );
}