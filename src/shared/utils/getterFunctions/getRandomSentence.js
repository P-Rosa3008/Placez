import { Box, Typography } from "@mui/material";
import { getRandomOccurrenceFromArray } from "./getRandomFromArray";

export const getRandomSentence = (country, type, amount) => {
  const sentenceArray = [
    <Typography
      sx={{ color: "white", fontSize: { sm: "12px", md: "18px" } }}
      component="div"
    >
      Did you know that{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {country}
      </Box>
      , has{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {amount}
      </Box>{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {type + "'s"}
      </Box>
    </Typography>,
    <Typography color="white" component="div">
      There are more than{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {amount}
      </Box>{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {type + "'s "}
      </Box>
      in{" "}
      <Box display="inline" fontWeight="fontWeightBold">
        {country}
      </Box>
    </Typography>,
  ];
  return getRandomOccurrenceFromArray(sentenceArray);
};
