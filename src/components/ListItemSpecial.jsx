import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export default function ListItemSpaciel(props) {
  return (
    <ListItem
      button
      sx={{
        "&:hover": {
          backgroundColor: `${props.bgcolor}`,
          opacity: "0.5",
        },
        marginLeft: "12px",
        width: "90%",
        marginBottom: `${props.bottom}`,
        border: "10px",
        height: "4.989vh",
        minHeight: "30px",
        flexBasis: "100%",
        flexShrink: 0,
        bgcolor: `${props.bgcolor}`,
        borderRadius: "10px",
      }}
      onClick={props.onClick}
    >
      <ListItemIcon sx={{ position: "sticky" }}>{props.svg}</ListItemIcon>
      <ListItemText
        primary={props.text}
        primaryTypographyProps={{
          position: "sticky",
          color: "#FFF",
          fontFamily: "Poppins",
          fontSize: "13px",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: "normal",
        }}
      />
    </ListItem>
  );
}
