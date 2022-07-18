import { Box, Typography } from "@mui/material";

export const getNegativeSetence = (country, type) => {
  return (
    <Typography sx={{ color: "white" }} component="div">
      Did you know that{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {country}
      </Box>
      , don't have{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {"any " + type + "'s"}
      </Box>
      ?
    </Typography>
  );
};
