import react from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import Grid from "@mui/material/Grid";

export default function HomePage() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <Grid
        container
        style={{
          height: "100vh",
          background: "#21213E",
        }}
      >
        {/* First Row */}
        <Grid item xs={12}>
          <Grid container style={{ height: "6%" }}>
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
            <Grid item xs={3}>
              <UserMenu />
            </Grid>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12}>
          <Grid container style={{ height: "90%" }}>
            {/* Content of the second row goes here */}
            {/* You can further divide this row into columns as needed */}
            <Grid item xs={10}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
