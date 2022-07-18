import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import React, { useState } from "react";
import { barChartDataset, barOptions } from "../barChart-utils";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

export const TypeStatisticsPieChartUser = async () => {
  const auth = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const [
    typeStatisticsPieChartUserLabels,
    setTypeStatisticsPieChartUserLabels,
  ] = useState();

  const [typeStatisticsPieChartUserData, setTypeStatisticsPieChartUserData] =
    useState();

  const responseData = await sendRequest(
    `http://localhost:8080/api/places/${auth.userId}/places`
  );
  const dataCount = [];
  const occurrences = responseData.places.map((p) => p.type);
  const nameOccurrences = [...new Set(occurrences)];

  const count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  for (const occurrence of nameOccurrences) {
    const numberOfOccurences = count(occurrences, occurrence);
    dataCount.push(numberOfOccurences);

    setTypeStatisticsPieChartUserLabels(nameOccurrences);
    setTypeStatisticsPieChartUserData(dataCount.sort((a, b) => b - a));
  }
  const data = {
    labels: typeStatisticsPieChartUserLabels,
    datasets: barChartDataset(typeStatisticsPieChartUserData),
  };

  return (
    <Box sx={{ width: 325 }}>
      <Typography sx={{ fontWeight: "bold" }}>
        Types you added the most?
      </Typography>
      <Bar width="10%" height="10%" data={data} options={barOptions} />
    </Box>
  );
};
