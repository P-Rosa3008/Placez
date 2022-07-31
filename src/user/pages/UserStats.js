import { StatisticsCard } from "./../components/UserStats/StatisticsCard";
import { RandomStatisticCard } from "./../components/UserStats/RandomStatisticCard";
import { MapToChooseStatisticsCard } from "../components/UserStats/MapToChooseStatisticsCard";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useGetStatisticsData } from "../../shared/hooks/statistics-hook";

function UserStats() {
  const username = useParams().username;
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [user, setUser] = useState();

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${username}`
        );
        setUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, username]);

  const {
    randomStatistic,
    randomCountryStatistic,
    typeStatisticsBarChartAll,
    typeStatisticsBarChartUser,
  } = useGetStatisticsData(user);

  useEffect(() => {
    console.log("HEIGHT: " + document.body.clientHeight);
    console.log("WIDTH: " + document.body.clientWidth);
  }, [document.body.clientHeight, document.body.clientWidth]);

  const getSxByOrientation = () => {
    if (document.body.clientHeight > document.body.clientWidth) {
      return { display: "none" };
    }
    return { display: "block", height: "90.52vh", width: "25.9vw" };
  };
  return (
    <Box height="90.52vh" sx={{ backgroundColor: "white" }}>
      {user ? (
        <Box display="flex">
          <Box sx={getSxByOrientation()}>
            <RandomStatisticCard
              randomStatistic={randomStatistic}
              randomCountryStatistic={randomCountryStatistic}
            />
            <StatisticsCard
              user={user}
              typeStatisticsBarChartAll={typeStatisticsBarChartAll}
              typeStatisticsBarChartUser={typeStatisticsBarChartUser}
            />
          </Box>
          <MapToChooseStatisticsCard />
        </Box>
      ) : null}
    </Box>
  );
}

export default UserStats;
