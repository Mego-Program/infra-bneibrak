import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import react from "react";

const SearchBar = () => {
  return (
    <div
      style={{
        position: "sticky",
        marginTop: "37px",
        maxWidth: "100%",
        height: "53px",
        color: "#121231",
        borderRadius: "10px",
        zIndex: 1000,
      }}
    >
      <Paper
        style={{
          backgroundColor: "#121231",
          marginLeft: "0.898%",
          position: "sticky",
          width: "calc(23.42% - px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <SearchIcon style={{ color: "#fff" }} />
        </IconButton>
        <InputBase
          placeholder="Search"
          inputProps={{
            style: { color: "#fff", minWidth: "60px", maxWidth: "100%" },
          }}
          style={{
            flex: 1,
            marginLeft: "8px",
          }}
        />
      </Paper>
    </div>
  );
};
export default SearchBar;
