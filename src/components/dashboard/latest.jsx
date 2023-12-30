import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { SeverityPill } from '../severity-pill';
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

export const LatestOrders = (props) => {


  const [projects, setProjects] = useState([]);


  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = () => {
    axios.get(UrlDataBoard, { headers })
      .then(response => {
        setProjects(response.data.slice(-3))
        // console.log("Mendy", response.data)
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      })
  }
  // console.log(projects)

  return (
    <Card sx={{
      width: '100%', background: '#21213E', color: "#F6C927"
    }} {...props}>
      <CardHeader title="Latest Projects" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>
                  Projects
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableCell>
                      Date
                    </TableCell>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {/* Status */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody  >
              {projects.map((project) => (
                <TableRow
                  hover
                  key={project._id}
                >
                  <TableCell>
                    {project.name}
                  </TableCell>
                  <TableCell>
                    {project.creationDate}
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          // endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          {/* View all */}
        </Button>
      </Box>
    </Card>
  )
};
