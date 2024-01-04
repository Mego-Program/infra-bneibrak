import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { Box, Card, CardContent, CardHeader, Divider, Typography, Grid } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { headers, UrlDataBoard} from './UserData';

Chart.register(ArcElement)

export const ChartGraph = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //#################################################
  useEffect(() => {
    fetchProjects();
  }, [])

  const [countTasks, steCountTasks] = useState({
    'totalTasks': 0,
    "Open": 0,
    "Closed": 0,
    "In Progress": 0,
    "Resolved": 0,
    "empty": 0
  })

  const fetchProjects = () => {
    axios.get(UrlDataBoard, { headers })
      .then(response => {


        let statusCount = {
          'totalTasks': 0,
          "Open": 0,
          "Closed": 0,
          "In Progress": 0,
          "Resolved": 0,
          "empty": 100
        };

        const projects = response.data;

        projects.forEach(project => {
          const tasks = project.tasks;
          const taskslength = project.tasks.length
          statusCount['totalTasks'] += taskslength;
          if (taskslength > 0) {
            statusCount['empty'] = 0
          }

          tasks.forEach(task => {
            statusCount[task.status.name]++;
          });
        });


        steCountTasks(statusCount)
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching JSON file:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
  };
  const percent = countTasks.totalTasks === 0 ? 0 : 100 / countTasks.totalTasks;
  const ProjectsIssues = Math.floor(countTasks.Open * percent);
  const ProjectsDone = Math.floor((countTasks.Closed + countTasks.Resolved) * percent);
  const Ongoing = Math.floor(countTasks["In Progress"] * percent);
  const empty = countTasks['empty'];
  //#################################################
  const data = {
    datasets: [
      {
        data: [ProjectsDone, ProjectsIssues, Ongoing, empty],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#A9A9A9'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Projects Done', 'Projects Issues', 'Ongoing']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: '#F6C927',
      bodyFontColor: '#F6C927',
      borderColor: '#F6C927',
      borderWidth: 1,
      enabled: true,
      footerFontColor: '#F6C927',
      intersect: false,
      mode: 'index',
      titleFontColor: '#E53935'
    }
  };


  const devices = [
    {
      title: 'Projects Issues',
      value: ProjectsIssues,
      icon: LaptopMacIcon,
      color: '#e53935',
    },
    {
      title: 'Issues Done',
      value: ProjectsDone,
      icon: TabletIcon,
      color: '#3F51B5',
    },
    {
      title: 'Tasks Ongoing',
      value: Ongoing,
      icon: PhoneIcon,
      color: '#FB8C00',
    },
  ];


  return (
    <Card sx={{ height: '100%', background: '#21213E', color: "#F6C927" }}{...props}>
      <CardHeader title="Chart" />
      <Divider />
      <CardContent >
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            height: 300,
            position: 'relative',
            background: "#21213E",
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="primary" />
              <Typography
                color="primary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>

      </CardContent>
    </Card>
  );
};
