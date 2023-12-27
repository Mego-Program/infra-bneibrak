import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SourceIcon from '@mui/icons-material/Source';
import { useState, useEffect } from 'react';
import axios from 'axios';

const token = localStorage.getItem("authToken");
// console.log("token: " + token)
const apiProject = import.meta.env.VITE_SERVER_URL;

let userID = null
const { headers } = [
  {
      'Authorization': 'Happy',
      'Content-Type': 'application/json; charset=utf-8',
  }
];

try {
  const response = await axios.get(`${apiProject}/users/self`,
  {
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json; charset=utf-8',
      }
  })
      // console.log(response)
      // console.log('user id:', response.data.result[0]._id);
      userID = response.data.result[0]._id;}
  catch(error) {
      console.error('error: ', error);
  };

const UrlDataBoard = `${apiProject}/board/user/${userID}/read`;

export const TotalProjects =  (props) => {

  const [totalProjects, setTotalProjects] = useState(null);

  useEffect(() => {
    fetchProjects();
}, [])

const fetchProjects = () => {
    axios.get(UrlDataBoard, { headers })
        .then(response => {
          const dataLength = response.data.length;
          setTotalProjects(dataLength)
          
            // console.log("Mendy", dataLength)

        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        })
}


  return (
    <Card
      sx={{ height: '100%', background: '#21213E' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Avatar
              sx={{
                bgcolor: "#F6C927",
                height: 50,
                width: 50,
              }}
            >
              <SourceIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography

              gutterBottom
              variant="overline"
              sx={{
                fontSize: 10,
              }}

            >
              Total Projects
            </Typography>
            <Typography
              variant="h4"
            >
              {/* <br /> */}
              {totalProjects}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* <ArrowDownwardIcon color="error" /> */}
          <Typography
            color="error"
            sx={{
              mr: 1
            }}
            variant="body2"
          >

          </Typography>
          <Typography

            variant="caption"
          >

          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
};
