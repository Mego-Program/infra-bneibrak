import React ,{useState, useEffect} from "react";
import Sidebar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserMenu from "../components/UserMenu";
import Grid from "@mui/material/Grid";
import ProjectsApp from 'project_app/App'
import {useLocation} from 'react-router-dom';
import { Dashboard } from "./Dashboard";

export default function Layout() {

  const location = useLocation();
  const [reload, setReload] = useState(0);
  const [firstReload, setFirstReload] = useState(0);
  useEffect(() => {
    setReload(prev => prev+1); 
    if(firstReload == 0) setFirstReload(1)
  }, [location]);

  return (
    <div >
      <Grid container style={{ height: "100vh"  ,background: '#0A0A1B' }}>
        {/* First Row */}
        <Grid item xs={12}>
          <Grid container style={{ height: "6%", margin: 0, padding: 0  }}>
            {/* Left Column */}
            <Grid item xs={2.5}>
              <Sidebar />
            </Grid>

            {/* Second Left Column (remaining space, disappears on smaller screens) */}
            <Grid item xs></Grid>

            {/* Second Right Column */}
            <Grid item xs={3}>
              <SearchBar />
            </Grid>

            {/* Right Column */}
            <Grid item xs={3.5}>
              <UserMenu  key={firstReload}/>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} style={{background: '#0A0A1B'}}>
          <Grid container style={{ height: "90%"}}>
            {/* Content of the second row goes here */}
            {/* You can further divide this row into columns as needed */}
            <Grid item xs={3}></Grid> 
            <Grid item xs={9} style={{ marginLeft: "-5%" }}>
            {window.location.pathname == '/dashboard'? ( <Dashboard  /> ):(
            <ProjectsApp key={reload} />)
            }
              {/* <Dashboard />
              */}
            </Grid>
            <Grid item xs={2}></Grid> {/* Adjust the column size as needed */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}