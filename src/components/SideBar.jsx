import { Drawer, List } from "@mui/material";
import CustomListItem from "./CustomListItem";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const navigateTo = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button, navigate) => {
    setSelectedButton(button);
    navigateTo(navigate);
  };

  const menuItems = [
    { text: "Dashboard", icon: <SpeedOutlinedIcon />, route: "/dashboard", id: 1 },
    { text: "Projects", icon: <FeedOutlinedIcon />, route: "/Projects", id: 2 },
    { text: "Specs", icon: <DvrOutlinedIcon />, route: "/spec/", id: 3 },
    { text: "Add User", icon: <PermIdentityOutlinedIcon />, id: 4 },
    { text: "Messages", icon: <MessageOutlinedIcon />, route: "/messages", id: 5 },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "17%",
          minWidth: "180px",
          backgroundColor: "#121231",
          color: "white",
          flexGrow: "inherit",
        },
      }}
    >
      <div style={{ flex: 1 }}>
          <List>
          <div style={{ height: "8vh" }}> </div>
          {menuItems.map((item) => (
            <CustomListItem
              key={item.id}
              text={item.text}
              backgroundColor={selectedButton === item.id ? "#F6C927" : "#121231"}
              icon={item.icon}
              onClick={() => handleButtonClick(item.id, item.route)}
            />
          ))}
        </List>
      </div>
      <div>
        <List>
          <CustomListItem
            text="Settings"
            icon={<SettingsOutlinedIcon sx={{ color: "white" }} />}
          />
          <CustomListItem
            text="Info"
            icon={<InfoOutlinedIcon sx={{ color: "white" }} />}
          />
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
