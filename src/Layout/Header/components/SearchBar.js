import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { Form } from "react-bootstrap";

function SearchBar(props) {
  const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    const value = event.target.value.toLowerCase();
    props.search(value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.15)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.25)",
        },
        marginRight: 2,
        marginLeft: 0,
      }}
    >
      <Box
        sx={{
          color: "white",
          padding: 1,
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <Form>
        <TextField
          onChange={searchHandler}
          placeholder="Search"
          sx={{
            color: "white",
            width: "100%",
            "& .MuiInputBase-input": {
              color: "white",
              padding: (theme) => theme.spacing(1, 1, 1, 0),
              paddingLeft: (theme) => theme.spacing(0.8),
              transition: (theme) => theme.transitions.create("width"),
              width: "100%",
              [(theme) => theme.breakpoints.up("md")]: {
                width: "20ch",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      </Form>
    </Box>
  );
}

export default SearchBar;
