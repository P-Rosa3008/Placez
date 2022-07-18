import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function FamousWorks(props) {
  const famousWorks = {
    firstWork: null,
    secondWork: null,
    thirdWork: null,
  };
  const [famousWorksState, setFamousWorksState] = useState(famousWorks);

  const handleInputChange = (event) => {
    const values = famousWorksState;
    if (event.target.name === "firstwork") {
      values.firstWork = event.target.value;
    }
    if (event.target.name === "secondwork") {
      values.secondWork = event.target.value;
    }
    if (event.target.name === "thirdwork") {
      values.thirdWork = event.target.value;
    }
    console.log(values);
    setFamousWorksState(values);
  };

  props.famousWorksAdvancedData(famousWorksState);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        paddingLeft: 2,
        mb: 0.5,
      }}
    >
      <Typography>Famous Works</Typography>
      <Box sx={{ width: 0.3 }}>
        <TextField
          name="firstwork"
          sx={{ marginY: 0.5 }}
          variant="standard"
          onChange={(event) => handleInputChange(event)}
        ></TextField>
        <TextField
          name="secondwork"
          sx={{ marginBottom: 0.5 }}
          variant="standard"
          onChange={(event) => handleInputChange(event)}
        ></TextField>
        <TextField
          name="thirdwork"
          variant="standard"
          onChange={(event) => handleInputChange(event)}
        ></TextField>
      </Box>
    </Box>
  );
}

export default FamousWorks;
