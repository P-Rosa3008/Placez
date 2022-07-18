import { Box } from "@mui/material";
import React from "react";
export function StatisticsCard(props) {
  return (
    <Box
      sx={{
        maxHeight: 672,
        overflow: "auto",
        width: "-webkit-fill-available",
        marginTop: 3,
      }}
    >
      <Box sx={{ marginLeft: 3 }}>
        {props.user.places > 0 ? props.typeStatisticsBarChartUser() : null}
        {props.typeStatisticsBarChartUser()}
        {props.typeStatisticsBarChartAll()}
      </Box>
    </Box>
  );
}
