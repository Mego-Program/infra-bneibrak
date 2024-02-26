import { Fragment, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Badge,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { api } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "26px",
    marginRight: "2.7vw",
    marginLeft: "2.7%",
    height: "65px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    backgroundColor: "#121231",
    color: "white",
    borderRadius: "10px",
    zIndex: 1000,
    [theme.breakpoints.down("sm")]: {
      "& .bell-icon": {
        display: "none",
      },
      "& .user-name, & .user-title": {
        display: "none",
      },
      justifyContent: "flex-end",
      width: "120px",
    },
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "49px",
    height: "49px",
    flexShrink: "0",
  },
  userName: {
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "13px",
    fontStyle: "normal",
    lineHeight: "normal",
    fontWeight: "700",
  },
  userTitle: {
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "13px",
    fontStyle: "normal",
    lineHeight: "normal",
  },
  iconButton: {
    width: "45px",
    height: "45px",
    background: "#21213E",
    margin: "10px",
  },
}));

const UserMenu = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();

  const handleMoreIconClick = () => {
    navigateTo("/currentProfile");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    console.log("logout");
    localStorage.removeItem("authToken");
    navigateTo("/");
  };

  const [profileData, setProfileData] = useState({});
  const [firstLetter, setFirstLetter] = useState("U");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${api}/api/users/me`);

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.data);

        const { firstName, lastName, title } = response.data.result[0];
        let profilePicture = null;

        if (response.data.result[0].profilePicture) {
          profilePicture = response.data.result[0].profilePicture;
        }
        setProfileData({ firstName, lastName, title, profilePicture });

        if (!profilePicture) {
          setFirstLetter(firstName[0]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.userInfo}>
        <Avatar>
          {profileData.profilePicture ? (
            <img
              src={profileData.profilePicture}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            firstLetter
          )}
        </Avatar>{" "}
        <div style={{ marginLeft: "12px" }}>
          <div className={`user-name ${classes.userName}`}>
            {profileData.firstName + " " + profileData.lastName}
          </div>
          <div className={`user-title ${classes.userTitle}`}>
            {profileData.title}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          className={`bell-icon ${classes.iconButton}`}
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                color="inherit"
                className={classes.iconButton}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMoreIconClick}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Fragment>
      </div>
    </div>
  );
};

export default UserMenu;
