import { Box } from "@mui/material";
import React from "react";
export function StatisticsCard(props) {
  return (
    <Box
      sx={{
        overflow: "auto",
        width: "-webkit-fill-available",
        marginTop: 3,
      }}
    >
      <Box sx={{ marginLeft: 3, height: "63.64vh", maxHeight: "63.64vh" }}>
        {props.user.places.length > 0 ? (
          props.typeStatisticsBarChartUser()
        ) : (
          <Box />
        )}
        {props.typeStatisticsBarChartAll()}
      </Box>
    </Box>
  );
}
