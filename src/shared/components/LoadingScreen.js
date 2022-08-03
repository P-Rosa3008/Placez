import { Box, CircularProgress } from "@mui/material";
import React from "react";
function LoadingScreen() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "40vh",
        display: "block",
        position: "relative",
      }}
    >
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </Box>
  );
}

export default LoadingScreen;
