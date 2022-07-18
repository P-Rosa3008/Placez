import { Button } from "@mui/material";
import React from "react";

function NewMarkerButton(props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={props.onClick}
      sx={{ marginRight: 1, width: 156 }}
    >
      {props.allowNewMarker ? "Stop Creating" : "New Marker"}
    </Button>
  );
}

export default NewMarkerButton;
