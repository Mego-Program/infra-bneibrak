import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const CustomListItem = ({ backgroundColor, marginBottom, onClick, icon, text }) => (
  <ListItem
    button
    sx={{
      "&:hover": {
        backgroundColor: `${backgroundColor}`,
        opacity: "0.5",
      },
      marginLeft: "12px",
      width: "90%",
      marginBottom: `${marginBottom}`,
      border: "10px",
      height: "4.989vh",
      minHeight: "30px",
      flexBasis: "100%",
      flexShrink: 0,
      bgcolor: `${backgroundColor}`,
      borderRadius: "10px",
    }}
    onClick={onClick}
  >
    <ListItemIcon sx={{ position: "sticky", color: "white" }}>{icon}</ListItemIcon>
    <ListItemText
      primary={text}
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

CustomListItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  marginBottom: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomListItem;
