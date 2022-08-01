import { Box, IconButton } from "@mui/material";
import React from "react";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WhereToVoteRoundedIcon from "@mui/icons-material/WhereToVoteRounded";
import { Button } from "react-bootstrap";

function NewMarkerButtonIcon(props) {
  return (
    <Box sx={{ backgroundColor: "secondary" }}>
      <IconButton variant="contained" color="secondary" onClick={props.onClick}>
        {props.allowNewMarker ? (
          <WhereToVoteRoundedIcon />
        ) : (
          <AddLocationAltRoundedIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default NewMarkerButtonIcon;
