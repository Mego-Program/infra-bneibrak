import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { token, apiProject, headers} from './try';



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

export const TotalTasks = (props) => {


  useEffect(() => {
    fetchProjects();
  }, [])

  const [countTasks, steCountTasks] = useState({
    'totalTasks':0,
    "Open": 0,
    "Closed": 0,
    "In Progress": 0,
    "Resolved": 0
  })

  const fetchProjects = () => {
    axios.get(UrlDataBoard, { headers })
      .then(response => {
        // const dataLength = response.data.length;
        // setTotalIssue(dataLength);
  
        let statusCount = {
          'totalTasks':0,
          "Open": 0,
          "Closed": 0,
          "In Progress": 0,
          "Resolved": 0
        };
  
        const projects = response.data;
  
        projects.forEach(project => {
          const tasks = project.tasks;
          const taskslength = project.tasks.length
          statusCount['totalTasks'] += taskslength;
  
          tasks.forEach(task => {
            statusCount[task.status.name]++;
          });
        });
  

        steCountTasks(statusCount)
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      });
  };
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
                width: 50
              }}
            >
              <InfoIcon />
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
              Total Iasks
            </Typography>
            <Typography
              variant="h4"
            >
              {/* <br /> */}
              {countTasks.totalTasks}
            </Typography>
            {/* <Typography
            variant="h4"
            color="primary"
          >
            $24k
          </Typography> */}
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
          {/* <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography> */}
          {/* <Typography
        
          variant="caption"
        >
          Since last month
        </Typography> */}
        </Box>
      </CardContent>
    </Card>
  )
};
