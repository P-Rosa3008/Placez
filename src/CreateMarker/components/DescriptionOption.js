import { TextField } from "@mui/material";
import React from "react";
export function DescriptionOption(props) {
  return (
    <TextField
      id="description"
      name="description"
      type="text"
      multiline
      maxRows={5}
      minRows={5}
      variant="outlined"
      inputProps={{ style: { fontSize: "20", color: "rgba(100,100,100,255)" } }}
      sx={{
        minWidth: 1,

        marginBottom: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(231,232,235,255)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(200,200,200,255)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(200,200,200,255)",
            borderWidth: "1px",
          },
        },
        "& .MuiFormLabel-root": {
          fontWeight: "400",
          color: "rgba(163,163,165,255)",
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": { color: "transparent" },
        },
        "& .css-1z7n62>span": { display: "none" },
      }}
      onChange={props.handleInputChange}
    ></TextField>
  );
}
