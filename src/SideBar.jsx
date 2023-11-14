import React, { useState } from 'react';
import { Drawer, Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemSpaciel from './ListItemSpecial';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';

const Sidebar = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  
  const buttonStyle = {
    marginTop: '10.506vh',
    height: '4.989vh',
    width: '100%',
    textAlign: 'left',
    backgroundColor: '#21213E',
    color: 'white',
    paddingLeft: '6px',
  };


  return (
    <Drawer 
    variant="permanent" 
    anchor="left"
    PaperProps={{
    sx: {
      marginTop: '8.506vh',
      display: "flex", // Add this line
      flexDirection: "column",
      width: '15%',
      height: '89vh',
      backgroundColor: '#21213E',
      color: "white",
      flexGrow: "inherit",
      overflow: 'hidden', // Add this line

    }
  }}
    >

    <div style={{ flex: 1 }}>
    {/* First flex container with five buttons */}
    <List>
      
    <ListItemSpaciel
        text="Dashboard"
        bgcolor={selectedButton === 1 ? '#F6C927' : '#21213E'}
        svg={<SpeedOutlinedIcon sx={{color: 'white', width: '20px', height: '18px'}}></SpeedOutlinedIcon>}
        onClick={() => handleButtonClick(1)}
         />
         <ListItemSpaciel
         text="Projects"
         bgcolor={selectedButton === 2 ? '#F6C927' : '#21213E'}
         svg={
          <FeedOutlinedIcon sx={{color: 'white', width: '20px', height: '18px'}}></FeedOutlinedIcon>
          }
          onClick={() => handleButtonClick(2)}
          />
          <ListItemSpaciel
          text='Board'
          bgcolor={selectedButton === 3 ? '#F6C927' : '#21213E'}
          svg={<DvrOutlinedIcon sx={{color: 'white', width: '20px', height: '18px'}} />}
        onClick={() => handleButtonClick(3)}
           />
      <ListItemSpaciel 
      text="Add User"
      bgcolor={selectedButton === 4 ? '#F6C927' : '#21213E'}
      svg={<PermIdentityOutlinedIcon sx={{color: 'white', width: '20px', height: '18px'}}></PermIdentityOutlinedIcon>}
      onClick={() => handleButtonClick(4)}
       />
       <ListItemSpaciel 
       text="Messages"
       bgcolor={selectedButton === 5 ? '#F6C927' : '#21213E'}
       svg={<MessageOutlinedIcon sx={{color: 'white', width: '20px', height: '18px'}}></MessageOutlinedIcon>}
       onClick={() => handleButtonClick(5)}
       />    
       </List>
  </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    {/* Second flex container with two buttons */}
    <List>
    <ListItemSpaciel 
       text="Settings"
       svg={<SettingsOutlinedIcon sx={{color: 'white'}}></SettingsOutlinedIcon>}
       />
              <ListItemSpaciel 
       text="Info"
       svg={<InfoOutlinedIcon sx={{color: 'white'}}></InfoOutlinedIcon>}
       />
    </List>
  </div>
    </Drawer>
  );
};


export default Sidebar;