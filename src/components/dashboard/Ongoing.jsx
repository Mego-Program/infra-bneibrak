import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { headers, UrlDataBoard} from './UserData';

export const Ongoing = (props) => {


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

  console.log(countTasks)


  return(
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
            bgcolor: "#F6C927" ,
            height: 50,
              width: 50
            }}
          >
            <BorderColorIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography
           
            gutterBottom
            variant="overline"
            sx={{
            fontSize:10,
            
            }}
          >
            Ongoing
          </Typography>
          <Typography
            variant="h4"
          >
            {countTasks['In Progress']}
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
)};
