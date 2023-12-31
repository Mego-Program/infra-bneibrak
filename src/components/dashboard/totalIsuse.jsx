import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SourceIcon from '@mui/icons-material/Source';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { token, apiProject, headers } from './try';


let userID = ''

try {
  const response = await axios.get(`${apiProject}/users/self`,
    {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
      }
    })

  userID = response.data.result[0]._id;
}
catch (error) {
  console.error('error: ', error);
};

const UrlDataBoard = `${apiProject}/board/user/${userID}/read`;

export const TotalIsuse = (props) => {

  const [totalIsuse, setTotalIsuse] = useState({
    'totalTasks': 0,
  });

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = () => {
    axios.get(UrlDataBoard, { headers })
      .then(response => {

        const projects = response.data;

        let statusCount = {
          'totalTasks': 0,
        };
        projects.forEach(project => {
          const tasks = project.tasks;
          const taskslength = project.tasks.length
          statusCount['totalTasks'] += taskslength;

        });
        setTotalIsuse(statusCount)
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
              Total Isuse
            </Typography>
            <Typography
              variant="h4"
            >
              {/* <br /> */}
              {totalIsuse.totalTasks}
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
