
import { Box, Container, Grid } from '@mui/material';
import { AddProject } from '../components/dashboard/AddProject.jsx';
import { Sales } from '../components/dashboard/sales.jsx';
import { Ongoing } from '../components/dashboard/Ongoing.jsx';
import { TotalProjects } from '../components/dashboard/TotalProjects.jsx';
import { TotalTasks } from '../components/dashboard/totalTasks.jsx';
import { LatestOrders } from '../components/dashboard/latest.jsx'
import { ChartGraph } from '../components/dashboard/chart.jsx'
import { NavLink } from 'react-router-dom';
import { TotalIsuse } from '../components/dashboard/totalIsuse.jsx';

export const Dashboard = () => (
  <>
    <Box
      component="main"

      sx={{
        flexGrow: 1,
        py: 8,
        background: '#0A0A1B',

      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NavLink to={"/Projects/creatProject"} 
            style={{ color: "#F6C927", textDecoration: "none" }}>
              <AddProject />
            </NavLink>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >

            <TotalTasks />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalIsuse />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Ongoing />
          </Grid>

          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
          <Grid
            item
            xl={3}
            lg={4}
            sm={6}
            xs={12}
          >
            <TotalProjects />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <ChartGraph />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);