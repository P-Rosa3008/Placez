import { TextField } from "@mui/material";
import React from "react";
export function DescriptionOption(props) {
  return (
    <TextField
      id="description"
      name="description"
      type="text"
      label="Description"
      multiline
      minRows={5}
      variant="outlined"
      sx={{
        minWidth: 1,
        marginBottom: 1,
      }}
      onChange={props.handleInputChange}
    ></TextField>
  );
}
