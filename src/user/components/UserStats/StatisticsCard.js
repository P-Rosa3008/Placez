import { Box } from "@mui/material";
import React from "react";
export function StatisticsCard(props) {
  return (
    <Box
      sx={{
        minHeight: 672,
        maxHeight: 672,
        overflow: "auto",
        width: "-webkit-fill-available",
        marginTop: 3,
      }}
    >
      <Box sx={{ marginLeft: 3 }}>
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
